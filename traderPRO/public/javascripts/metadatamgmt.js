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

});