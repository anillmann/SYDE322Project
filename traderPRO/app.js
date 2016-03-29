var express = require('express');
var password = require('password-hash-and-salt');
var app = require("express")();
// var cookieParser = require('cookie-parser')
// var session = require('express-session')
//var routes = require('./routes');
var bodyParser = require('body-parser')
// MySQL connection
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: 'root',
  database: 'traderPRO',
  multipleStatements: true
});

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session);
app.use(bodyParser.urlencoded({
  extended: true
}));

// Important Exports
var sqlFactory = require('./sqlFactory.js');
var yFin = require('yahoo-finance');
var squel = require('squel');
var exports = module.exports = {};
exports.loggedIn = false;

var sqlGen = new sqlFactory.sqlQuery(); 

// Global Variables //
var userId = 1;

// Routes
   
  //  STARTING PAGE  //
    app.get('/:var(|index)?', function(req, res){
      res.render('index', { title: 'traderPRO'});
    });

    app.post('/index', function (req, res) {
      var username = req.body.params.username;
      var pass = req.body.params.password;
      var todo = req.body.todo;
      var sqlStr; 
 
  // Creating hash and salt 
      password(pass).hash(function(error, hash) {
        if (error) {
          throw new Error('Something went wrong!');
        } 
        else {
          var sqlParamsCre = {'username':username,'password':hash};
          var sqlParamsVal = {'username':username};

          switch(todo) {
            case 'validate' :
              sqlStr = sqlGen.execSP('validate_login',sqlParamsVal,3).sqlStr;
              conn.query(sqlStr, function (err, results) {
                if (err) {
                  console.log("Tried: "+sqlStr);
                  console.log("Got: "+err)
                } 
                else {
                  var hashReturn = results[1][0]['@o2'];
                  var dbSucc = results[1][0]['@o1'];
                  var succ = 0;
                  if (dbSucc ==0){
                    password(pass).verifyAgainst(hashReturn, function(error, verified) {
                      if(error){
                        throw new Error('Something went wrong!');
                      }
                      if(!verified){
                        succ = -3;
                        console.log("Failed password");
                      }
                      else{
                        succ = 0;
                        console.log("Password correct");
                        // req.session.loggedIn;
                      }
                      var id = results[1][0]['@o3'];
                      res.send(JSON.stringify({'success':succ}));
                      if (succ == 0 ) {
                        userId = id;
                      }
                    });
                  }
                  else {
                    succ = dbSucc;
                    var id = results[1][0]['@o3'];
                    res.send(JSON.stringify({'success':succ}));
                    if (succ == 0 ) {
                      userId = id;
                    }
                  }
                }
              });
              break;
            case 'create' :
              sqlStr = sqlGen.execSP('insert_user',sqlParamsCre,2).sqlStr;
              conn.query(sqlStr, function (err, results) {
                if (err) {
                  console.log("Tried: "+sqlStr);
                  console.log("Got: "+err)
                } 
                else {
                  var succ = results[1][0]['@o1'];
                  var id = results[1][0]['@o2'];
                  res.send(JSON.stringify({'success':succ}));
                  if (succ == 0 ) {
                    userId = id;
                  }
                }
              });
              break;
          }
        }
      });
    });

    // META DATA MGMT
    app.get('/metadatamgmt', function(req, res){
      // queries to get static data
      var getSectors = sqlGen.selectSector().sqlStr + "; ";
      var getCurrencies = sqlGen.selectCurrency().sqlStr + "; ";
      var getAssetClasses = sqlGen.selectAssetClass().sqlStr + "; ";
      var getCompanies = sqlGen.selectCompany().sqlStr + "; ";
      var getCountries = sqlGen.selectCountry().sqlStr + "; ";
      var getIndustries = sqlGen.selectIndustry().sqlStr + "; ";
      var getTickers = sqlGen.selectTickers().sqlStr + "; ";

      console.log(getCurrencies);

      var sqlStr = getSectors + getCurrencies + getAssetClasses + getCompanies + getCountries + getIndustries + getTickers;
      
      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.render('metadatamgmt', {
            title : 'traderPRO - Metadata Management', 
            sectors : results[0],
            currencies : results[1],
            assetClasses : results[2],
            companies : results[3],
            countries : results[4],
            industries : results[5],
            tickers : results[6]
          });
        }
      });       
    });

    app.post('/metadatamgmt', function (req, res) {
      var todo = req.body.todo;
      var sqlStr;
      var sqlParams = req.body.sqlParams;

      console.log(sqlParams);
      
      switch (todo) {
        case 'getIndustries' :
          var getIndustries = sqlGen.selectIndustry(sqlParams).sqlStr;
          sqlStr = getIndustries;
          break;
        
        case 'addCompany' :
          sqlStr = sqlGen.execSP('add_company',sqlParams,1).sqlStr;
          break;

        case 'addTicker' :
          sqlStr = sqlGen.execSP('add_ticker',sqlParams,1).sqlStr;
          break;

        case 'getCompanyData' :
          sqlStr = sqlGen.selectCompany(sqlParams).sqlStr;
          break;

        case 'updateCompany' :
          sqlStr = sqlGen.execSP('update_company',sqlParams,1).sqlStr;
          break;
        case 'getCountryTickers' :
          sqlStr = sqlGen.selectTickers(sqlParams).sqlStr;
          break;
        case 'getTickerData' :
          sqlStr = sqlGen.selectTickers(sqlParams).sqlStr;
          break;
        case 'updateTicker' :
          sqlStr = sqlGen.execSP('update_ticker',sqlParams,1).sqlStr;
          break;
        }
      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          console.log("Results " +results[0]);
          res.send(results);
        }
      }); 
    });

    app.get('/trade', function (req, res) {
      var sqlParams = { 'userId' : userId };
      var getAccounts = sqlGen.selectAccount(sqlParams).sqlStr + "; ";
      var getAssetClasses = sqlGen.selectAssetClass().sqlStr + "; ";
      var getRecentTrans = sqlGen.execSP('select_recentTrans',sqlParams,1).sqlStr;
      var getTransTypes = sqlGen.selectTransTypes().sqlStr + "; ";
      var getTickers = sqlGen.selectTickers().sqlStr + "; ";

      console.log(getTransTypes);
      console.log(getTickers);

      var sqlStr = getAccounts + getAssetClasses + getTransTypes + getTickers + getRecentTrans;


      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);

          res.render('trade', {
            title : 'traderPRO - Trade', 
            accounts : results[0],
            assetClasses : results[1],
            transTypes : results[2],
            tickers : results[3],
            transactions : results[4],
          });
        }
      });
    });

    app.post('/trade', function (req, res) {
      var todo = req.body.todo;
      var params = req.body.params;
      var sqlStr;

      console.log("params");
      console.log(params);

      switch (todo) {
        case 'getTransTypes' :
          var getValidTransTypes = sqlGen.selectValidTransTypes(params).sqlStr + "; ";
          var getTickers = sqlGen.selectTickers(params).sqlStr + "; ";
          sqlStr = getValidTransTypes + getTickers;
          break;
        case 'getTickerDetails' :
          sqlStr = sqlGen.selectTickers(params).sqlStr + "; ";
          break;
        case 'insertTrans' :
          sqlStr = sqlGen.insertTrans(params).sqlStr + "; ";
          break;
        case 'getTrans' :
          sqlStr = sqlGen.selectTrans(params).sqlStr + "; ";
          break;
        case 'updateTrans' :
          sqlStr = sqlGen.execSP('update_trans',params,1).sqlStr;
          break;
        case 'deleteTrans' :
          sqlStr = sqlGen.deleteTrans(params).sqlStr + "; ";
      }

      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.send(results);
        }
      });

    });

    app.get('/portfolioOverview', function(req, res){  
      var sqlParams = { 'userId' : userId };
      var getAccounts = sqlGen.selectAccount(sqlParams).sqlStr + "; ";

      var sqlStr = getAccounts;

      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.render('portfolioOverview', {
            title : 'traderPRO - Portfolio Overview', 
            accounts : results
          });
        }
      });    
    });


    app.post('/portfolioOverview', function (req, res) {
      var todo = req.body.todo;
      var params = req.body.params;
      var sqlStr;

      var d = new Date(params.calcDate)

      //console.log(params.accountId);

      switch (todo) {
        case 'calc' :
          getPositions(params.accountId,procDate(d));
          break;
        case 'pnl' :
          getPnL(params.accountId);
          break;
        case 'getTickers' :
          sqlStr = squel.select().from("calcsdtl","c")
                    .field("c.tickerId")
                    .field("t.symbol")
                    .left_join("tickermaster","t","c.tickerId=t.tickerId")
                    .where("accountId="+params.accountId).distinct().toString();
          conn.query(sqlStr, function (err, results) {
            if (err) {
              console.log(err);
            } else {
              res.send(results);
            }
          })
          break;
        case 'pnldtl' :
          getPnLDtl(params.accountId,params.tickerId);
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

            /*res.render('portfolioOverview_partial', {
              pnl : pnl
            });*/
            res.send(pnl)
            //console.log(pnl);
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

            res.send(pnl)
            //console.log(pnl);
          }
        });
      }

      /*switch (todo) {
        case '' :

          break;
      }

      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.send(results);
        }
      });*/

    });


  
