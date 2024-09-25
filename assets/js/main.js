/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



async function fetchLatestVideos() {
	const apiKey = 'AIzaSyAQ5WURC2Z2OU0AJG4uyUacgQQn08gW4Yw';
	const channelId = 'UCRRLLlb0iqo0flVH1zhsABw';

	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${apiKey}&_=${Date.now()}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (!data.items || data.items.length === 0) {
			throw new Error('No se encontraron videos.');
		}

		const mainVideoContainer = document.getElementById('main-video-container');
		const videoList = document.getElementById('video-list');

		if (!mainVideoContainer || !videoList) {
			throw new Error('No se encontraron los contenedores de videos en el DOM.');
		}

		// Mostrar el último video
		const latestVideoId = data.items[0].id.videoId;
		mainVideoContainer.innerHTML = `
		  <iframe src="https://www.youtube.com/embed/${latestVideoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		`;

		// Generar la lista de videos
		videoList.innerHTML = data.items.map(item => {
			const videoId = item.id.videoId;
			const title = item.snippet.title;
			return `
			<div class="video-list-item" data-video-id="${videoId}">
			  ${title}
			</div>
		  `;
		}).join('');

		// Añadir evento de clic a cada elemento de la lista
		document.querySelectorAll('.video-list-item').forEach(item => {
			item.addEventListener('click', () => {
				const videoId = item.getAttribute('data-video-id');
				mainVideoContainer.innerHTML = `
			  <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			`;
			});
		});
	} catch (error) {
		console.error('Error fetching videos:', error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	fetchLatestVideos();
});

document.addEventListener('DOMContentLoaded', function () {
	// Selecciona todos los enlaces con la clase 'scroll-to'
	const scrollLinks = document.querySelectorAll('.scroll-to');

	scrollLinks.forEach(link => {
		link.addEventListener('click', function (event) {
			// Previene el comportamiento predeterminado del enlace
			event.preventDefault();

			// Obtiene el objetivo del desplazamiento desde el atributo 'href'
			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);

			// Realiza el desplazamiento suave hacia el objetivo
			targetElement.scrollIntoView({ behavior: 'smooth' });

			// Actualiza la URL sin el fragmento
			history.pushState(null, null, ' ');
		});
	});
});

(function ($) {
	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 0);
	});

	// Mobile?
	if (browser.mobile)
		$body.addClass('is-mobile');
	else {
		breakpoints.on('>medium', function () {
			$body.removeClass('is-mobile');
		});

		breakpoints.on('<=medium', function () {
			$body.addClass('is-mobile');
		});
	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1500,
		offset: $header.outerHeight()
	});

	// Menu.
	$('#menu')
		.append('<a href="#menu" class="close"></a>')
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-menu-visible'
		});

	// Header.
	if ($banner.length > 0 && $header.hasClass('alt')) {
		$window.on('resize', function () {
			$window.trigger('scroll');
		});

		$banner.scrollex({
			bottom: $header.outerHeight() + 1,
			terminate: function () {
				$header.removeClass('alt');
			},
			enter: function () {
				$header.addClass('alt');
			},
			leave: function () {
				$header.removeClass('alt');
			}
		});
	}
})(jQuery);