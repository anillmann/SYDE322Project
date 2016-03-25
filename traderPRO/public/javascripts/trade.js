var accountId = null;

$(document).ready( function () {

	$('.hidden-before-param .hidden').hide();

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
				var thing = [], things = [];
				for (x in results) {
					thing = [results[x].transTypeId, results[x].transType];
					things.push(thing);
				}
				var list = $('#add-trans-field-transType select');
				appendList(list,'option',things);
				$('#add-trans-field-transType').show();
			}
		});


	});

});