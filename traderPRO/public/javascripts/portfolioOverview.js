$(document).ready( function () {

	$('.hidden-before-param').hide();

	$('#calc-date').datepicker();

	$('#account-select').change( function () {
		accountId = $(this).val();

		getPnl();

		$('.hidden-before-param').show();

		var data = JSON.stringify({
			'todo' : 'getTickers',
			'params' : {
				'accountId' : accountId
			}
		});

		$.ajax('portfolioOverview',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				var ticker = [], tickers = [];
				for (x in results) {
					ticker = [results[x].tickerId, results[x].symbol];
					tickers.push(ticker);
				}

				appendList($('#ticker-select'),'option',tickers);
			}
		});

	});

	$('#calc-date-submit').click( function () {

		var data = JSON.stringify({
			'todo' : 'calc',
			'params' : {
				'accountId' : $('#account-select').val(),
				'calcDate' : $('#calc-date').val()
			}
		});

		$.ajax('portfolioOverview',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data
		});

		getPnl();

	});

	$('#ticker-select').change( function () {

		var data = JSON.stringify({
			'todo' : 'pnldtl',
			'params' : {
				'accountId' : $('#account-select').val(),
				'tickerId' : $(this).val()
			}
		});

		$.ajax('portfolioOverview',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				writePnlDtl(results);
			}
		});

	});

	function getPnl () {
		var data = JSON.stringify({
			'todo' : 'pnl',
			'params' : {
				'accountId' : $('#account-select').val()
			}
		});

		$.ajax('portfolioOverview',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				//console.log(results);
				writePnl(results);
			}
		});
	}

	function writePnl (results) {
		var pnldiv = $('#pnl');
		pnldiv.empty();
		pnldiv.append('<thead><th>');
		var headder = $('#pnl th');

		headder.append('<td>Date</td>');
		headder.append('<td>Book Value</td>');
		headder.append('<td>Mark-to-Market</td>');
		headder.append('<td>Overall PnL</td>');
		headder.append('<td>Overall Pnl %</td>');
		headder.append('<td>Period PnL</td>');
		headder.append('<td>Period PnL %</td>');
		headder.append('</th></thead><tbody>');

		var d, bookVal, mtm, pnl, pnlp, ppnl, ppnlp;

		for (x in results) {
			d = new Date(results[x].date);
			d = procDate(d);
			bookVal = Number(results[x].bookVal).toFixed(2);
			mtm = Number(results[x].mtm).toFixed(2);
			pnl = Number(results[x].pnl).toFixed(2);
			pnlp = Number(results[x].pnlRate*100).toFixed(2);
			ppnl = Number(results[x].sinceLast).toFixed(2);
			ppnlp = Number(results[x].sinceLastRate*100).toFixed(2);

			var id = "pnl-"+x;
			//console.log(id);
			pnldiv.append('<tr id="'+id+'">');
			var row = $('#pnl #'+id);
			row.append('<td>'+d+'</td>');
			row.append('<td>'+bookVal+'</td>');
			row.append('<td>'+mtm+'</td>');
			row.append('<td>'+pnl+'</td>');
			row.append('<td>'+pnlp+'</td>');
			row.append('<td>'+ppnl+'</td>');
			row.append('<td>'+ppnlp+'</td></tr>');
		}
			row.append('</tbody');

	}

	function writePnlDtl (results) {
		var pnldiv = $('#pnldtl');
		pnldiv.empty();
		pnldiv.append('<thead><th>');
		var headder = $('#pnldtl th');

		headder.append('<td>Date</td>');
		headder.append('<td>Book Value</td>');
		headder.append('<td>Position</td>');
		headder.append('<td>Mark-to-Market</td>');
		headder.append('<td>Overall PnL</td>');
		headder.append('<td>Overall Pnl %</td>');
		headder.append('<td>Period PnL</td>');
		headder.append('<td>Period PnL %</td>');
		headder.append('</th></thead><tbody>');

		var d, bookVal, mtm, pnl, pnlp, ppnl, ppnlp, pos;

		for (x in results) {
			d = new Date(results[x].date);
			d = procDate(d);
			bookVal = Number(results[x].bookVal).toFixed(2);
			pos = Number(results[x].position).toFixed(2);
			mtm = Number(results[x].mtm).toFixed(2);
			pnl = Number(results[x].pnl).toFixed(2);
			pnlp = Number(results[x].pnlRate*100).toFixed(2);
			ppnl = Number(results[x].sinceLast).toFixed(2);
			ppnlp = Number(results[x].sinceLastRate*100).toFixed(2);

			var id = "pnldtl-"+x;
			//console.log(id);
			pnldiv.append('<tr id="'+id+'">');
			var row = $('#pnldtl #'+id);
			row.append('<td>'+d+'</td>');
			row.append('<td>'+bookVal+'</td>');
			row.append('<td>'+pos+'</td>');
			row.append('<td>'+mtm+'</td>');
			row.append('<td>'+pnl+'</td>');
			row.append('<td>'+pnlp+'</td>');
			row.append('<td>'+ppnl+'</td>');
			row.append('<td>'+ppnlp+'</td></tr>');
		}
			row.append('</tbody');

	}

});

function procDate(dateObj) {
  return dateObj.toISOString().substr(0,10);
}




	