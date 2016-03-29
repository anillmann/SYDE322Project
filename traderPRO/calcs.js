var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: 'root',
  database: 'traderPRO',
  multipleStatements: true
});
var squel = require('squel');
var yFin = require('yahoo-finance');

var accountId = 2;
var tickerId = 3;
var d = new Date('2016-03-20');

function procDate(dateObj) {
	return dateObj.toISOString().substr(0,10);
}

function getPositions (accountId, calcDate) {
	var calcPos = "CALL calc_Positions('"+calcDate+"',@o1); "

	var maxDate = squel.select().from("v_positions").field("MAX(positionDate)", "calcDate")
					.where("positionDate<='"+calcDate+"'").toString();

	var deleteOld = squel.delete().from("calcs").where("accountId="+accountId).where("calcDate='"+calcDate+"'").toString()+"; ";
	var deleteOldDtl = squel.delete().from("calcsDtl").where("accountId="+accountId).where("calcDate='"+calcDate+"'").toString()+"; ";

	var getPos = squel.select().from('v_positions')
					.where('accountId='+accountId)
					.where("positionDate=("+maxDate+")")
					.order("positionDate", false)
					.order("assetClassId", true)
					.order("symbol", true).toString() + "; ";

	var sqlStr = calcPos + getPos + deleteOld + deleteOldDtl;

	var positions = {};
	var done = [], quotesFailed = false;

	conn.query(sqlStr, function (err, results) {
		if (err) {
			console.log('Tried: '+sqlStr);
			console.log(err);
		} else {
			console.log('Success: '+sqlStr);
			//console.log(results[1]);

			var symbol, positionDate, position, bookVal, assetClassId, s;

			positionDate = new Date(results[1][0].positionDate);
			positionDate = procDate(positionDate);	

			positions['calcDate'] = positionDate;
			positions['positions'] = {};

			for (x in results[1]) {
				symbol = results[1][x].symbol;
				tickerId = results[1][x].tickerId;
				position = results[1][x].position;
				bookVal = results[1][x].bookVal;
				assetClassId = results[1][x].assetClassId;

				positions['positions'][symbol] = {
					'tickerId':tickerId,
					'symbol':symbol,
					'assetClassId':assetClassId,
					'position':position,
					'bookVal':bookVal
				};
			}

			//var lastSymbol = Object.keys(positions['positions']).sort()[0];
			
			for (x in positions['positions']) {
				//console.log("Getting MTM for: "+x);
				if (positions['positions'][x].assetClassId != 1) {
					done[x] = false;
					//console.log(done[x]);
					yFin.historical({
					  symbol: positions['positions'][x].symbol,
					  from: calcDate,
					  to: calcDate,
					}, function (err, quotes) {
					  if(err) {
					  	console.log(err);
					  } else if (quotes[0]) {
					  	var MTMPrice = quotes[0].close;
					  	var pos = positions['positions'][quotes[0].symbol]['position'];
					  	positions['positions'][quotes[0].symbol]['MTMPrice'] = MTMPrice; 
					  	positions['positions'][quotes[0].symbol]['MTM'] = MTMPrice*pos;
					  	console.log(quotes[0])
					  	done[quotes[0].symbol] = true;
					  } else {
					  	quotesFailed = true;
					  }
					  
					  //console.log(done);

					});
				} else {
					positions['positions'][x]['MTMPrice'] = 1; 
					positions['positions'][x]['MTM'] = positions['positions'][x]['position']; 
				}
			}
		}
	});
	
	var output = setInterval(function() {
		var check = true;
		for (x in done) {
			//console.log(done);
			if (!done[x]) { check = false }
			//console.log(check);
		}
		//console.log(check);

		if (quotesFailed) {
			clearInterval(output); 
			console.log("Could not get quotes");
		}

		if (check) {
			
			//console.log(positions);
			clearInterval(output); 

			var insertDtl;
			var sumMTM = 0, sumBV = 0
			for (x in positions['positions']) {

				sumBV += positions['positions'][x].bookVal;
				sumMTM += positions['positions'][x].MTM;

				
				insertDtl = squel.insert().into("calcsDtl")
									.set("calcDate",calcDate)
									.set("accountId",accountId)
									.set("tickerId",positions['positions'][x].tickerId)
									.set("position",positions['positions'][x].position)
									.set("bookVal",positions['positions'][x].bookVal)
									.set("mtm",positions['positions'][x].MTM)
									.toString();

				console.log("Running: "+insertDtl);
				conn.query(insertDtl, function (err, results) {
					if (err) {
						console.log(err);
					}	
				});

			}

			var insert = squel.insert().into("calcs")
									.set("calcDate",calcDate)
									.set("accountId",accountId)
									.set("bookVal",sumBV)
									.set("mtm",sumMTM)
									.toString();

			console.log("Running: "+insert);
			conn.query(insert, function (err, results) {
				if (err) {
					console.log(err);
				}	
			});

		} 
	}, 500);

}

