$(document).ready(function() {
	const isLocal = window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1" ||
		window.location.protocol === "file:";

	console.log("Local env: " + isLocal);
	if (!isLocal) {
		initSectionTracking();
		initCVDownloadTracking();
		initSocialClickTracking();
	}

	if ($(window).width() <= 1100) {
		$('nav').append('<div class="menu-toggle">[ MENU ]</div>');
	}

	$('.menu-toggle').click(function() {
		$('.nav-links').toggleClass('active');
		if ($('.nav-links').hasClass('active')) {
			$(this).text('[ CLOSE ]');
		} else {
			$(this).text('[ MENU ]');
		}
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

function initCVDownloadTracking() {
	const $cvLinks = $('a[href$=".pdf"]');

	if (typeof gtag !== 'function' || $cvLinks.length === 0) {
		return;
	}

	$cvLinks.on('click', function() {
		const fileName = $(this).attr('href').split('/').pop();

		gtag('event', 'file_download', {
			'file_name': fileName,
			'file_extension': 'pdf',
			'link_text': $(this).text().trim()
		});

		console.log('GA4 Tracking: CV Downloaded -', fileName);
	});
}

function initSocialClickTracking() {
	const $socialLinks = $('.social-link.github, .social-link.linkedin');

	if (typeof gtag !== 'function') {
		return;
	}

	$socialLinks.on('click', function() {
		const platform = $(this).hasClass('github') ? 'GitHub' : 'LinkedIn';

		gtag('event', 'social_click', {
			'platform': platform,
			'link_url': $(this).attr('href')
		});

		console.log(`GA4 Tracking: Social Click - ${platform}`);
	});
}

function initSectionTracking() {
	const $sections = $('section[id], .hero-container');

	// Safety check: ensure gtag is defined and observer is supported
	if (typeof gtag !== 'function' || !window.IntersectionObserver) {
		return;
	}

	const observerOptions = {
		root: null,
		threshold: 0.6
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const sectionId = $(entry.target).attr('id') || 'hero';

				gtag('event', 'section_view', {
					'section_name': sectionId
				});

				console.log('GA4 Tracking:', sectionId);
			}
		});
	}, observerOptions);

	$sections.each(function() {
		observer.observe(this);
	});
}