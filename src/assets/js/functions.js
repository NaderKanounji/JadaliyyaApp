var tabsInit;
var scrlLck;
var sliderMain;
var add_has_dropdown_class_;
var nav_overlay_on_hover;
var toggle_share_function;
var socials_tertiary_function;
var widget_share_function;
var sticky_sidebar_function;
var link_text_large_function;
var print_click;
var slide_feed_function;
var stickyFooter;
var moreInterests;
var roundups_carousel_init;
var announcements_carousel_init;
var no_sidebar_class;
var fullsize_bg;
var svg_map_init;
var profiles_carousel_init;
var tags_widget_init;
var expand_interest_click;
var interestsToggle;
var dropdown_event;


var $jadNavAutoplaySpeed = 5000;

;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var winH = $win.height();

	$doc.ready(function() {


		// Close nav on ESC key press
		$doc.keyup(function(e) {
			if (e.keyCode == 27) { // escape key maps to keycode `27`
				$('.nav-sidebar, .wrapper, body').removeClass('active');

				closeInterested();
				closeSearch();
			}
		});

		dropdown_event = function(){
			$('.nav-access .has-dropdown > a').on('click', function(event) {
				event.preventDefault();
	
				$(this).toggleClass('active');
				$(this).next('.dropdown').toggleClass('active');
			});
	
		}
		dropdown_event();

		

		announcements_carousel_init = function(){
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
		}
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

		roundups_carousel_init = function(){
			// Slider Roundups
			$('.slider-roundups .owl-carousel').owlCarousel({
				loop: false,
				items: 3,
				margin:13,
				nav:false,
				autoWidth:true,
				mouseDrag:false
			});
			sliderWheelScroll($('.slider-roundups .owl-carousel'));
		}

		// Slider feed
		slide_feed_function = function(){
			$('.slider-feed .owl-carousel').owlCarousel({
				loop: false,
				items: 3,
				margin:28,
				nav:false,
				autoWidth:true,
				mouseDrag:false
			});
		}

		$('.slider-interview .owl-carousel').owlCarousel({
			loop: false,
			items: 3,
			margin:18,
			nav:false,
			autoWidth:true,
			mouseDrag:false
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

		expand_interest_click();

		

		

		moreInterests = function () {
			// More Interests
			$('.link-more').on('click', function(event) {
				event.preventDefault();

				$(this).closest('.list-interests').addClass('visible');
			});
			// All Interests
			$('.link-all').on('click', function(event) {
				event.preventDefault();
	
				$('.section-interested').addClass('fixed');
				$('.wrapper').addClass('active');
			});
	
		};
		//moreInterests();


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

		no_sidebar_class();
		// Check if section has sidebar
		
		

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

		
		removeBorderOfLastEl();

		
		horizontalScroll();

		
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
						//formSubmit();
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


		$('.tabs-secondary .tabs-nav a').on('click', function(event) {
			event.preventDefault();

			setTimeout(function() {
				addDots();
			}, 1);
		});

		// Turn list to select for mobile
		// var $list   = $('.tabs-secondary .tabs-nav ul'),
		// 	$select = $('<select class="" />');

		// $list.children('li').each(function(index) {
		// 	var $link = $(this).find('a').attr('href');

		// 	$select.append($('<option />').attr('value', $link).html($(this).html()));
		// });

		//$('.tabs-secondary .tabs-nav').append($select);

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
			//stickyFooter();
		});

		// Show Share options
		toggle_share_function = function(){
			$('.toggle-share').on('click', function(event) {
				event.preventDefault();
	
				if( $win.width() > 767 ) {
					$(this).next('ul').slideToggle();
				} else {
					$(this).next('ul').toggleClass('active');
				};
			});
		}

		socials_tertiary_function = function(){
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
		}

		// Clone for mobile
		$('.section-next').clone().appendTo( $('.section-details').eq(0).find('.content') ).addClass('cloned');

		// Wrapper bottom spacing for fixed socials
		widget_share_function = function(){
			if( $('.widget-share').length ) {
				$('.wrapper').addClass('shareable');
			};
		}
		widget_share_function();
		

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

		

		// Link avatar
		function changeAvatar() {
			$('.link-avatar').on('click', function(event) {
				event.preventDefault();

				$(this).toggleClass('active');
			});
		};
		changeAvatar();

		
		//formSubmit();

		// Popup dropdown
		function popupDropdown() {
			$('.link-folders').not('.no-binding').on('click', function(event) {
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

				var myIcon = new google.maps.MarkerImage("assets/images/ico-pin.png", null, null, null, new google.maps.Size(43,43));

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map: map,
					icon: myIcon
				});
			}

			google.maps.event.addDomListener(window, 'load', initialize);
		};

		
		

		// if ( $('.gmap3').length ) {
		// 	googlemap('map', $('.list-locations'), 11);
		// };

		accordion_init();

		

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

		//stickyFooter();

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
		print_click = function(){
			$('.link-print').on('click', function(event) {
				event.preventDefault();
	
				window.print();
			});
		}

		//sliderMain();

		

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
			.on('resize', function() {
				if( $win.width() < 768 ) {
					$('.sticky-sidebar').trigger("sticky_kit:detach");
				} else {
					$('.sticky-sidebar').stick_in_parent({
						offset_top: 70,
						inner_scrolling: true,
						recalc_every: 10
					});
				}
				//stickyFooter();
				datepick();
			});
			sticky_sidebar_function = function(){

				if( $win.width() < 768 ) {
					$('.sticky-sidebar').trigger("sticky_kit:detach");
				} else {
					$('.sticky-sidebar').stick_in_parent({
						offset_top: 70,
						inner_scrolling: true,
						recalc_every: 10
					});
				}
			}


		// Text Sizes
		var timesEnlarged = 0;
		var timesReduced  = 0;

		link_text_large_function = function(){
			$('.link-text-large').on('click', function(event){
				event.preventDefault();

				if ( timesEnlarged > 0 ) {
					return;
				}

				timesEnlarged++;
				timesReduced--

				updateArticleFontSize( 2, true );

			});
		}

		link_text_small_function = function(){
			$('.link-text-small').on('click', function(event){
				event.preventDefault();

				if ( timesReduced > 0 ) {
					return;
				}

				timesEnlarged--;
				timesReduced++;

				updateArticleFontSize( 2, false );
			});
		}


		

	});
	profiles_carousel_init = function(){
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
	};
	function getElementFontSize( $el ) {
		return parseInt( $el.css('font-size').replace('px', ''), 10 );
	};

	function updateArticleFontSize( scale, increase ) {
		var $articleTitle        = $('.article-details .article-head h1');
		var $articleBody         = $('.article-details .article-body');
		var $articleQuote        = $('.quote-primary blockquote');
		var articleTitleBaseSize = $articleTitle.length ? getElementFontSize($articleTitle) : 0;
		var articleBodyBaseSize  = $articleBody.length ? getElementFontSize($articleBody) : 0;
		var articleQuoteSize     = $articleQuote.length ? getElementFontSize($articleQuote) : 0;

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
		if($articleTitle.length){
			$articleTitle.css('font-size', articleTitleBaseSize);
		}
		if($articleBody.length){
			$articleBody.css('font-size', articleBodyBaseSize);
		}
		if($articleQuote.length){
			$articleQuote.css('font-size', articleQuoteSize);
		}

	};

	
	 
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

	// $(window).scroll(function() {
    //     var e = $(document).scrollTop() + $(window).height();
    //     $("body").hasClass("open-left-nav") || $("body").hasClass("open-right-search") || fix_header(FIX_HEADER_CONS),
    //     show_hide_bar(),
    //     fix_internal_header(),
    //     $(".video-chat").length && handle_video_chat_box(),
    //     !loadingProperties && $(".properties-results-section").hasClass("open") && $(".properties-results-section").offset().top + $(".properties-results-section").height() - 50 < e && load_more_properties(localisation)
	// })
	
	// function isVisible(el){
	// 	windowHeight = $(window).height();
	// 	distanceFromTop = $(document).scrollTop();
	// 	minVisibleArea = distanceFromTop;
	// 	maxVisibleArea = distanceFromTop + windowHeight;
		
	// 	elementTopPosition = $(el).offset().top;
	// 	elementBottomPosition = elementTopPosition + el.height();
		
	// 	if((elementTopPosition > minVisibleArea && elementTopPosition < maxVisibleArea) || (elementBottomPosition > minVisibleArea && elementBottomPosition < maxVisibleArea) || (elementTopPosition < minVisibleArea && elementBottomPosition > maxVisibleArea)){
	// 		return true;
	// 	}
	// 	return false;
	// }
	// $win.scroll(function(){
    //     var e = $(document).scrollTop() + $(window).height();
	// });

})(jQuery, window, document);

