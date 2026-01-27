$(document).ready(function() {
	if ($(window).width() <= 1100) {
		$('nav').append('<div class="menu-toggle">[ MENU ]</div>');
	}

	$('.menu-toggle').click(function() {
		$('.nav-links').toggleClass('active');
		$(this).text($(this).text() == '[ MENU ]' ? '[ CLOSE ]' : '[ MENU ]');
	});

	$('.nav-links a').click(function() {
		$('.nav-links').removeClass('active');
		$('.menu-toggle').text('[ MENU ]');
	});


	$('.creative-act').hover(function() {
		$('.glow-1').css({
			'opacity': '0.6',
			'transform': 'scale(1.5)',
			'transition': 'all 0.8s ease'
		});
	}, function() {
		$('.glow-1').css({
			'opacity': '0.15',
			'transform': 'scale(1)'
		});
	});

	$('body').append('<div class="custom-tooltip"></div>');

	$('.inline-link').hover(function(e) {
		var titleText = $(this).attr('title');
		$(this).data('tipText', titleText).removeAttr('title');

		$('.custom-tooltip').text(titleText).fadeIn('fast');
	}, function() {
		$(this).attr('title', $(this).data('tipText'));
		$('.custom-tooltip').hide();
	}).mousemove(function(e) {
		var mouseX = e.pageX + 20;
		var mouseY = e.pageY + 10;
		$('.custom-tooltip').css({ top: mouseY, left: mouseX });
	});


	$(window).scroll(function() {
		$('section').each(function() {
			let top = $(this).offset().top;
			let bottom = $(window).scrollTop() + $(window).height();
			if (bottom > top + 150) { $(this).css({'opacity': '1', 'transform': 'translateY(0)', 'transition': '1s'}); }
		});
	});
});