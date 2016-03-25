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
				var industrySelect = $('#update-company-field-industry select');
				appendList(industrySelect,'option',industries);
				$('#update-company-field-industry').show();
			}
		});
	});


});