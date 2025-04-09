$( document ).ready(function() {
	$('.sidebar nav ul li').on( "click", function() {
		$('.sidebar nav ul li a').removeClass('active');
		$(this).find('a').addClass('active');
	});
});

$(document).ready(function() {
	$("a[href^='#']").on("click", function(event) {
		event.preventDefault();
		var target = $(this.getAttribute("href"));
		if (target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top -80
			}, 800);
		}
	});
});

document.addEventListener("mousemove", function(event) {
	const flashlight = document.getElementById("flashlight");
	flashlight.style.setProperty("--x", event.clientX + "px");
	flashlight.style.setProperty("--y", event.clientY + "px");
});

$(window).on("scroll", function() {
	let scrollPosition = $(window).scrollTop();
	$("section").each(function() {
		let sectionTop = $(this).offset().top - 500;
		let sectionId = $(this).attr("id");
		if (scrollPosition >= sectionTop) {
			$("nav ul li a").removeClass("active");
			$("nav ul li a[href='#" + sectionId + "']").addClass("active");
		}
	});
});