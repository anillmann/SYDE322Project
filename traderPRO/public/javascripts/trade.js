var accountId = null;

$(document).ready( function () {

	$('.hidden-before-param').hide();
	$('.hidden').hide();
	$('.date-field').datepicker();

	$('#account-select').change( function () {
		accountId = $(this).val();
		$('.hidden-before-param').show();
	});

	$('#add-trans-field-assetClass select').change( function () {
		var assetClassId = $(this).val();

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
				$('.hidden').show();
			}
		});
	});
});