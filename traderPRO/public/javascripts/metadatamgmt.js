$(document).ready( function() {

	$('.hidden').hide();

	// update industry list when sector updated
	$('#add-company-field-sector').change( function () {
		var sectorId = $('#add-company-field-sector select').val();
		var sqlParams = JSON.stringify({
			'todo' : 'getIndustries',
			'sqlParams' : {
				'sectorId' : sectorId
			}
		});	

		$.ajax('metadatamgmt',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : sqlParams,
			success : function (results) {
				var industry = [], industries = [];
				for (x in results) {
					industry = [results[x].industryId, results[x].industry];
					industries.push(industry);
				}
				var industrySelect = $('#add-company-field-industry select');
				appendList(industrySelect,'option',industries);
				$('#add-company-field-industry').show();
			}
		});
	});

		// update industry list when sector updated
	// $('#update-company-field-sector').change( function () {
	// 	var sectorId = $('#update-company-field-sector select').val();
	// 	var data = JSON.stringify({
	// 		'todo' : 'getIndustries',
	// 		'sqlParams' : {
	// 			'sectorId' : sectorId
	// 		}
	// 	});	

	// 	$.ajax('metadatamgmt',{
	// 		type : 'POST',
	// 		contentType : 'application/json',
	// 		dataType : 'JSON',
	// 		data : data,
	// 		success : function (results) {
	// 			var industry = [], industries = [];
	// 			for (x in results) {
	// 				industry = [results[x].industryId, results[x].industry];
	// 				industries.push(industry);
	// 			}
	// 			var industrySelect = $('#update-company-field-industry select');
	// 			appendList(industrySelect,'option',industries);
	// 			$('#update-company-field-industry').show();
	// 		}
	// 	});
	// });

	$('#add-company-submit').click( function () {
        var companyName = $('#add-company-field-companyName input').val();
        var marketCap = $('#add-company-field-marketCap input').val();
        var industryId = $('#add-company-field-industry select').val();

        var data = JSON.stringify({
            'todo' : 'addCompany', 
            'sqlParams' : {
                'companyName' : companyName, 
                'marketCap' : marketCap,
                'industryId' : industryId 
            }
        })

        $.ajax('metadatamgmt',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("New Company Added");
                    location.reload();
                }
            }
        });

    });
	$('#add-ticker-select-assetClass').change( function () {
		var assetClassId = $('#add-ticker-select-assetClass').val();
		
		$('#add-ticker-form .hidden').show();

		if (assetClassId == 1) {
			$('#add-ticker-field-companyName').hide();
		}
		else {
			$('#add-ticker-field-companyName').show();
		}
    });

	$('#add-ticker-submit').click( function () {
        var symbol = $('#add-ticker-field-symbol input').val();
        var assetClassId = $('#add-ticker-field-assetClass select').val();
        var countryId = $('#add-ticker-field-country select').val();
        var currencyId = $('#add-ticker-field-currency select').val();
        var companyId = $('#add-ticker-field-companyName select').val();

        var data = JSON.stringify({
            'todo' : 'addTicker', 
            'sqlParams' : {
                'symbol' : symbol,
                'assetClassId' : assetClassId,
                'countryId' : countryId,
                'currencyId' : currencyId, 
                'companyId' : companyId 
            }
        });

        $.ajax('metadatamgmt',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("New Ticker Added");
                    location.reload();
                }
            }
        });

    });
	$('#update-company-select-company').change( function () {
		var companyId = $(this).val();
		
		var data = JSON.stringify({
			'todo' : 'getCompanyData',
			'sqlParams' : {
				'companyId' : companyId
			}
		});	

		$.ajax('metadatamgmt',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				var companyName = results[0].companyName;
				var marketCap =results[0].marketCap;
				var industry = results[0].industryId;

				$('#update-company-name').val(companyName);
				$('#update-company-marketCap').val(marketCap);
				$('#update-company-industry').val(industry);

				$('#update-company-form .hidden').show();
			}
		});
	});
	$('#update-company-submit').click( function () {
        var companyId = $('#update-company-select-company').val();
        var companyName = $('#update-company-name').val();
        var marketCap = $('#update-company-marketCap').val();
        var industryId = $('#update-company-industry').val();

        var data = JSON.stringify({
            'todo' : 'updateCompany', 
            'sqlParams' : {
                'companyId' : companyId,
                'companyName' : companyName, 
                'marketCap' : marketCap,
                'industryId' : industryId 
            }
        })

        $.ajax('metadatamgmt',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("Company Updated");
                    location.reload();
                }
            }
        });

    });
  	$('#add-ticker-submit').click( function () {
        var symbol = $('#add-ticker-field-symbol input').val();
        var assetClassId = $('#add-ticker-field-assetClass select').val();
        var countryId = $('#add-ticker-field-country select').val();
        var currencyId = $('#add-ticker-field-currency select').val();
        var companyId = $('#add-ticker-field-companyName select').val();

        var data = JSON.stringify({
            'todo' : 'addTicker', 
            'sqlParams' : {
                'symbol' : symbol,
                'assetClassId' : assetClassId,
                'countryId' : countryId,
                'currencyId' : currencyId, 
                'companyId' : companyId 
            }
        });

        $.ajax('metadatamgmt',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("New Ticker Added");
                    location.reload();
                }
            }
        });

    });
	$('#select-ticker-field-country').change( function () {
		var countryId = $(this).val();
		
		var data = JSON.stringify({
			'todo' : 'getCountryTickers',
			'sqlParams' : {
				'countryId' : countryId
			}
		});	

		$.ajax('metadatamgmt',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				var ticker = [], tickers = [];
				for (x in results) {
					ticker= [results[x].tickerId, results[x].symbol];
					tickers.push(ticker);
				}
				var tickerSelect = $('#select-ticker-field-symbol select');
				appendList(tickerSelect,'option',tickers);
				$('#select-ticker-field-symbol').show();

			}
		});
	});
	$('#ticker-select-symbol').change( function () {
		var tickerId = $(this).val();
		
		var data = JSON.stringify({
			'todo' : 'getTickerData',
			'sqlParams' : {
				'tickerId' : tickerId
			}
		});	

		$.ajax('metadatamgmt',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				console.log(results);
				var symbol = results[0].symbol;
				var assetClassId =results[0].assetClassId;
				var country = results[0].countryId;
				var company = results[0].companyId;
				var currency = results[0].currencyId

				$('#update-ticker-select-country').val(country);
				$('#update-ticker-symbol').val(symbol);
				$('#update-ticker-assetClass-select').val(assetClassId);
				$('#update-ticker-select-company').val(company);
				$('#update-ticker-currency-select').val(currency);

				$('#update-ticker-form').show();

				if (assetClassId == 1) {
					$('#update-ticker-field-company').hide();
				}
				else {
					$('#update-ticker-field-company').show();
				}

			}
		});
	});
	
	$('#update-ticker-assetClass-select').change( function () {
		var assetClassId = $('#update-ticker-assetClass-select').val();

		if (assetClassId == 1) {
			$('#update-ticker-field-company').hide();
		}
		else {
			$('#update-ticker-field-company').show();
		}
    });

	$('#update-ticker-submit').click( function () {
        var tickerId = $('#ticker-select-symbol').val();
        var symbol = $('#update-ticker-symbol').val();
        var assetClassId = $('#update-ticker-assetClass-select').val();
        var countryId = $('#update-ticker-select-country').val();
        var currencyId = $('#update-ticker-currency-select').val();
        var companyId = $('#update-ticker-select-company').val();

        var data = JSON.stringify({
            'todo' : 'updateTicker', 
            'sqlParams' : {
                'tickerId' : tickerId,
                'symbol' : symbol,
                'assetClassId' : assetClassId,
                'countryId' : countryId,
                'currencyId' : currencyId, 
                'companyId' : companyId 
            }
        });

        $.ajax('metadatamgmt',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("New Ticker Added");
                    location.reload();
                }
            }
        });

    });

});