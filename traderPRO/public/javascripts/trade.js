var accountId = null;

$(document).ready( function () {

	$('.hidden-before-param').hide();

	$('#account-select').change( function () {
		accountId = $(this).val();
		$('.hidden-before-param').show();
	});

});