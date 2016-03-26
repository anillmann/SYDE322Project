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
	$('#update-company-field-sector').change( function () {
		var sectorId = $('#update-company-field-sector select').val();
		var data = JSON.stringify({
			'todo' : 'getIndustries',
			'sqlParams' : {
				'sectorId' : sectorId
			}
		});	

		$.ajax('metadatamgmt',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
				var industry = [], industries = [];
				for (x in results) {
					industry = [results[x].industryId, results[x].industry];
					industries.push(industry);
				}
				var industrySelect = $('#update-company-field-industry select');
				appendList(industrySelect,'option',industries);
				$('#update-company-field-industry').show();
			}
		});
	});

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


});