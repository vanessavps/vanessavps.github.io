$( document ).ready(function() {
	$('.sidebar nav ul li').on( "click", function() {
		$('.sidebar nav ul li a').removeClass('active');
		$(this).find('a').addClass('active');
	});
});