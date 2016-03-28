$(document).ready( function () {

	$('.hidden-before-param').hide();

	$('#account-select').change( function () {
		accountId = $(this).val();

		var data = JSON.stringify({
			'todo' : 'getPortfolio',
			'params' : {
				'accountId' : accountId
			}
		});

		console.log(data);

		$.ajax('portfolioOverview',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : data,
			success : function (results) {
			}
		});

		$('.hidden-before-param').show();

	});

});




	