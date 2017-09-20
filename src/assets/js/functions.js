var tabsInit;
var scrlLck;
var sliderMain;
var add_has_dropdown_class_;
var nav_overlay_on_hover;

;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var winH = $win.height();
	var $jadNavAutoplaySpeed = 5000;

	$doc.ready(function() {
		// Add class if has dropdown
		add_has_dropdown_class_ = function(){
			setTimeout(function(){
				$('.nav li, .nav-access li').each(function() {
					var $this = $(this);
					//console.log('each');
					if ( $this.find('.dropdown').length ) {
						$this.addClass('has-dropdown');
						//console.log($this.hasClass('has-dropdown'));
					};
				});
			},500);
			
		}

		// Nav hover overlay

		nav_overlay_on_hover = function(){
			$('.nav .has-dropdown').mouseenter(
				function() {
					$('.container').addClass('overlay');
				}
			);
	
			$('.nav .dropdown, .nav .has-dropdown > a').mouseleave(
				function() {
					$('.container').removeClass('overlay');
				}
			);
		}

		// Close nav on ESC key press
		$doc.keyup(function(e) {
			if (e.keyCode == 27) { // escape key maps to keycode `27`
				$('.nav-sidebar, .wrapper, body').removeClass('active');

				closeInterested();
				closeSearch();
			}
		});

		$('.nav-access .has-dropdown > a').on('click', function(event) {
			event.preventDefault();

			$(this).toggleClass('active');
			$(this).next('.dropdown').toggleClass('active');
		});

		// Get image src and puts in to background
		$('.fullsize-bg').each(function() {
			var $img = $(this);

			$img.addClass('hidden');
			$(this).parent().addClass('container-fullsize').css('background-image', 'url('+ $img.attr('src') +')');
		});

		// Slider Announcements
		$('.slider-announcements .owl-carousel').owlCarousel({
			loop: false,
			items : 2,
			margin:10,
			autoWidth:true,
			nav:true,
			navText: [
				'<i class="fa fa-arrow-circle-left" aria-hidden="true"></i>',
				'<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>'
			]
		});

		sliderWheelScroll($('.slider-announcements .owl-carousel'));
		sliderWheelScroll($('.slider-roundups .owl-carousel'));
		sliderWheelScroll($('.slider-roundups-secondary .owl-carousel'));

		// Slider Player

		$('.slider-player .owl-carousel').owlCarousel({
			loop: true,
			items: 1,
			margin:0,
			nav:false,
			autoplay: true,
			autoplayTimeout:4000,
			autoplayHoverPause:false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			dotsContainer: '.slider-player .slider-nav'
		});

		// Slider Roundups
		$('.slider-roundups .owl-carousel').owlCarousel({
			loop: false,
			items: 3,
			margin:13,
			nav:false,
			autoWidth:true,
			mouseDrag:false
		});

		// Slider feed
		$('.slider-feed .owl-carousel').owlCarousel({
			loop: false,
			items: 3,
			margin:28,
			nav:false,
			autoWidth:true,
			mouseDrag:false
		});

		$('.slider-interview .owl-carousel').owlCarousel({
			loop: false,
			items: 3,
			margin:18,
			nav:false,
			autoWidth:true,
			mouseDrag:false
		});

		$('.slider-population .owl-carousel').owlCarousel({
			loop: true,
			items: 1,
			margin:10,
			nav:true,
			navText: [
				'<i class="fa fa-arrow-circle-left" aria-hidden="true"></i>',
				'<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>'
			],
			onInitialized: function(data) {
				animatePopulationSVG(data.item.index);
			},
			onTranslated: function(data){
				animatePopulationSVG(data.item.index);
			}
		});

		$('.slider-vox-populi .owl-carousel').owlCarousel({
			loop: true,
			items: 1,
			margin:0,
			autoplay: true,
			autoplayTimeout: 4000,
			nav:true,
			smartSpeed: 700,
			mouseDrag: false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			navText: [
				'<i class="fa fa-chevron-left" aria-hidden="true"></i>',
				'<i class="fa fa-chevron-right" aria-hidden="true"></i>'
			]
		});

		// Synced slider
		var sync1 = $('.slider-article .slides.owl-carousel'),
			sync2 = $('.slider-article .slider-thumbs.owl-carousel'),
			duration = 300;

		// Start Carousel
		sync1.owlCarousel({
			loop: true,
			items : 1,
			margin:0,
			nav : false,
			mouseDrag: false,
			linked: ".slider-article .slider-thumbs.owl-carousel"
		});

		sync1.on('translate.owl.carousel', function(event) {
			var item = sync1.find('.owl-dot.active').index() + 1;

			sync2.find('.owl-item').removeClass('clicked');
			sync2.find('.owl-item').eq(item - 1).addClass('clicked');
			sync2.trigger('to.owl.carousel', [item - 1, duration, true]);
			sync1.closest('.slider-article').find('.slider-meta .index').text('0' + item);
		});

		sync2
			.owlCarousel({
				loop: false,
				margin:10,
				nav : true,
				mouseDrag: false,
				navText: [
					'<i class="fa fa-arrow-circle-left" aria-hidden="true"></i>',
					'<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>'
				],
				linked: ".slider-article .slides.owl-carousel",
				responsive:{
					0:{
						items:5,
						margin:4
					},
					1024:{
						items:8,
						margin:6
					}
				}
			})
			.on('click touchend', '.owl-item', function() {
				var i = $(this).index();

				sync2.trigger('to.owl.carousel', [i, duration, true]);
				sync1.trigger('to.owl.carousel', [i, duration, true]);
			})
			.on('click', '.owl-prev', function() {
				sync1.trigger('prev.owl.carousel');
			})
			.on('click', '.owl-next', function() {
				sync1.trigger('next.owl.carousel');
			});

		$('.slider-article .slider-thumbs .owl-item:first-child').addClass('clicked');

		// Change slide on mouse scroll
		function sliderWheelScroll($slider) {
			$slider.on('mousewheel', '.owl-stage', function (e) {
				if (e.deltaY<0) {
					$slider.trigger('next.owl');
				} else {
					$slider.trigger('prev.owl');
				}
				e.preventDefault();
			});
		};

		// Expand Interests
		$('.link-interests').on('click', function(event) {
			event.preventDefault();

			$(this).addClass('hidden');
			$('.link-collapse').removeClass('hidden');
			$('.section-interested').addClass('active');
			$('.section-interested .section-body').slideDown();
		});

		// Collapse Interests
		$('.link-collapse').on('click', function(event) {
			event.preventDefault();

			closeInterested();
		});

		function closeInterested() {
			$('.link-interests').removeClass('hidden');
			$('.section-interested .section-body').slideUp();
			$('.wrapper, .section-interested').removeClass('active');
			$('.list-interests').removeClass('visible');
			$('.section-interested').removeClass('fixed');
			$('.link-collapse').addClass('hidden');
		};

		function moreInterests() {
			// More Interests
			$('.link-more').on('click', function(event) {
				event.preventDefault();

				$(this).closest('.list-interests').addClass('visible');
			});
		};
		moreInterests();

		// All Interests
		$('.link-all').on('click', function(event) {
			event.preventDefault();

			$('.section-interested').addClass('fixed');
			$('.wrapper').addClass('active');
		});

		function interestsToggle() {
			$('.list-interests a:not(.link-more):not(.link-all)').on('click', function(event) {
				event.preventDefault();

				$(this).toggleClass('clicked');

				if( $('.list-interests .clicked').length ) {
					$('.tabs-secondary .tab-item-interests').addClass('visible')
				} else {
					$('.tabs-secondary .tab-item-interests').removeClass('visible')
				}
			});
		};

		interestsToggle();

		tabsInit = function () {
			// Tabs
			(function(){
				// This class will be added to active tab link
				// and the content container
				var activeTabClass = 'current';

				$('.tabs-nav a').on('click', function(event) {
					var $tabLink = $(this);
					var $targetTab = $($tabLink.attr('href'));

					$tabLink
						.parent() // go up to the <li> element
						.add($targetTab)
						.addClass(activeTabClass)
							.siblings()
							.removeClass(activeTabClass);

					event.preventDefault();

					horizontalScroll();

					if( $win.width() < 768 && $tabLink.closest('.tabs').hasClass('tabs-secondary') ) {
						$(this).closest('.tabs-nav').toggleClass('active');
					}
				});

			})();
		};

		tabsInit();

		// Custom Select
		function customSelects() {
			// if( $win.width() < 768 ) {
			// 	$(".select").dropdown({
			// 		mobile: true
			// 	});
			// } else {
			// 	$(".select").dropdown();
			// }

			$(".select-secondary").dropdown({
				label: "Choose folder"
			});
		};
		customSelects();

		// Check if section has sidebar
		$('.section-articles').each(function() {
			if( !$(this).find('.section-aside').length ) {
				$(this).addClass('no-sidebar');
			};
		});

		// Post add 3 dots
		function addDots() {
			$('.post-body').each(function() {
				var $this = $(this);

				$(this).dotdotdot({
					watch: true
				});
			});

			$('.post-head').each(function() {
				var $this = $(this);

				$(this).dotdotdot({
					watch: true
				});
			});
		};

		// Last row posts remove border
		function removeBorderOfLastEl() {
			$('.tabs-secondary .tab').each(function() {
				var $tab = $(this);

				if( $(this).find('.section-articles').length ) {
					var $section = $(this).find('.section-articles');

					var $lastTop = $section.find('.section-content .post:last-child').offset().top;
					var $secondLastTop = $section.find('.section-content .post:nth-last-child(2)').offset().top;
					var $thirdLastTop = $section.find('.section-content .post:nth-last-child(3)').offset().top;
					var $fourthLastTop = $section.find('.section-content .post:nth-last-child(4)').offset().top;

					if( $lastTop == $secondLastTop ) {
						$section.find('.section-content .post:nth-last-child(2)').addClass('no-bd');
						$section.find('.section-content .post:last-child').addClass('no-bd');
					};

					if( $lastTop == $thirdLastTop ) {
						$section.find('.section-content .post:nth-last-child(3)').addClass('no-bd');
					};

					if( $lastTop == $fourthLastTop ) {
						$section.find('.section-content .post:nth-last-child(4)').addClass('no-bd');
					};
				};
			});

			$('.section-articles').each(function() {
				var $section = $(this);

				var $lastTop = $section.find('.section-content .post:last-child');
				var $secondLastTop = $section.find('.section-content .post:nth-last-child(2)');
				var $thirdLastTop = $section.find('.section-content .post:nth-last-child(3)');
				var $fourthLastTop = $section.find('.section-content .post:nth-last-child(4)');

				if( $secondLastTop.length && $lastTop.offset().top == $secondLastTop.offset().top ) {
					$section.find('.section-content .post:nth-last-child(2)').addClass('no-bd');
					$section.find('.section-content .post:last-child').addClass('no-bd');
				};

				if( $thirdLastTop.length && $lastTop.offset().top == $thirdLastTop.offset().top ) {
					$section.find('.section-content .post:nth-last-child(3)').addClass('no-bd');
				};

				if( $fourthLastTop.length && $lastTop.offset().top == $fourthLastTop.offset().top ) {
					$section.find('.section-content .post:nth-last-child(4)').addClass('no-bd');
				};
			});
		};
		removeBorderOfLastEl();

		// Slider Custom Scroll
		function horizontalScroll() {
			if( $(".scrollable-horizontal").parent('.rtl').length ) {
				$(".scrollable-horizontal").mCustomScrollbar({
					axis:"x",
					scrollButtons:true,
					mouseWheel: {
						invert: true
					}
				});
			} else {
				$(".scrollable-horizontal").mCustomScrollbar({
					axis:"x",
					scrollButtons:true
				});
			}
		};
		horizontalScroll();

		function verticalScroll() {
			$(".scrollable-vertical").mCustomScrollbar({
				axis:"y"
			});
		};
		verticalScroll();

		$('.link-scroll-next').on('click', function(event) {
			event.preventDefault();

			var val=250;
			$('.scrollable-horizontal').mCustomScrollbar('scrollTo',"-="+val);
		});

		// Show pages nav
		$('.link-nav').on('click', function(event) {
			event.preventDefault();

			$('.nav-sidebar, .wrapper, body').toggleClass('active');
			closeSubMenu();
		});

		// Show search
		$('.link-search').on('click', function(event) {
			event.preventDefault();

			$('.search').toggleClass('active');
			$('.link-search-close').toggleClass('active');
			if( $('.search').hasClass('active') ) {
				$('.search-field').focus();
			};
		});

		// Hide search
		$('.link-search-close').on('click', function(event) {
			event.preventDefault();

			closeSearch();
		});

		function closeSearch() {
			$('.search').removeClass('active');
			$('.link-search-close').removeClass('active');
		};

		// Popup
		function openPopup() {
			$('.link-popup').magnificPopup({
				type: 'ajax',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				showCloseBtn:false,
				fixedContentPos: true,
				callbacks: {
					ajaxContentAdded: function() {
						customSelects();
						closePopup();
						interestsToggle();
						moreInterests();
						tabsInit();
						openPopup();
						changeAvatar();
						formSubmit();
						popupDropdown();
						progressText();
						scrlLck();
						datepick();
					},
					beforeOpen: function() { $('html').addClass('mfp-helper'); },
					close: function() { $('html').removeClass('mfp-helper'); }
				}
			});
		};
		openPopup();

		// Close Popup
		function closePopup() {
			$('.link-close-popup').on('click', function(event) {
				event.preventDefault();

				$.magnificPopup.close();
			});
		};
		closePopup();

		$('.tabs-secondary .tabs-nav a').on('click', function(event) {
			event.preventDefault();

			setTimeout(function() {
				addDots();
			}, 1);
		});

		// Turn list to select for mobile
		var $list   = $('.tabs-secondary .tabs-nav ul'),
			$select = $('<select class="" />');

		$list.children('li').each(function(index) {
			var $link = $(this).find('a').attr('href');

			$select.append($('<option />').attr('value', $link).html($(this).html()));
		});

		$('.tabs-secondary .tabs-nav').append($select);

		var activeTabClass = 'current';

		$('.tabs-secondary .tabs-nav select').on('change', function(event) {
			var $tabLink = $('.select').val();

			$('.tab' + $tabLink)
				.addClass(activeTabClass)
					.siblings()
					.removeClass(activeTabClass);

			event.preventDefault();
		});

		// Expand Widgets on mobile
		$('.widget-primary .widget-title').on('click', function() {
			$(this).closest('.widget-primary').toggleClass('expanded');
		});

		// Expand Sitemap
		$('.link-sitemap').on('click', function(event) {
			event.preventDefault();

			$('.footer').toggleClass('expanded');
			$(this).toggleClass('active');
			var text = $(this).text();
			$(this).text(text == 'Open sitemap' ? 'Close sitemap' : 'Open sitemap');
			stickyFooter();
		});

		// Show Share options
		$('.toggle-share').on('click', function(event) {
			event.preventDefault();

			if( $win.width() > 767 ) {
				$(this).next('ul').slideToggle();
			} else {
				$(this).next('ul').toggleClass('active');
			};
		});

		$('.socials-tertiary').hover(
			function() {
				if( $win.width() > 767 ) {
					$(this).find('ul').stop().slideToggle();
				}
			},
			function() {
				if( $win.width() > 767 ) {
					$(this).find('ul').stop().slideToggle();
				}
			}
		);

		// Clone for mobile
		$('.section-next').clone().appendTo( $('.section-details').eq(0).find('.content') ).addClass('cloned');

		// Wrapper bottom spacing for fixed socials
		if( $('.widget-share').length ) {
			$('.wrapper').addClass('shareable');
		};

		// Lock scroll
		scrlLck = function() {
			$('.search, .nav-sidebar').scrollLock();
		};
		scrlLck();

		// Remove class on click outside
		$doc.on('click touchend', function(event) {
			var $target = $(event.target);

			if (!$target.is('.link-nav, .link-nav *, .nav-sidebar, .nav-sidebar *, .link-all, .section-interested, .section-interested *, .popup, .popup *, .section-account, .section-account *')) {
				$('.nav-sidebar, .wrapper, body').removeClass('active');
				$('.section-interested').removeClass('fixed');
				$('.list-interests').removeClass('visible');
				closeSubMenu();
			}

			if (!$target.is('.nav-access, .nav-access *')) {
				$('.nav-access .dropdown, .nav-access a, .link-lang').removeClass('active');

			}
		});

		// Animate on scroll
		function animate(winST) {
			$('.animations').each(function(){
				if (winST + winH * 0.85 > $(this).offset().top) {
					var animClass = $(this).data('animation');

					if ( !$(this).hasClass('animated') ) {
						$(this).addClass( 'animated' );
						$(this).addClass( animClass );
					}
				}
			});
		};

		// Remove hovers on mobile
		var touch = 'ontouchstart' in document.documentElement
					|| (navigator.MaxTouchPoints > 0)
					|| (navigator.msMaxTouchPoints > 0);

		if (touch) { // remove all :hover stylesheets
			try { // prevent exception on browsers not supporting DOM styleSheets properly
				for (var si in document.styleSheets) {
					var styleSheet = document.styleSheets[si];
					if (!styleSheet.rules) continue;

					for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
						if (!styleSheet.rules[ri].selectorText) continue;

						if (styleSheet.rules[ri].selectorText.match(':hover')) {
							styleSheet.deleteRule(ri);
						}
					}
				}
			} catch (ex) {}
		};

		// Show filter
		$('.link-filter').on('click', function(event) {
			event.preventDefault();

			$(this).toggleClass('active');
			$('.filter').toggleClass('active');

			datepick();
		});

		// Link avatar
		function changeAvatar() {
			$('.link-avatar').on('click', function(event) {
				event.preventDefault();

				$(this).toggleClass('active');
			});
		};
		changeAvatar();

		// Form submit
		function formSubmit() {
			$('.form-primary form').submit(function(event) {
				var $thankYou = $(this).parent().data('target');

				if( $thankYou !== null ) {
					event.preventDefault();

					$.magnificPopup.open({
						items: [{
							src: $thankYou,
							type: 'inline',
							fixedContentPos: true,
							callbacks: {
								beforeOpen: function() { $('html').addClass('mfp-helper'); },
								close: function() { $('html').removeClass('mfp-helper'); }
							}
						}]
					});
				}
			});
		};
		formSubmit();

		// Popup dropdown
		function popupDropdown() {
			$('.link-folders').on('click', function(event) {
				event.preventDefault();

				$(this).closest('.dropdown').toggleClass('active');

				verticalScroll();
			});
		};
		popupDropdown();

		// Google Maps

		if ($('.gmap').length) {
			function initialize() {
				var mapCanvas = document.getElementById('map');
				var lat = mapCanvas.dataset.lat;
				var lng = mapCanvas.dataset.lng;

				var mapOptions = {
					center: new google.maps.LatLng(lat, lng),
					zoom: 16,
					scrollwheel: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true
				}

				var map = new google.maps.Map(mapCanvas, mapOptions);

				var myIcon = new google.maps.MarkerImage("cssimages/ico-pin.png", null, null, null, new google.maps.Size(43,43));

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map: map,
					icon: myIcon
				});
			}

			google.maps.event.addDomListener(window, 'load', initialize);
		};

		if ($('.gmap2').length) {
			function initialize() {
				var mapCanvas = document.getElementById('map');
				var lat = mapCanvas.dataset.lat;
				var lng = mapCanvas.dataset.lng;

				var mapOptions = {
					center: new google.maps.LatLng(lat, lng),
					zoom: 5,
					scrollwheel: true,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true
				}

				var map = new google.maps.Map(mapCanvas, mapOptions);

				var myIcon = new google.maps.MarkerImage("cssimages/ico-pin-secondary.png", null, null, null, new google.maps.Size(31,43));

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map: map,
					icon: myIcon
				});
			}

			google.maps.event.addDomListener(window, 'load', initialize);
		};

		function googlemap($element, $locations, zoomLevel) {
			var mapOptions = {
				center: null,
				zoom: zoomLevel,
				scrollwheel: false,
				mapTypeId: google.maps.MapTypeId.SATELLITE,
				disableDefaultUI: true
			};
			var map = new google.maps.Map(document.getElementById($element), mapOptions);
			var bounds = new google.maps.LatLngBounds();

			for ( var i = 0; i < $locations.find('li').length; i++ ) {
				var latlng = new google.maps.LatLng($locations.find('li').eq(i).data('lat'), $locations.find('li').eq(i).data('lng'));

				var myIcon = new google.maps.MarkerImage("cssimages/ico-pin2.png", null, null, null, new google.maps.Size(44,44));

				var marker = new google.maps.Marker({
					map: map,
					position: latlng,
					icon: myIcon
				});

				bounds.extend(latlng);

				if ( i > 0 ) {
					map.fitBounds(bounds);
				} else {
					map.setCenter(latlng);
				};
			};
		};

		if ( $('.gmap3').length ) {
			googlemap('map', $('.list-locations'), 11);
		};

		// Accordion
		(function(){
			// This class will be added to the expanded item
			var activeItemClass = 'accordion-expanded';
			var accordionItemSelector = '.accordion-section';
			var toggleSelector = '.accordion .expand';

			$(toggleSelector).on('click', function(event) {
				event.preventDefault();

				$(this)
					.closest(accordionItemSelector) // go up to the accordion item element
						.toggleClass(activeItemClass)
							.siblings()
								.removeClass(activeItemClass);

				$(this).closest('.accordion').toggleClass('active');
				$('.list-actions-secondary').toggleClass('active');
			});
		})();

		// Share dropdown
		$('.link-share').on('click', function(event) {
			event.preventDefault();

			$(this).toggleClass('active');
			$(this).closest('.table-col').toggleClass('active');
			$(this).next('.dropdown').toggleClass('active');
		});

		$doc.on('click', function(event) {
			var $target = $(event.target);

			if (!$target.is('.table-articles .dropdown, .table-articles .dropdown *, .link-share, .link-share *')) {
				$('.table-articles .table-col.active, .table-articles .dropdown, .link-share').removeClass('active');
			}
		});

		// Progress bar text color
		function progressText() {
			$('.progress').each(function() {
				var $this = $(this);

				var $progressWidth = $this.find('.progress-bar').outerWidth();
				var $textWidth = $this.find('.progress-bar span').outerWidth();

				if( $textWidth + 10 < $progressWidth ) {
					$this.find('.progress-bar span').addClass('passed');
				} else {
					$this.find('.progress-bar span').removeClass('passed');
				}
			});
		};
		progressText();

		// Sticky Footer
		function stickyFooter() {
			if( $('.socials-tertiary').length ) {
				if( $win.width() < 768 ) {
					$('.wrapper').css('padding-bottom', $('.footer').outerHeight() + 58);
					$('.footer').css('bottom', '58px');
				} else {
					$('.wrapper').css('padding-bottom', $('.footer').outerHeight());
					$('.footer').css('bottom', '0');
				}
			} else {
				$('.wrapper').css('padding-bottom', $('.footer').outerHeight());
			}
		};
		stickyFooter();

		// Clone title on mobile
		$('.header-secondary:not(.header-secondary-alt):not(.header-default)').find('.header-outer h1').clone().appendTo('.header-secondary .header-inner .shell').addClass('cloned');

		// List Nav mobile
		$('.link-dropdown').on('click', function(event) {
			event.preventDefault();

			$(this).toggleClass('active');
			$('.list-navs').toggleClass('active');
			$('.main').toggleClass('active');
		});

		// Print Page
		$('.link-print').on('click', function(event) {
			event.preventDefault();

			window.print();
		});

		sliderMain = function() {
			// // Slider Primary

			var sync1 = $('.slider-primary .slides.owl-carousel'),
				sync2 = $('.slider-primary .slider-nav ul.owl-carousel'),
				duration = 300;

			// Start Carousel
			sync1.owlCarousel({
				loop: true,
				items: 1,
				margin:10,
				nav: false,
				mouseDrag: false,
				autoHeight: true,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
				autoplay: true,
				autoplayTimeout: 4000,
				onInitialized: function(event) {
					var slider = event.target;
					var items = event.item.count;
					var item = sync1.find('.owl-dot.active').index() + 1;

					$('.slider-primary').find('.slider-meta .all').text('0' + items);
					$('.slider-primary').find('.slider-meta .index').text('0' + item);
					$('.slider-primary').find('.slider-loader').fadeOut(300);
					$('.slider-primary').find('.owl-item').fadeIn(300);
					$('.slider-primary').find('.slider-outer').addClass('loaded');
				}
			});

			sync1.on('translate.owl.carousel', function(event) {
				var item = sync1.find('.owl-dot.active').index() + 1;
				sync2.find('.owl-item').removeClass('clicked');
				sync2.find('.owl-item').eq(item - 1).addClass('clicked');
				sync2.trigger('to.owl.carousel', [item - 1, duration, true]);
				sync1.closest('.slider-primary').find('.slider-meta .index').text('0' + item);
			});

			sync2
				.owlCarousel({
					loop: false,
					margin:15,
					nav : false,
					mouseDrag: false,
					items: 5,
					responsive:{
						0:{
							items:2,
							mouseDrag: true
						},
						768:{
							items:5,
							mouseDrag: false
						}
					}
				})
				.on('click', '.owl-item', function() {
					var i = $(this).index();

					$('.slider-primary .owl-item').removeClass('clicked');

					$(this).addClass('clicked');
					sync2.trigger('to.owl.carousel', [i, duration, true]);
					sync1.trigger('to.owl.carousel', [i, duration, true]);
				});

			$('.slider-primary .slider-nav .owl-item:first-child').addClass('clicked');
		};
		//sliderMain();

		$('.slider-primary .slider-nav a').on('click', function(event) {
			event.preventDefault();
		});

		// Datepicker
		function datepick() {
			if ( $win.width() < 768 ) {
				$('.field-date').prop({ type:'date' });
				$('.field-date').datepicker('destroy');

				$('.field-date').on('click', function() {
					$(this).removeClass('field-date');
				});
			} else {
				$('.field-date').prop({ type:'text' });
				$('.field-date').datepicker();
			}
		};

		var sidebars = $('.section-articles .section-aside');
		sidebars.each(function(i) {
		    var sidebar = $(sidebars[i]);

		    sidebar.scrollToFixed({
		        marginTop: $('.bar').outerHeight(true) + 10,
		        limit: function() {
		            var limit = 0;

		            limit = sidebar.closest('.section-articles').offset().top + sidebar.closest('.section-articles').outerHeight() - sidebar.outerHeight();

		            return limit;
		        },
		        preAbsolute: function() {
		        	sidebar.addClass('abs');
		        },
		        preFixed: function() {
		        	sidebar.removeClass('abs');
		        },
		        zIndex: 999
		    });
		});

		$win
			.on('resize', function() {
				// Refresh 3dots position
				$('.post-body').each(function() {
					$(this).trigger("update.dot");
				});

				$('.post-title').each(function() {
					$(this).trigger("update.dot");
				});

				removeBorderOfLastEl();
				progressText();
			})
			.on('load', function() {
				//sliderMain();

				verticalScroll();
				horizontalScroll();
				addDots();

				$(".scrollable").mCustomScrollbar({
					scrollbarPosition: 'outside'
				});

				// Show popup on load
				if( $('#popup-load').length ) {
					setTimeout(function() {
						$.magnificPopup.open({
							type: 'inline',
							items: {
								src: '#popup-load'
							},
							removalDelay: 300,
							mainClass: 'mfp-fade',
							showCloseBtn: false,
							fixedBgPos: true,
							fixedContentPos: true,
							callbacks: {
								beforeOpen: function() { $('html').addClass('mfp-helper'); },
								close: function() { $('html').removeClass('mfp-helper'); }
							}
						});
					}, 2000);
				};
			})
			.on('scroll', function () {
				// Nav fixed to top on scroll
				if ( $win.scrollTop() > 255 ) {
					$('.bar').addClass('fixed');
				} else {
					$('.bar').removeClass('fixed');
				};

				var winST = $win.scrollTop();
				if( $win.width() > 767 && $('.animations').length ) {
					animate(winST);
				};
			})
			.on('load resize', function() {
				if( $win.width() < 768 ) {
					$('.sticky-sidebar').trigger("sticky_kit:detach");
				} else {
					$('.sticky-sidebar').stick_in_parent({
						offset_top: 70,
						inner_scrolling: true,
						recalc_every: 10
					});
				}

				stickyFooter();
				datepick();
			});


		// Text Sizes
		var timesEnlarged = 0;
		var timesReduced  = 0;

		$('.link-text-large').on('click', function(event){
			event.preventDefault();

			if ( timesEnlarged > 0 ) {
				return;
			}

			timesEnlarged++;
			timesReduced--

			updateArticleFontSize( 2, true );

		});

		$('.link-text-small').on('click', function(event){
			event.preventDefault();

			if ( timesReduced > 0 ) {
				return;
			}

			timesEnlarged--;
			timesReduced++;

			updateArticleFontSize( 2, false );
		});

		// SVG Map Widget
		$('.svg-map-anchor')
			.on('mouseenter', function() {
				$('.svg-map-anchor').removeClass('active');
				$(this).addClass('active');

				var $target = $($(this).data('target'));

				$('.jad-nav-country a').text( $target.data('name') );

				// $target
				// 	.data('original-fill', $target.css('fill') )
				// 	.css('fill', '#ffff00');

				$('.nav-map').addClass('paused');
			})
			.on('mouseleave', function(){
				$('.svg-map-anchor').removeClass('active');
				$(this).addClass('active');

				$('.nav-map').removeClass('paused');
			});

		// Map Autoplay

		slideAutoplay();

		function slideAutoplay() {
			setTimeout(function() {
				var activeNav = $('.svg-map-anchor.active');
				var $target = $(activeNav.data('target'));

				$('.jad-nav-country a').text( $target.data('name') );
				$('.jad-nav-country a').attr( 'href', activeNav.data('href') );

				// $target
				// 	.data('original-fill', $target.css('fill') )
				// 	.css('fill', '#ffff00');

				if( !$('.nav-map').hasClass('paused') ) {
					activeNav.removeClass('active').next().addClass('active');

					// $target
					// 	.css('fill', $target.data('original-fill'));

					if( activeNav.is(':last-child') ) {
						$('.svg-map-anchor').removeClass('active');
						$('.svg-map-anchor').eq(0).addClass('active');
					}
				}

				slideAutoplay();
			}, $jadNavAutoplaySpeed);
		};

		// Tags
		$('#tag-canvas').tagcanvas({
			textColour   : '#fff',
			outlineColour: 'transparent',
			bgColour     : '#3c88bc',
			bgRadius     : 50,
			reverse      : true,
			depth        : 0.8,
			maxSpeed     : 0.05,
			textFont     : 'Arial'

		},'tags');

		// Round Slider

		var $profileSlider = $('.slider-round').owlCarousel({
			loop     : false,
			circular : false,
			items    : 1,
			nav      : true,
			mouseDrag: false,
			navText  : [
				'<i class="fa fa-arrow-circle-left" aria-hidden="true"></i>',
				'<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>'
			],
			animateOut: 'fadeOut',
			animateIn : 'fadeIn',
			dots: true,
			onTranslate: function(data) {
				var index = data.item.index;

				$('.corner-item.visible:eq(' + index + ')')
					.addClass('active')
					.siblings()
						.removeClass('active');
			},
			onInitialized: function(data) {
				var count = data.item.count;
				var showItems = [];
				if ( count > 6 || count % 2 !== 0 ) {
					$('.widget-profile-slider .owl-dots').hide();
				} else {
					switch ( count ) {
						case 2:
							showItems.push('.corner-left-3');
							showItems.push('.corner-right-3');
							break;

						case 4:
							showItems.push('.corner-left-2');
							showItems.push('.corner-left-3');
							showItems.push('.corner-right-2');
							showItems.push('.corner-right-3');
							break;

						case 6:
							showItems.push('.corner-left-1');
							showItems.push('.corner-left-2');
							showItems.push('.corner-left-3');
							showItems.push('.corner-right-1');
							showItems.push('.corner-right-2');
							showItems.push('.corner-right-3');
							break
					}
				}

				var length = showItems.length;

				for ( var i = 0; i < length; i++ ) {
					var $item = $(showItems[i]);

					$item
						.addClass('visible')
						.show();

					if ( i === 0 ) {
						$item.addClass('active');
					}
				}

			}
		});

		$('.corner-item.visible').on('click', function() {
			var index = $(this).index();
			$profileSlider.trigger('to.owl.carousel', [index]);

		})
	});

	function getElementFontSize( $el ) {
		return parseInt( $el.css('font-size').replace('px', ''), 10 );
	};

	function updateArticleFontSize( scale, increase ) {
		var $articleTitle        = $('.article-details .article-head h1');
		var $articleBody         = $('.article-details .article-body');
		var $articleQuote        = $('.quote-primary blockquote');
		var articleTitleBaseSize = getElementFontSize($articleTitle);
		var articleBodyBaseSize  = getElementFontSize($articleBody);
		var articleQuoteSize     = getElementFontSize($articleQuote);

		scale = parseInt( scale, 10 );

		if ( increase ) {
			articleTitleBaseSize += scale;
			articleBodyBaseSize  += scale;
			articleQuoteSize     += scale;
		} else {
			articleTitleBaseSize -= scale;
			articleBodyBaseSize  -= scale;
			articleQuoteSize     -= scale;
		}

		$articleTitle.css('font-size', articleTitleBaseSize);
		$articleBody.css('font-size', articleBodyBaseSize);
		$articleQuote.css('font-size', articleQuoteSize);

	};

	function animatePopulationSVG(index) {
		var $path = $('.slider-population .slide:eq(' + index + ') .progress-circle');

		$('.slider-population .slide .progress-circle').attr('stroke-dasharray', '0 729');

		$path.attr('stroke-dasharray', $path.data('to') + ' 729');
	}

	// Added by Nader
	// function sticky_sidebar_binding(){
	// 	$win.on('load resize', function() {
	// 		if( $win.width() < 768 ) {
	// 			$('.sticky-sidebar').trigger("sticky_kit:detach");
	// 		} else {
	// 			$('.sticky-sidebar').stick_in_parent({
	// 				offset_top: 70,
	// 				inner_scrolling: true,
	// 				recalc_every: 10
	// 			});
	// 		}
	
	// 		stickyFooter();
	// 		datepick();
	// 	});
	// }

})(jQuery, window, document);









function openSubMenu() {
    if ($('.subMenu').hasClass('open')) {
        closeSubMenu();
    } else {
        $('.subMenu').addClass('open');
        $('.otherLink').addClass('selected');
    }
}


function closeSubMenu() {
    $('.subMenu').removeClass('open');
    $('.otherLink').removeClass('selected');
}






module.exports.myFunctions = {

	sticky_sidebar_binding: function(){
		//sticky_sidebar_binding();
		tabsInit();
		scrlLck();
	},
	nav_bindings: function(){
		//console.log('..');
		nav_overlay_on_hover();
		add_has_dropdown_class_();
	},
	load_home_main_slider:function(){
		sliderMain();
	}
};