// $('.link-popup').magnificPopup({
// 	type: 'ajax',
// 	removalDelay: 300,
// 	mainClass: 'mfp-fade',
// 	showCloseBtn:false,
// 	fixedContentPos: true,
// 	callbacks: {
// 		ajaxContentAdded: function() {
// 			customSelects();
// 			closePopup();
// 			interestsToggle();
// 			moreInterests();
// 			tabsInit();
// 			openPopup();
// 			changeAvatar();
// 			formSubmit();
// 			popupDropdown();
// 			progressText();
// 			scrlLck();
// 			datepick();
// 		},
// 		beforeOpen: function() { $('html').addClass('mfp-helper'); },
// 		close: function() { $('html').removeClass('mfp-helper'); }
// 	}
// });
var get_selected_folders = function(){
	let str = '';
	$('input[name="foldercheck"]:checked').each(function(){
		str += ',' + $(this).attr('data-folder-id');
	});
	return str.substr(1);
}
var get_selected_articles = function(){
	let str = '';
	$('input[name="foldercheck"]').not(':checked').each(function(){
		let artStr = '';
		str += '-' + + $(this).attr('data-folder-id') + ':';
		$('input[name="articlecheck"][data-folder-id="' + $(this).attr('data-folder-id') + '"]:checked').each(function(){
			artStr += ',' + $(this).attr('data-article-id');
		});
		str += artStr.substr(1);
	});
	return str.substr(1);
}
var accordion_init = function(){
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
	$('input[name="foldercheck"]').change(function(){
		let folderId = $(this).attr('data-folder-id');
		if($(this).is(':checked')){
			$('input[name="articlecheck"][data-folder-id="' + folderId + '"]').prop('checked', true);
		}else{
			$('input[name="articlecheck"][data-folder-id="' + folderId + '"]').prop('checked', false);
		}
	});
	$('input[name="articlecheck"]').change(function(){
		let folderId = $(this).attr('data-folder-id');
		if($(this).is(':checked')){
			// if($('input[name="articlecheck"][data-folder-id="' + folderId + '"]').length == $('input[name="articlecheck"][data-folder-id="' + folderId + '"]:checked').length){
			// $('input[name="foldercheck"][data-folder-id="' + folderId + '"]').prop('checked', true);
			// }
		}else{
			$('input[name="foldercheck"][data-folder-id="' + folderId + '"]').prop('checked', false);
		}
	});
}
var link_share_binding = function(){
	// Share dropdown
	$('.link-share').on('click', function(event) {
		event.preventDefault();

		$(this).toggleClass('active');
		$(this).closest('.table-col').toggleClass('active');
		$(this).next('.dropdown').toggleClass('active');
	});
}
var verticalScroll = function() {
	$(".scrollable-vertical").mCustomScrollbar({
		axis:"y"
	});
};
var open_popupDropdown = function(){
	$('.dropdown-head').closest('.dropdown').addClass('active');

	verticalScroll();
	setTimeout(function(){
		$('.popup-tertiary .dropdown .dropdown-body ul li').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			$('.popup-tertiary .dropdown .dropdown-body ul .selected').removeClass('selected');
			$(this).addClass('selected');
		});
	},200);
	
}
var get_popup_dropdown_selected = function(){
	return $('.popup-tertiary .dropdown .dropdown-body ul .selected').attr('data-folder-id');
}
var close_popupDropdown = function(){
	$('.dropdown-head').closest('.dropdown').removeClass('active');
}

