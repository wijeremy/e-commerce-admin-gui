$(document).ready(function () {
	$('#signup-form').hide();
	$('.create-account').on('click', function () {
		$('#signup-form').show('slow');
		$('#login-form').hide('slow');
	});
	$('.login').on('click', function () {
		$('#signup-form').hide('slow');
		$('#login-form').show('slow');
	});
});
