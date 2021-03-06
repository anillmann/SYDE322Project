var accountId = null;

$(document).ready( function () {

	//$('#get-trans-form').dynatable();

	$('.hidden-before-param').hide();
	$('.hidden').hide();
	$('.date-field').datepicker();

	$('#account-select').change( function () {
		accountId = $(this).val();

		getRecentTrans();

        clearTransactionForm();
		$('.hidden-before-param').show();


	});

	function clearTransactionForm () {
		$("#add-trans-form")[0].reset();
		$('.hidden').hide();
	}

	$('#add-trans-field-assetClass select').change( function () {
		var assetClassId = $(this).val();

		// For Cash
		if (assetClassId == 1) {
			$('#add-trans-field-transPrice input').val(1);
			$('#add-trans-field-transPrice').hide();
			$('#add-trans-field-transAmt').attr('step',0.01);
		} else {
			$('#add-trans-field-transPrice input').val(null);
			$('#add-trans-field-transPrice').show();
			$('#add-trans-field-transAmt').attr('step',1);
		}

		var data = JSON.stringify({
			'todo' : 'getTransTypes',
			'params' : {
				'assetClassId' : assetClassId
			}
		});	

		$.ajax('trade',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				var thing = [], transTypes = [], tickers = [];
				for (x in results[0]) {
					thing = [results[0][x].transTypeId, results[0][x].transType];
					transTypes.push(thing);
				}
				for (x in results[1]) {
					thing = [results[1][x].tickerId, results[1][x].symbol];
					tickers.push(thing);
				}
				var transTypeList = $('#add-trans-field-transType select');
				appendList(transTypeList,'option',transTypes);
				var tickerList = $('#add-trans-field-ticker select');
				appendList(tickerList,'option',tickers);
				$('#add-trans-form .hidden').show();
			}
		});
	});
	$('#select-trans-select').change( function () {
		var transId = $(this).val();

		var data = JSON.stringify({
			'todo' : 'getTrans',
			'params' : {
				'transId' : transId
			}
		});	

		$.ajax('trade',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				console.log(results);
				var transType = results[0].transTypeId;
				var transDate =results[0].transDate;
				var dateStr = $.datepicker.formatDate("mm/dd/yy", new Date(transDate));
				var transPrice = results[0].transPrice;
				var transAmt = results[0].transAmt;
				var tickerId = results[0].tickerId;

				$('#update-trans-select-type').val(transType);
				$('#update-trans-select-ticker').val(tickerId);
				$('#update-trans-select-date').val(dateStr);
				$('#update-trans-select-price').val(transPrice);
				$('#update-trans-select-transAmt').val(transAmt);

				$('#update-transaction-form').show();
			}
		});
	});

	$('#add-trans-submit').click( function () {
		var transTypeId = $('#add-trans-field-transType select').val();
		var transType = $('#add-trans-field-transType select :selected').text();
		var tranDate = $('#add-trans-field-transDate input').val();
		var transPrice = $('#add-trans-field-transPrice input').val();
		var transAmt = $('#add-trans-field-transAmt input').val();
		var tickerId = $('#add-trans-field-ticker select').val();

		transConfirm(transTypeId,transType,tranDate,transPrice,transAmt,tickerId,accountId,'insert');

	});
	$('#update-trans-submit-button').click( function () {
        var transId = $('#select-trans-select').val();
        var transTypeId = $('#update-trans-select-type').val();
        var transDate = $('#update-trans-select-date').val();       
        var transPrice = $('#update-trans-select-price').val();
        var transAmt = $('#update-trans-select-transAmt').val();
        var tickerId = $('#update-trans-select-ticker').val();


        var data = JSON.stringify({
            'todo' : 'updateTrans', 
            'params' : {
                'transId' : transId,
                'transTypeId' : transTypeId,
                'transDate' : transDate,
                'transPrice' : transPrice,
                'transAmt' : transAmt, 
                'tickerId' : tickerId 
            }
        });

        $.ajax('trade',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("Transaction updated");
                    getRecentTrans();
                    location.reload();
                }
            }
        });

    });
	$('#update-trans-delete').click( function () {
        var transId = $('#select-trans-select').val();

        var data = JSON.stringify({
            'todo' : 'deleteTrans', 
            'params' : {
                'transId' : transId,
            }
        });

        $.ajax('trade',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("Transaction deleted");
                    getRecentTrans();
                    location.reload();
                }
            }
        });

    });

	function transConfirm (typeId,type,date,price,amt,ticker,account,action) {
		var dialog = $('#trans-confirm');

		var data = JSON.stringify({
			'todo' : 'getTickerDetails',
			'params' : {
				'tickerId' : ticker
			}
		});	

		$.ajax('trade',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				//console.log(results);
				var assetClassId = results[0].assetClassId;
				var assetClass = results[0].assetClass;
				var currencyCode = results[0].currencyCode;

				dialog.attr('title','Confirm '+assetClass+' Transaction');
				switch (assetClassId) {
					case 1 : // Cash
						dialog.append('<h5>Details:</h5>');
						dialog.append('<p>Action: '+type+'</p>');
						dialog.append('<p>Currency: '+currencyCode+'</p>');
						dialog.append('<p>Amount: '+parseFloat(amt).toFixed(2)+'</p>');
						dialog.append('<p>Date: '+date+'</p>');
						break;
					default :
						var companyName = results[0].companyName;
						var country = results[0].country;
						dialog.append('<h5>Company Details:</h5>');
						dialog.append('<p>Company: '+companyName+'</p>');
						dialog.append('<p>Country of Trade: '+country+'</p>');
						dialog.append('<p>Currency of Trade: '+currencyCode+'</p>');
						dialog.append('<h5>Amount Details:</h5>');
						dialog.append('<p>Action: '+type+'</p>');
						dialog.append('<p>Amount: '+amt+'</p>');
						dialog.append('<p>Amount: '+parseFloat(price).toFixed(2)+'</p>');
						dialog.append('<p>Date: '+date+'</p>');
						break;
				}
				dialog.dialog({
					buttons : {
						'Submit Transaction' : function () {
							submitTrans(typeId,date,price,amt,ticker,account,action);
							getRecentTrans();
						}, 
						Cancel : function () {
							clearTransactionForm();
							getRecentTrans();
							$(this).dialog('destroy').empty();
						}
					},
					close : function () {
						//clearTransactionForm();
						$(this).dialog('close').empty();
						getRecentTrans();
					}
				});
			}
		});

		function submitTrans(typeId,date,price,amt,ticker,account,action) {
			switch (action) {
				case 'insert' :
					data = JSON.stringify({
						'todo' : 'insertTrans',
						'params' : {
							'transTypeId' : typeId,
							'transDate' : date,
							'transPrice' : price,
							'transAmt' : amt,
							'tickerId' : ticker,
							'accountId' : account
						}
					});	
					break;
			}
			console.log(data);
			$.ajax('trade',{
				type : 'POST',
				contentType : 'application/json',
				dataType : 'JSON',
				data : data,
				success : function (results) {
					clearTransactionForm();
					$('#trans-confirm').dialog('close').empty();
				}

			});
		};		
	}


	function writeRecentTrans (results) {
		var pnldiv = $('#recent-trans');
		pnldiv.empty();
		pnldiv.append('<thead><th>');
		var headder = $('#recent-trans th');

		headder.append('<td>id</td>');
		headder.append('<td>Ticker</td>');
		headder.append('<td>Transaction Type</td>');
		headder.append('<td>Date</td>');
		headder.append('<td>Price</td>');
		headder.append('<td>Amount</td>');
		headder.append('</th></thead><tbody>');

		var transid, ticker, tt, transDate, price, amt; 
		var transaction = [], transactions = [];

		for (x in results) {
			transDate = new Date(results[x].transDate);
			transDate = procDate(transDate);
			ticker = results[x].symbol;
			transid = results[x].transId;
			tt = results[x].transType;
			price = Number(results[x].transPrice).toFixed(2);
			amt = Number(results[x].transAmt).toFixed(2);

			var id = "recent-trans-"+x;
			//console.log(id);
			pnldiv.append('<tr id="'+id+'">');
			var row = $('#recent-trans #'+id);
			row.append('<td>'+transid+'</td>');
			row.append('<td>'+ticker+'</td>');
			row.append('<td>'+tt+'</td>');
			row.append('<td>'+transDate+'</td>');
			row.append('<td>'+price+'</td>');
			row.append('<td>'+amt+'</td></tr>');

			transaction = [transid, transid]
			transactions.push(transaction);
		}
			row.append('</tbody');
			appendList($('#select-trans-select'),'option',transactions);

	}

	function getRecentTrans () {
		var accountId = $('#account-select').val();

		var data = JSON.stringify({
			'todo' : 'getTransFormat',
			'params' : {
				'accountId' : accountId
			}
		});	

		$.ajax('trade',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				console.log(results);
				writeRecentTrans(results);
			}
		});
	}

});

function procDate(dateObj) {
  return dateObj.toISOString().substr(0,10);
}