// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

VANTA.NET({
	//Add the id of your tag with the # before
	el: "#anim_net",
	mouseControls: false,
	touchControls: false,
	gyroControls: false,
	minHeight: 200.00,
	minWidth: 200.00,
	scale: 1.00,
	scaleMobile: 1.00,
	color: 0xFB8500,
	backgroundColor: 0x023047,
	points: 20.00,
	maxDistance: 27.00,
	spacing: 19.00,
	showDots: true
})

// top disappear on scroll
document.addEventListener('scroll', function() {
	const sections = document.querySelectorAll('.fade-section');
	const fadeHeight = 100; // Height of the fading area for each section

	sections.forEach((section) => {
		const sectionTop = section.getBoundingClientRect().top;
		const viewportHeight = window.innerHeight;

		let opacity = 1;
		if (sectionTop < fadeHeight) {
			opacity = sectionTop / fadeHeight;
		}

		section.style.opacity = opacity;
	});
});

$(document).ready(function() {
	var scrollTop = $(window).scrollTop();
	var checkIfTop = (scrollTop == 0);
	var navbar = $('.navbar');
	var collapse = $('.collapse');

	// Navbar color on page load
	if ($(window).width() <= 600) {
		navbar.css('background-color', 'transparent');
		collapse.css("background-color", "#242B35");
		collapse.css("border-color", "transparent");
	} else if ($(window).width() > 600 && scrollTop > 0) {
		navbar.css('background-color', '#242B35');
		$('.navbar li a, .navbar').css('font-size', '15px');
	} else {
		navbar.css('background-color', 'transparent');
		$('.navbar li a, .navbar').css('font-size', '12px');
	}

	// Close collapse menu after click on small screens
	$(document).on('click', '.navbar-collapse.in', function(e) {
		if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
			$(this).collapse('hide');
		}
	});

	// Navbar slide function
	$(window).on('scroll', function() {
		scrollTop = $(window).scrollTop();

		if (scrollTop == 0 && $(window).width() > 600) {
			checkIfTop = true;
			navbar.css('background-color', 'transparent');
			$('.navbar li a, .navbar').css('font-size', '12px');

		} else if (scrollTop != 0 && $(window).width() > 600) {
			if (checkIfTop) {
				checkIfTop = false;
				navbar.css('background-color', '#242B35');
				$('.navbar li a, .navbar').css('font-size', '15px');
			}
		}
	});

	// Smooth scroll
	$(".navbar a, .jumbotron a, footer a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 900, function() {
				window.location.hash = hash;
			});
		}
	});
});