//  Database Calls  //
      app.post('/exec_sp',function(req,res){
      // this is a general call that will execute any sp with parameters in the form:
      /*  
          var params = JSON.stringify({
          'sp' : 'insert_elementTag',     // the name of the SP, exactly as in the db
          'input_params' : {              // the values of the input parameters, name of key does not mater
            'i1' : 'Automotive',          // number of input parameters in emebeded JSON must match number in SP definition
            'i2' : 'Industry'
          },
          'output_params' : 1             // the number of output parameters
          });
      */     

      var sp = req.body.sp;
      var input_params = req.body.input_params;
      var output_params = req.body.output_params;
      var sqlStr = "CALL "

      sqlStr += sp + "('";
      for (x in input_params) {
        sqlStr += input_params[x] + "','"
      }
      sqlStr = sqlStr.substring(0, sqlStr.length - 1); //remove the last ', output vars dont need it

      for (i=1;i<=output_params;i++) {
        sqlStr += "@o" + i + ",";
      }
      sqlStr = sqlStr.substring(0, sqlStr.length - 1);
      sqlStr +=  "); ";
      
      sqlStr += "SELECT ";
      for (i=1;i<=output_params;i++) {
          sqlStr += "@o" + i + ",";
      }
      sqlStr = sqlStr.substring(0, sqlStr.length - 1) + ";";

      console.log(sqlStr);

      conn.query(sqlStr,function(err,results){
        if(err){
          console.log(err);
        } else {
          res.send(results);
        }
      });

    });

    app.post('/exec_qry',function(req,res){
      // this is a general call that will execute an query with/without where clauses with parameters in the form:
      /*
          var params = JSON.stringify({
              'table' : 'museum'          // if no clauses, do not include clauses
          });

          var params = JSON.stringify({
              'table' : 'exhibit',
              'clauses' : {
                'musuemId' : "'f_getMuseumId(' + museum + ')'" // make sure to send strings with quotes - ''
              }
          });
      */
      var table = req.body.table;
      var clauses = req.body.clauses;

      var sqlStr = "SELECT * FROM ";

      sqlStr += table;

      if (clauses != null) {
        sqlStr += " WHERE ";
        for (x in clauses) {
          sqlStr += x + "=" + clauses[x] + ",";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
      }
      sqlStr += ";";
      
      console.log(sqlStr);

      conn.query(sqlStr,function(err,results){
        if(err){
          console.log(err);
        } else {
          res.send(results);
        }
      });

    });


function procDate(dateObj) {
  return dateObj.toISOString().substr(0,10);
}

      


// Run Server
app.listen(3100, function(){
  console.log("Listening on 3100");
});



