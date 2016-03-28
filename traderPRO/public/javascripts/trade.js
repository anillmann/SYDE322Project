var accountId = null;

$(document).ready( function () {

	//$('#get-trans-form').dynatable();

	$('.hidden-before-param').hide();
	$('.hidden').hide();
	$('.date-field').datepicker();

	$('#account-select').change( function () {
		accountId = $(this).val();


        clearTransactionForm();
		$('.hidden-before-param').show();

		var sqlParams = JSON.stringify({
			'todo' : 'getRecentTrans',
			'sqlParams' : {
				'accountId' : accountId
			}
		});

		$.ajax('trade',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : sqlParams,
			success : function(results){
				//$('#myTable > tbody:last-child').append('<tr><td>...</tr>');

			}
		});
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

	$('#add-trans-submit').click( function () {
		var transTypeId = $('#add-trans-field-transType select').val();
		var transType = $('#add-trans-field-transType select :selected').text();
		var tranDate = $('#add-trans-field-transDate input').val();
		var transPrice = $('#add-trans-field-transPrice input').val();
		var transAmt = $('#add-trans-field-transAmt input').val();
		var tickerId = $('#add-trans-field-ticker select').val();

		transConfirm(transTypeId,transType,tranDate,transPrice,transAmt,tickerId,accountId,'insert');

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
						}, 
						Cancel : function () {
							clearTransactionForm();
							$(this).dialog('destroy').empty();
						}
					},
					close : function () {
						//clearTransactionForm();
						$(this).dialog('close').empty();
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

});