// Manual Message display
var display_form_message = function (id) {
	var $thankYou = $(id).parent().data('target');

	if( $thankYou !== null  && $thankYou !== undefined) {
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
};
// Form submit
var append_form_message = function (id) {
	$(id).submit(function(event) {
		var $thankYou = $(this).parent().data('target');

		if( $thankYou !== null  && $thankYou !== undefined) {
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
var psy_popup = function(){
	$('[data-psy-pop]').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$.magnificPopup.open({
			items: {
				src: '#popup-' + $(this).attr('data-psy-pop'),
				type: 'inline',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				showCloseBtn:false,
				fixedContentPos: true
			},
			callbacks:{
				open: function() {
					psy_popup();
				},
				beforeOpen: function() { $('html').addClass('mfp-helper'); },
				close: function() { $('html').removeClass('mfp-helper'); }
			}
		});	
	});
	
	
}
var psy_open_popup = function(id){
	// Show popup on load
	if( $('#' + id).length ) {
		$.magnificPopup.close();
		$.magnificPopup.open({
			items: {
				src: '#' + id,
				type: 'inline',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				showCloseBtn:false,
				fixedContentPos: true
			},
			callbacks:{
				open: function() {
					psy_popup();
				},
				beforeOpen: function() { closePopup();$('html').addClass('mfp-helper'); },
				close: function() { $('html').removeClass('mfp-helper'); }
			}
		});	
	};
}

tags_widget_init = function(){
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
};

// Slider Custom Scroll
 var horizontalScroll = function() {
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
// Close Popup
function closePopup() {
	//console.log('closePopup');
	$('.link-close-popup, .psy-close-popup').on('click', function(event) {
		event.preventDefault();

		$.magnificPopup.close();
	});
};
var close_popup = function(){
	$.magnificPopup.close();

}
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
var load_jadNavigation_map = function(){
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

			var myIcon = new google.maps.MarkerImage("assets/images/ico-pin-secondary.png", null, null, null, new google.maps.Size(31,43));

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, lng),
				map: map,
				icon: myIcon
			});
		}

		google.maps.event.addDomListener(window, 'load', initialize);
	};

}
var googlemap = function($element, $locations, zoomLevel) {
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

		var myIcon = new google.maps.MarkerImage("assets/images/ico-pin2.png", null, null, null, new google.maps.Size(44,44));

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
var slider_population = function(){
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
}
function animatePopulationSVG(index) {
	var $path = $('.slider-population .slide:eq(' + index + ') .progress-circle');

	$('.slider-population .slide .progress-circle').attr('stroke-dasharray', '0 729');

	$path.attr('stroke-dasharray', $path.data('to') + ' 729');
}

// Last row posts remove border
var removeBorderOfLastEl = function() {
	$('.tabs-secondary .tab').each(function() {
		var $tab = $(this);

		if( $(this).find('.section-articles').length ) {
			var $section = $(this).find('.section-articles');
			if($section.find('.section-content .post').length){
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
			}
			
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
expand_interest_click = function(){
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
}
var closeInterested = function() {
	$('.link-interests').removeClass('hidden');
	$('.section-interested .section-body').slideUp();
	$('.wrapper, .section-interested').removeClass('active');
	$('.list-interests').removeClass('visible');
	$('.section-interested').removeClass('fixed');
	$('.link-collapse').addClass('hidden');
};
 interestsToggle = function() {
	$('.list-interests a:not(.link-more):not(.link-all)').on('click', function(event) {
		event.preventDefault();

		$(this).toggleClass('clicked');

		if( $('.list-interests .clicked').length ) {
			$('.tabs-secondary .tab-item-interests').addClass('visible')
		} else {
			$('.tabs-secondary .tab-item-interests').removeClass('visible')
		}
	});
	if( $('.list-interests .clicked').length ) {
		$('.tabs-secondary .tab-item-interests').addClass('visible')
	} else {
		$('.tabs-secondary .tab-item-interests').removeClass('visible')
	}
};

// Map Autoplay

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
function closeSearch() {
	$('.search').removeClass('active');
	$('.link-search-close').removeClass('active');
};
// SVG Map Widget
svg_map_init = function(){
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
	slideAutoplay();
}

no_sidebar_class = function(){
	$('.section-articles').each(function() {
		if( !$(this).find('.section-aside').length ) {
			$(this).addClass('no-sidebar');
		};
	});
}
fullsize_bg = function(){
	// Get image src and puts in to background
	$('.fullsize-bg').each(function() {
		var $img = $(this);

		$img.addClass('hidden');
		$(this).parent().addClass('container-fullsize').css('background-image', 'url('+ $img.attr('src') +')');
	});
}

sliderMain = function() {
	// // Slider Primary

	var sync1 = $('.slider-primary .slides.owl-carousel'),
		sync2 = $('.slider-primary .slider-nav ul.owl-carousel'),
		duration = 300;

	// Start Carousel
	if(sync1.length){
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
	}

	if(sync2.length){
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
	}
	$('.slider-primary .slider-nav .owl-item:first-child').addClass('clicked');
	
	$('.slider-primary .slider-nav a').on('click', function(event) {
		event.preventDefault();
	});
};

// Show filter
function link_filter_binding(){
	$('.link-filter').on('click', function(event) {
		event.preventDefault();
	
		$(this).toggleClass('active');
		$('.filter').toggleClass('active');
	
		datepick();
	});
}


function scoll_to_comments_binding(){
	$('.list-actions .comment-action').click(function(){
		let commentsPosition = parseInt($('.article-details .article-comments').offset().top) - 100;
		$("html, body").animate({ scrollTop: commentsPosition }, 1000);
	});
}

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

// Sticky Footer
stickyFooter = function() {
	//console.log($('#main-wrapper').length);
	setTimeout(function(){
		if( $('.socials-tertiary').length ) {
			if( $(window).width() < 768 ) {
				$('#main-wrapper').css('padding-bottom', $('.footer').outerHeight(true) + 58);
				$('.footer').css('bottom', '58px');
			} else {
				$('#main-wrapper').css('padding-bottom', $('.footer').outerHeight(true));
				$('.footer').css('bottom', '0');
			}
		} else {
			$('#main-wrapper').css('padding-bottom', $('.footer').outerHeight(true));
		}
	},1000);
}






module.exports.myFunctions = {
	reset_page_state:function(){
		$('html,body').animate({ scrollTop: 0 }, 0);
		$('.nav-sidebar, .wrapper, body').removeClass('active');
		closeSubMenu();
		$.magnificPopup.close();
		closeSearch();
		verticalScroll();
	},
	load_all_pages:function(){
		setTimeout(function(){
				psy_popup();
			    closePopup();
				stickyFooter();
				verticalScroll();
				$(window).on('resize', function() {
					stickyFooter();
				});
		},200);
	},
	load_home_page:function(){
		setTimeout(function(){
			nav_overlay_on_hover();
			add_has_dropdown_class_();
			moreInterests();
			interestsToggle();
			announcements_carousel_init();
			expand_interest_click();
			//content formatting
			no_sidebar_class();
			fullsize_bg();
			removeBorderOfLastEl();
		},200);
	},
	load_details_page:function(){
		setTimeout(function(){
			psy_popup();
			nav_overlay_on_hover();
			add_has_dropdown_class_();
			sticky_sidebar_function();
			tabsInit();
			scrlLck();
			toggle_share_function();
			socials_tertiary_function();
			widget_share_function();
			link_text_large_function();
			link_text_small_function();
			scoll_to_comments_binding();
			print_click();
			//content formatting
			no_sidebar_class();
			fullsize_bg();
		},200);
	},
	load_init_category_page:function(){
		setTimeout(function(){
			tabsInit();
			link_filter_binding();	
			//content formatting
			no_sidebar_class();
			fullsize_bg();
		},200);
	},
	load_init_jadNavigation_page:function(){
		setTimeout(function(){
			tabsInit();
			link_filter_binding();	
			load_jadNavigation_map();
			//content formatting
			no_sidebar_class();
			fullsize_bg();
		},200);
	},
	load_category_hot_section:function(){
		setTimeout(function(){
			slide_feed_function();
			tabsInit();
		},200);
	},
	load_home_roundups_section:function(){
		setTimeout(function(){
			tabsInit();
			roundups_carousel_init();
			horizontalScroll();
		},200);
	},
	sticky_sidebar_binding: function(){
		sticky_sidebar_function();
		tabsInit();
		scrlLck();
	},
	nav_bindings: function(){
		//console.log('..');
		nav_overlay_on_hover();
		add_has_dropdown_class_();
	},
	country_sidebar:function(){
		setTimeout(function(){
			slider_population();
			tabsInit();
			if ( $('.gmap3').length ) {
				googlemap('map', $('.list-locations'), 11);
			};
		},200);
	},
	load_jadNavigation_map:function(){
		setTimeout(function(){
			load_jadNavigation_map();
		},200);
	},
	openSubMenu:function(){
		openSubMenu();	
	},
	load_slideshow:function(){
		setTimeout(function(){
		   sliderMain();
	    },200);
	},
	homeSidebar:function(){
		setTimeout(function(){
			//svg_map_init();
			profiles_carousel_init();
		},200);
	},
	
	tags_widget_init:function(){
		setTimeout(function(){
			tags_widget_init();
		},200);
	},
	svg_map_init:function(){
		setTimeout(function(){
			svg_map_init();
		},200);
	},
	load_fb_comments:function(){
		setTimeout(function(){
			FB.XFBML.parse(document.getElementById("fb-comments-container"));
		},1000);
	},
	toggle_share_function:function(){
		toggle_share_function();
	},
	open_popupDropdown:function(){
		open_popupDropdown();
	},
	get_popup_dropdown_selected:function(){
		return get_popup_dropdown_selected();
	},
	close_popupDropdown:function(){
		toggle_share_function();
	},
	socials_tertiary_function:function(){
		socials_tertiary_function();
	},
	widget_share_function:function(){
		widget_share_function();
	},
	link_text_large_function:function(){
		link_text_large_function();
	},
	link_text_small_function:function(){
		link_text_small_function();
	},
	scoll_to_comments_binding:function(){
		scoll_to_comments_binding();
	},
	back_to_top:function(speed){
		speed = speed || $(document).height() / 7;
		$('html,body').animate({ scrollTop: 0 }, speed);
	},
	is_dom_in_view:function(id, offset){
		let el = $(id);
		if(el.length){
			windowHeight = $(window).height();
			distanceFromTop = $(document).scrollTop();
			minVisibleArea = distanceFromTop - offset;
			maxVisibleArea = distanceFromTop + windowHeight + offset;
			
			elementTopPosition = el.offset().top;
			elementBottomPosition = elementTopPosition + el.height();
			
			if((elementTopPosition > minVisibleArea && elementTopPosition < maxVisibleArea) || (elementBottomPosition > minVisibleArea && elementBottomPosition < maxVisibleArea) || (elementTopPosition < minVisibleArea && elementBottomPosition > maxVisibleArea)){
				return true;
			}
		}
		
		return false;
	},	
	new_content_formatting:function(){
		setTimeout(function(){
			no_sidebar_class();
			fullsize_bg();
			removeBorderOfLastEl();
		},200);
	},
	closeInterested:function(){
		closeInterested();
	},
	psy_open_popup:function(id){
		psy_open_popup(id);
	},
	dropdown_event:function(){
		dropdown_event();
	},
	psy_popup:function(){
		setTimeout(function(){
			psy_popup();
		},200);
	},
	close_popup:function(){
		close_popup();
	},
	more_stories_widget:function(){
		setTimeout(function() {
			tabsInit();	
		}, 100);
	},
	accordion_init:function(){
		setTimeout(function() {
			accordion_init();	
			link_share_binding();
		}, 200);
	},
	get_selected_folders:function(){
		return get_selected_folders();
	},
	get_selected_articles:function(){
		return get_selected_articles();
	},
	////MY FUNCTIONS
	animate_to_element:function(id, offset, speed){
		var toPosition = $(id).offset().top + offset;
		$('html,body').animate({ scrollTop: toPosition }, speed);
	},
	//get_elements_attr()

	
};