function getPnL(accountId) {
	var sqlStr = squel.select().from("calcs").where("accountId="+accountId).order("calcDate",false).toString();
	var pnl = {};
	conn.query(sqlStr, function (err, results) {
		if (err) {
			console.log(err);
		} else {
			//console.log(results[0]);

			var last = 0;

			for (x in results) {
				pnl[x] = {};
				pnl[x]['date'] = results[x]['calcDate'];
				pnl[x]['bookVal'] = results[x]['bookVal'];
				pnl[x]['mtm'] = results[x]['mtm'];
				last = x;
			}
			for (i=last;i>=0;i--) {
				if (i == last) {
					pnl[i]['pnl'] = pnl[i]['mtm'] - pnl[i]['bookVal'];
					pnl[i]['pnlRate'] = (pnl[i]['mtm'] - pnl[i]['bookVal']) / pnl[i]['bookVal'];
					pnl[i]['sinceLast'] = "-";
					pnl[i]['sinceLastRate'] = "-";
				} else {
					pnl[i]['pnl'] = pnl[i]['mtm'] - pnl[i]['bookVal'];
					pnl[i]['pnlRate'] = (pnl[i]['mtm'] - pnl[i]['bookVal']) / pnl[i]['bookVal'];
					pnl[i]['sinceLast'] = pnl[i]['mtm'] - pnl[i+1]['mtm'];
					pnl[i]['sinceLastRate'] = (pnl[i]['mtm'] - pnl[i+1]['mtm']) / pnl[i+1]['mtm'];
				}
			}

			console.log(pnl);
		}
	});
}

function getPnLDtl(accountId,tickerId) {
	var sqlStr = squel.select().from("calcsDtl")
						.where("accountId="+accountId)
						.where("tickerId="+tickerId)
						.order("calcDate",false).toString();
	var pnl = {};
	conn.query(sqlStr, function (err, results) {
		if (err) {
			console.log(err);
		} else {
			//console.log(results[0]);

			var last = 0;

			for (x in results) {
				pnl[x] = {};
				pnl[x]['date'] = results[x]['calcDate'];
				pnl[x]['position'] = results[x]['position'];
				pnl[x]['bookVal'] = results[x]['bookVal'];
				pnl[x]['mtm'] = results[x]['mtm'];
				last = x;
			}
			for (i=last;i>=0;i--) {
				if (i == last) {
					pnl[i]['pnl'] = pnl[i]['mtm'] - pnl[i]['bookVal'];
					pnl[i]['pnlRate'] = (pnl[i]['mtm'] - pnl[i]['bookVal']) / pnl[i]['bookVal'];
					pnl[i]['sinceLast'] = "-";
					pnl[i]['sinceLastRate'] = "-";
				} else {
					pnl[i]['pnl'] = pnl[i]['mtm'] - pnl[i]['bookVal'];
					pnl[i]['pnlRate'] = (pnl[i]['mtm'] - pnl[i]['bookVal']) / pnl[i]['bookVal'];
					pnl[i]['sinceLast'] = pnl[i]['mtm'] - pnl[i+1]['mtm'];
					pnl[i]['sinceLastRate'] = (pnl[i]['mtm'] - pnl[i+1]['mtm']) / pnl[i+1]['mtm'];
				}
			}

			console.log(pnl);
		}
	});
}


