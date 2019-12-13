(function ($, window, document, undefined) {
    'use strict';

    /* GLOBAL VARIABLES */
    /* PRELOADER */
    /* MOBILE MENU */
    /* CUSTOM SCROLLBAR INITIALIZE */
    /* ADD IMAGE ON BACKGROUND */
    /* ADD WRAPPER TO ELEMENTS */
    /* SIDEBAR BUTTON */
    /* IS SIDEBAR EMPTY */
    /* COUNTER */
    /* SKILLS */
    /* ISOTOPE */
    /* AUDIO ON LINK CLICK */
    /* SET TRUE 100VH HEIGHT ON ANY DEVICES */
    /* AJAX PAGE FLIP ANIMATION */
    /* RE-INIT FUNCTIONS ON AJAX */
    /* AJAX LOAD POST */
    /* ONE PAGE STYLE CHECKER */
    /* INITIALIZE FUNCTIONS ON WINDOW LOAD */
    /* INITIALIZE FUNCTIONS ON WINDOW RESIZE */


    /* GLOBAL VARIABLES */
    //object for saving loaded posts from AJAX
    let savedPostLoadedAjax = {};
    let preloaderIdentification = $('.preloader-wrap');
    let pageWrapIdentification = $('.site-content__page-wrap');
    let sidebarIdentification = $('.site-content__sidebar');
    let navBarIdentification = $('.left-menu__menu-list .menu');
    let parentOffset = pageWrapIdentification.offset().top;
    let parentHeight = pageWrapIdentification.outerHeight();

    /* PRELOADER */
    const preloaderWhite = () => {
        if (preloaderIdentification.length) {
            setTimeout(function () {
                preloaderIdentification.fadeOut(300);
            }, 700);
        }
    };

    /* MOBILE MENU */
    const mobileMenu = () => {
        if ( window.outerWidth <= 991 && $('.unit').length ) {
            if (!$('.menu-item-has-children i').length) {
                $('.site-content__mobile-menu .menu-item-has-children').append('<i class="fa fa-angle-down js-btn-mobile"></i>');
            }

            $('.js-btn-mobile').on('click', function () {
                const animationDuration = 350;

                if ($(this).hasClass('animation')) {
                    return;
                }

                $(this)
                    .addClass('animation')
                    .prev('.sub-menu').slideToggle(animationDuration)
                    .parent().toggleClass('is-opened')
                    .siblings().removeClass('is-opened')
                    .find('.sub-menu').slideUp(animationDuration);

                setTimeout(() => {
                    $('.js-btn-mobile').removeClass('animation');
                }, animationDuration);
            });
        } else {
            $('.js-btn-mobile').remove();
        }
    };

    /* CUSTOM SCROLLBAR INITIALIZE */
    const customScrollBar = () => {
        if ( !$('.unit').length ){
            sidebarIdentification.mCustomScrollbar();
            navBarIdentification.mCustomScrollbar();
            pageWrapIdentification.mCustomScrollbar({
                callbacks: {
                    onInit: function() {
                        counter(parentOffset, parentHeight);
                        skills(parentOffset, parentHeight);
                        masonry();
                    },
                    whileScrolling : function() {
                        counter(parentOffset, parentHeight);
                        skills(parentOffset, parentHeight);
                    }
                }
            });
        }
    };

    /* ADD IMAGE ON BACKGROUND */
    const addImageToBackground = (img_sel, parent_sel) => {
        if (!img_sel) {

            return false;
        }
        let $parent, $imgDataHidden, _this;
        $(img_sel).each(function () {
            _this = $(this);
            $imgDataHidden = _this.data('s-hidden');
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')').addClass('s-back-switch');
            if ($imgDataHidden) {
                _this.css('visibility', 'hidden');
                _this.show();
            }
            else {
                _this.hide();
            }
        });
    };

    /* ADD WRAPPER TO ELEMENTS */
    const addWrapperToElements = () => {
        if($('.widget_search form input[type="submit"]').length){
            $('.widget_search form input[type="submit"]').each(function () {
                $('.widget_search form ').wrap('<span class="search-wrap"></span>');
            })
        }

        if($('.site-content__sidebar select, .wp-block-archives select, .wp-block-categories select').length){
            $('.site-content__sidebar select, .wp-block-archives select, .wp-block-categories select').each(function () {
                $(this).wrap('<span class="select-wrap"></span>');
            })
        }
    };

    /* SIDEBAR BUTTON */
    const openAndCloseSidebar = () => {
        $(".left-menu__sidebar-btn").on('click', function () {
            $(".site-content").addClass("sidebar-opened");
        });

        $(".overlay").on('click', function () {
            $(".site-content").removeClass("sidebar-opened");
        });
    };

    /* IS SIDEBAR EMPTY */
    const isEmptySidebar = () => {
        if ( !$('.sidebar-js').length && $('.unit').length ){
            $(".site-content__inner-left").hide();

            $(".site-content__inner-right").addClass("full_width")
        }
    };

    /* MOBILE MENU BUTTON */
    const openAndCloseMobMenu = () => {
        $(".site-content__mobile-menu--btn").on('click', function () {
            $(".site-content").addClass("menu-opened");
        });

        $(".site-content__inner-right").on('click', function () {
            $(".site-content").removeClass("menu-opened");
        })
    };

    /* COUNTER */
    const counter = (parentO, parentHeight) => {
        if ($('.js-counter').length) {
            $('.js-counter').not('.is-complete').each(function () {

                if (parentHeight > $(this).offset().top - 30) {
                    $(this).countTo().addClass('is-complete');
                }
            });
        }
    };

    /* SKILLS */
    const skills = (parentO, parentHeight) => {
        if ($('.niko-sc__skills-list').length) {
            $('.niko-sc__skills-item').not('.active').each(function () {
                if (parentHeight > $(this).offset().top - 30) {
                    $(this).addClass('active');
                    $(this).each(function () {
                        let procent = $(this).attr('data-value');
                        $(this).find('.active-line').css('width', procent + '%').css('opacity', '1');
                        $(this).find('.counter').countTo();
                    }); // end each
                }
            }); // end each
        }
    };

    /* ISOTOPE */
    const masonry = () => {
        $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item'
            }
        });

        $('.grid').imagesLoaded().progress(function () {
            $('.grid').isotope('layout');
        });

        // filter items on button click
        $('.niko-sc__portfolio-filter').on( 'click', 'li', function() {
            let filterValue = $(this).attr('data-filter');
            $('.grid').isotope({ filter: filterValue });
            $('.niko-sc__portfolio-filter li').removeClass('active');
            $(this).addClass('active');
        });
    };

    /* AUDIO ON LINK CLICK */
    const audioOnLinkHover = () => {
        if ( $('.audio_on_hover').length ) {

            let soundLink = $("#sound-link")[0];
            $("a").on('click', function () {
                soundLink.play();
            })
        }
    };

    /* SET TRUE 100VH HEIGHT ON ANY DEVICES */
    const setFullHeightToPage = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    /* AJAX PAGE FLIP ANIMATION */
    const ajaxPageFlipAnimation = () => {
        let menuIndent = $('.js-load-post').not('.current-menu-item');
        menuIndent.on('click', function() {
            $('.site-content__inner-right').addClass('animated');
            setTimeout(function () {
                $('.site-content__inner-right').removeClass('animated');
            },500);
        });
    };

    /* RE-INIT FUNCTIONS ON AJAX */
    const reInitFunctionsOnAjax = (data) => {
        if ( typeof data !== 'string' ) return false;

        // Re-init google map
        if ( data.indexOf( 'acf-map' ) !== -1 ) {
            $('.acf-map').each(function(){
                // create map
                new_map( $(this) );
            });
        }

        // Re-init masonry
        if ( data.indexOf( 'grid' ) !== -1 ) {
            masonry();
        }

        // Re-init counter
        if ( data.indexOf( 'js-counter' ) !== -1 ) {
            counter(parentOffset, parentHeight);
        }

        // Re-init skills
        if ( data.indexOf( 'niko-sc__skills-list' ) !== -1 ) {
            skills(parentOffset, parentHeight);
        }

        // Re-init audio
        if ( data.indexOf( 'audio_on_hover' ) !== -1 ) {
            audioOnLinkHover();
        }

        ajaxPageFlipAnimation();
    };

    /* AJAX LOAD POST */
    const ajaxLoadPost = (postID) => {
        let data = {
            'action': 'niko_ajax_load_post',
            'post_id' : postID,
        };

        if ( savedPostLoadedAjax.hasOwnProperty( postID ) === false ) {
            $.ajax({
                url: js_data.ajaxurl,                     // handler
                data : data,                        // data for handler file
                type: 'POST',                      // request type
                success: function( data ) {

                    savedPostLoadedAjax[ postID ] = data;

                    $('.preloader-page').fadeOut(600);
                    $('.site-content__page-wrap .mCSB_container').html( data );

                    reInitFunctionsOnAjax( data );

                },
                error: function( xhr, ajaxOptions, thrownError ) {
                    alert('Error. Please try again');
                    console.log( xhr );
                    console.log( ajaxOptions );
                    console.log( thrownError );
                }
            });
        } else {
            $('.ajax-page-preload').fadeOut();
            $('.site-content__page-wrap .mCSB_container').html( savedPostLoadedAjax[ postID ] );
            reInitFunctionsOnAjax( savedPostLoadedAjax[ postID ] );
        }
    };

    /* ONE PAGE STYLE CHECKER */
    const isOnePageStyleChecker = () => {
        $('.js-load-post').on('click', function() {
            let $this = $(this),
                postID = $this.find('> a').attr('data-page-id');

            if ( $this.hasClass('current-menu-item') ) return false;

            $('.site-content__page-wrap .mCSB_container').html( '<div class="preloader-page"></div>' );
            ajaxLoadPost( postID );
            $('.menu-item').removeClass('current-menu-item');
            $this.addClass('current-menu-item');
            return false;
        });
    };

    /* INITIALIZE FUNCTIONS ON WINDOW LOAD */
    $(window).on('load', function () {
        preloaderWhite();
        setFullHeightToPage();
        audioOnLinkHover();
        addImageToBackground('.s-img-switch');
        addWrapperToElements();
        customScrollBar();
        openAndCloseSidebar();
        openAndCloseMobMenu();
        isOnePageStyleChecker();
        ajaxPageFlipAnimation();
        mobileMenu();
        isEmptySidebar();
        if ( $('.unit').length ){
            masonry();
        }
    });

    /* INITIALIZE FUNCTIONS ON WINDOW RESIZE */
    $(window).on('resize', function () {
        setFullHeightToPage();
        if ( $('.unit').length ){
            masonry();
        }
    });

    function new_map($el) {

        // var
        var $markers = $el.find('.marker');
        var $style = jQuery('.acf-map').data("map-style");


        // vars
        var args = {
            zoom: 16,
            disableDefaultUI: true,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: $style
        }


        // create map
        var map = new google.maps.Map($el[0], args);


        // add a markers reference
        map.markers = [];


        // add markers
        $markers.each(function () {

            add_marker(jQuery(this), map);

        });


        // center map
        center_map(map);


        // return
        return map;

    }

    /*
    *  add_marker
    *
    *  This function will add a marker to the selected Google Map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	$marker (jQuery element)
    *  @param	map (Google Map object)
    *  @return	n/a
    */

    function add_marker($marker, map) {

        // var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

        // create marker
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });

        // add to array
        map.markers.push(marker);

        // if marker contains HTML, add it to an infoWindow
        if ($marker.html()) {
            // create info window
            var infowindow = new google.maps.InfoWindow({
                content: $marker.html()
            });

            // show info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function () {

                infowindow.open(map, marker);

            });
        }

    }

    /*
    *  center_map
    *
    *  This function will center the map, showing all markers attached to this map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	map (Google Map object)
    *  @return	n/a
    */

    function center_map(map) {

        // vars
        var bounds = new google.maps.LatLngBounds();

        // loop through all markers and create bounds
        jQuery.each(map.markers, function (i, marker) {

            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

            bounds.extend(latlng);

        });

        // only 1 marker?
        if (map.markers.length == 1) {
            // set center of map
            map.setCenter(bounds.getCenter());
            map.setZoom(16);
        }
        else {
            // fit to bounds
            map.fitBounds(bounds);
        }

    }


    $(document).ready(function(){
        $('.acf-map').each(function(){
            // create map
            new_map( $(this) );
        });
    });

})(jQuery, window, document);