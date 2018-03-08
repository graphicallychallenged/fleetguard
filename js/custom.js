(function($) {
    "use strict";

    var $window = $(window);
    var $document = $(document);
    var winWidthSm = 979;

    

    // ---------------------------------------------------------------------------------------------------------------------------->
    // Navigation Dropdown Function   ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->
    $(function() {
        //Checks if li has sub (ul) and adds class for toggle icon - just an UI
        $('.navigation-menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
        // Dropdown Arrow Added
        $('.navigation-menu > ul > li.menu-dropdown-icon').append('<div class="dropworn-arrow"></div>');
        //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu
        $('.navigation-menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
        //Mobile Menu Html loaded
        $(".navigation-menu > ul").before("<a href=\"#\" class=\"menu-mobile\">Menu</a>");

        var navMenuLink = $(".navigation-menu > ul > li");
        var navMobileBtn = $(".menu-mobile");

        //If width is more than 943px Dropdowns are displayed on hover
        navMenuLink.on('mouseenter mouseleave', function(e) {
            if ($window.width() > parseInt(winWidthSm)) {
                $(this).children(".js-nav-dropdown").stop(true, false).fadeToggle(150);
                $(this).children(".dropworn-arrow").stop(true, false).fadeToggle(150);
                e.preventDefault();
            }
        });

        //If width is less or equal to winWidthSmpx dropdowns are displayed on click
        navMenuLink.on('click', function() {
            if ($window.width() <= parseInt(winWidthSm)) {
                $(this).children(".js-nav-dropdown").fadeToggle(150);
                $(this).children(".dropworn-arrow").hide();
            }
        });

        //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story
        navMobileBtn.on('click', function(e) {
            $(".navigation-menu > ul").toggleClass('show-on-mobile');
            e.preventDefault();
        });

    });


    // ---------------------------------------------------------------------------------------------------------------------------->
    // Sticky Header Function  ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->
    $(function() {
        createSticky($("#header-sticky"));

        function createSticky(sticky) {
            if (typeof sticky !== "undefined") {
                var pos = sticky.offset().top,
                    win = $window;

                win.on("scroll", function() {
                    win.scrollTop() >= pos ? sticky.addClass("fixed") : sticky.removeClass("fixed");
                });
            }
        }
    });

    // "Sticky" Desktop Device Enable ---- small Device Disable
    $window.bind('DOMContentLoaded load resize', function() {
        var headerInnerHeight = $(".header").innerHeight(),
            winInnerWidth = $window.innerWidth();

        if (winInnerWidth <= parseInt(winWidthSm)) {
            $('#header-sticky').addClass('no-stick');
            $('.header').css("height", "auto");
        } else {
            $('#header-sticky').removeClass('no-stick');
            $('.header').css("height", headerInnerHeight);
        };
    });



    // ---------------------------------------------------------------------------------------------------------------------------->
    // Elements  ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->
    $(function() {

        // (1). Sidebar Menu Function (Cart Menu) =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        var $menuSidebar = $('.sidebar-right');
        var $menusidebarNav = $('#sidebar_toggle_btn');
        var $menuSidebarclose = $('#sidebar_close_icon');
        var $menuSidebarOverlay = $('.sidebar_overlay');
        var $menuSidebarOverlayActive = $('.sidebar_overlay_active');

        /*sidebar menu navigation icon toggle*/
        $menusidebarNav.on('click', function() {
            $(this).toggleClass('active');
            $menuSidebar.toggleClass('sidebar-open');
            $menuSidebarOverlay.toggleClass('sidebar_overlay_active');

        });

        /*sidebar menu close icon*/
        $menuSidebarclose.on('click', function() {
            $menusidebarNav.removeClass('active');
            $menuSidebar.removeClass('sidebar-open');
            $menuSidebarOverlay.removeClass('sidebar_overlay_active');
        });

        /*Overlay Active*/
        $document.on('click touchstart', '.sidebar_overlay_active', function() {
            $menusidebarNav.toggleClass('active');
            $menuSidebar.toggleClass('sidebar-open');
            $menuSidebarOverlay.toggleClass('sidebar_overlay_active');
        });



        // (2). Search Overlay Menu =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $(function() {
            var searchOverlayMenuBtn = $('#search-overlay-menu-btn'),
                searchMenuClose = $('.search-overlay-menu, .search-overlay-menu .search-overlay-close');

            searchOverlayMenuBtn.on('click', function(event) {
                $('.search-overlay-menu').addClass('open');
                $('.search-overlay-menu > form > input[type="search"]').focus();
            });
            searchMenuClose.on('click keyup', function(event) {
                if (event.target == this || event.target.className == 'search-overlay-close' || event.keyCode == 27) {
                    $(this).removeClass('open');
                }
            });
        });


        // (3). Tabs (Tabs With OwlCarousel) =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            $($(e.target).attr('href'))
                .find('.owl-carousel')
                .owlCarousel('invalidate', 'width')
                .owlCarousel('update')
        })


        // (4). Tooltip Function =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $('.js_tooltip').tipr();



        // (5) Backgrounds Image (Slider, Section, etc..) ===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        var pageSection = $('.slide-bg-image, .bg-image');
        pageSection.each(function(indx) {
            if ($(this).attr("data-background-img")) {
                $(this).css("background-image", "url(" + $(this).data("background-img") + ")");
            }
            if ($(this).attr("data-bg-position-x")) {
                $(this).css("background-position", $(this).data("bg-position-x"));
            }
        });



        // (6) Newsletter Popup =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        if ($window.width() > parseInt(winWidthSm)) {
            var nlpopup_expires = $("nlpopup").data("expires");
            var nlpopup_delay = $("nlpopup").data("delay") * 1500;

            var open_nlpopup = function() {
                var topoffset = $document.scrollTop(),
                    viewportHeight = $window.height(),
                    $popup = $('#nlpopup');
                var calculatedOffset = (topoffset + (Math.round(viewportHeight / 2))) - (Math.round($popup.outerHeight() / 2));

                if (calculatedOffset <= 40) {
                    calculatedOffset = 40;
                }

                $popup.css('top', calculatedOffset);
                $('#nlpopup, #nlpopup_overlay').fadeIn(500);
            };

            $('.nlpopup_close, #nlpopup_overlay').on('click', function(e) {
                $.cookie('nlpopup', 'closed', { expires: nlpopup_expires, path: '/' });
                $('#nlpopup, #nlpopup_overlay').fadeOut(200);
                e.preventDefault();
            });

            if ($.cookie('nlpopup') != 'closed') {
                setTimeout(open_nlpopup, nlpopup_delay);
            }
        };


        // (6.1) Shop PopUp =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        if ($window.width() > parseInt(winWidthSm)) {
            var atcpopup_expires = $("atcpopup").data("expires");
            var atcpopup_delay = $("atcpopup").data("delay") * 1500;

            var open_atcpopup = function() {
                var topoffset = $document.scrollTop(),
                    viewportHeight = $window.height(),
                    $popup = $('#atcpopup');
                var calculatedOffset = (topoffset + (Math.round(viewportHeight / 2))) - (Math.round($popup.outerHeight() / 2));

                if (calculatedOffset <= 40) {
                    calculatedOffset = 40;
                }

                $popup.css('top', calculatedOffset);
                $('#atcpopup, #atcpopup_overlay').fadeIn(500);
            };

            $('.atcpopup_close, #atcpopup_overlay').on('click', function(e) {
                $.cookie('atcpopup', 'closed', { expires: nlpopup_expires, path: '/' });
                $('#atcpopup, #atcpopup_overlay').fadeOut(200);
                e.preventDefault();
            });

            if ($.cookie('atcpopup') != 'closed') {
                setTimeout(open_atcpopup, atcpopup_delay);
            }
        };

        // (6.2) Session Expiration PopUp =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
            var lefttime = 60;
            var interval = setInterval('change()',60000);
            var almostdoneTitle = 'Your Session Is About To Close!'
            var almostdone = 'Logout will occur in less than ' + lefttime + ' minutes.';
            var doneTitle = 'Welcome Back!'
            var done = 'Your session has timed-out but you can easily log back in again.';
            var continue1 = "#continue_buttons";
            var continue2 = "#continue_buttons2";         
            function change()
            {
               lefttime--;
               if(lefttime<=3 && lefttime>0){                    
                var open_session = function() {
                    $( ".session-title" ).text(almostdoneTitle); 
                    $( ".session-message" ).text(almostdone); 
                    $(continue1).show;
                    $(continue2).hide;
                    modalWorking('#session_timeout', '#session_overlay', '#session_close');
                };           
               }          
               if(lefttime==0){
                var open_session = function() {
                    $( ".session-title" ).text(doneTitle);
                    $( ".session-message" ).text(done); 
                    $(continue2).show;
                    $(continue1).hide;
                    modalWorking('#session_timeout', '#session_overlay', '#session_close');
                };           
               }
            }

            // This is a function to control pop ups 
            function modalWorking(modalID, overlayID, closeID) { 
            var topoffset = $document.scrollTop(),
                viewportHeight = $window.height(),
                $popup = $(modalID);
            var calculatedOffset = (topoffset + (Math.round(viewportHeight / 2))) - (Math.round($popup.outerHeight() / 2));
            if (calculatedOffset <= 40) {
                calculatedOffset = 40;
            }
            $popup.css('top', calculatedOffset);
            $(modalID, overlayID).fadeIn(500);
            $(closeID, overlayID).on('click', function(e) {
                $(modalID, overlayID).fadeOut(200);
                e.preventDefault();
            });
             }

        // (7) Accordian ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

        /* Accordian Arrow Added*/
        $('ul.jq-accordian > li:has( > ul ) > a').append("<span class='jq-accordionIcon'></span>");
        /* Clickeble Link */
        $('ul.jq-accordian > li:has( > ul ) > a').attr('href', 'javascript:void(0)');
        /* Accordian Sub Childern "ul" Hide */
        $('ul.jq-accordian li ul').hide();

        var accordianClick = $('ul.jq-accordian li a');
        var accordionHeader = $('ul.jq-accordian > li > a');

        /* Accordian */
        accordianClick.on('click', function(e) {
            accordianClick.each(function(i) {
                if ($(this).next().is("ul") && $(this).next().is(":visible")) {
                    $(this).next().slideUp();
                }
            });

            var e = $(e.target);
            if (e.next().is("ul") && e.next().is(":visible")) {
                e.next().slideUp();

            } else {
                e.next().slideDown();

            }
        });

        /* Accordian Icon */
        accordianClick.on('click', function(e) {
            if ($(this).hasClass('is-active')) {
                $(this).removeClass('is-active');
            } else {
                /* close other content */
                accordionHeader.not(this).removeClass('is-active');
                $(this).addClass('is-active');
            }
        });

        // (8) Price Range Slider ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $(function() {
            var min_price = $('#price_range_min').attr('data-min'),
                max_price = $('#price_range_max').attr('data-max');

            $(".price-range-slider").slider({
                range: true,
                min: 0,
                max: 1500,
                values: [min_price, max_price],
                step: 10,
                slide: function(event, ui) {
                    $("#price-range-from-to").html("Price : <span class='from'>$" + ui.values[0] + "</span> &mdash; <span class='to'>$" + ui.values[1]);
                    $("#price_range_min").val(ui.values[0]);
                    $("#price_range_max").val(ui.values[1]);
                }
            });

            $("#price-range-from-to").html("Price : <span class='from'>$" + $(".price-range-slider").slider("values", 0) + "</span> &mdash; <span class='to'>$" + $(".price-range-slider").slider("values", 1) + "</span>");
            $("#price_range_min").val($(".price-range-slider").slider("values", 0));
            $("#price_range_max").val($(".price-range-slider").slider("values", 1));
        });

        // (9) Select Box ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $(function() {
            $('.nice-select-box', '.hawksortby').niceSelect();
        });


        // (10) Toggle  ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        /*Slide Toggle*/
        $('.slide-toggle-btn').on('click', function(e) {
            $('#' + $(this).data('toggleTarget')).slideToggle(300);
        });

        //fade Toggle
        $('.fade-toggle-btn').on('click', function(e) {
            $('#' + $(this).data('toggleTarget')).fadeToggle(300);
        });


        // (11) Product Quantity '+', '-' ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $(function() {
            var qty_min = $('.quantity').attr("min");
            var qty_max = $('.quantity').attr("max");

            $(".quantityPlus").on('click', function() {
                var currentVal = parseInt($(this).next(".quantity").val(), 10);
                var str = $("p:first").text();
                if (currentVal != qty_max) {
                    $(this).next(".quantity").val(currentVal + 1);
                }
            });

            $(".quantityMinus").on('click', function() {
                var currentVal = parseInt($(this).prev(".quantity").val(), 10);
                if (currentVal != qty_min) {
                    $(this).prev(".quantity").val(currentVal - 1);
                }
            });
        });


        // (12) product page - selecting color, selecting size, Grid/List View ==============================================================================
        /*Select Color*/
        $('.color-selector .entry').on('click', function() {
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active');
        });

        /*Select Size*/
        $('.size-selector .entry').on('click', function() {
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active');
        });

        /*Grid/List View*/
        var productListBtn = $('.product-list-switcher');
        var productGridBtn = $('.product-grid-switcher');
        var productItemsWrap = $('.product-list-item');

        productListBtn.on('click', function(event) {
            event.preventDefault();
            productItemsWrap.addClass('product-list-view');
            productListBtn.addClass('product-view-icon-active')
            productGridBtn.removeClass('product-view-icon-active')
        });
        productGridBtn.on('click', function(event) {
            event.preventDefault();
            productItemsWrap.removeClass('product-list-view');
            productListBtn.removeClass('product-view-icon-active')
            productGridBtn.addClass('product-view-icon-active')
        });
    });

    

  

    // ---------------------------------------------------------------------------------------------------------------------------->
    // Carousel (Owl, Slick)  ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->

    $(function() {

        //Product Item 5
        $('.product-item-5').owlCarousel({
            items: 5,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                320: { items: 1 },
                480: { items: 2 },
                775: { items: 3 },
                991: { items: 4 },
                1170: { items: 5 }
            }
        });

        //Product Item 4
        $('.product-item-4').owlCarousel({
            items: 4,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                320: { items: 1 },
                480: { items: 2 },
                775: { items: 2 },
                991: { items: 3 },
                1170: { items: 4 }
            }
        });

        //Product Item 3
        $('.product-item-3').owlCarousel({
            items: 3,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                775: { items: 2 },
                991: { items: 3 },
                1170: { items: 3 }
            }
        });

        //Product Item 2
        $('.product-item-2').owlCarousel({
            items: 2,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                775: { items: 1 },
                991: { items: 2 },
                1170: { items: 2 }
            }
        });

        //Product Item 1
        $('.product-item-1').owlCarousel({
            items: 1,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                775: { items: 1 },
                991: { items: 1 },
                1170: { items: 1 }
            }
        });

        // Blog Carousel
        $('.blog-carousel').owlCarousel({
            items: 4,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                775: { items: 1 },
                991: { items: 2 },
                1170: { items: 2 }
            }
        });
        // Blog Carousel
        $('.testimonials-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            slideSpeed: 300,
            autoplay: true,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: false,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            nimateIn: 'fadeIn',
            animateOut: 'fadeOut'

        });

        //Brand Logo Carousel
        $('.brand-logo-carousel').owlCarousel({
            items: 7,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: false,
            transitionStyle: true,
            responsive: {
                0: { items: 1 },
                250: { items: 1 },
                320: { items: 2 },
                480: { items: 3 },
                775: { items: 4 },
                991: { items: 6 },
                1170: { items: 7 }
            }
        });


        //Product page image slider with thumb (Slick Slider)
        var $sync1 = $(".product-image-slider"),
            $sync2 = $(".product-image-slider-thumbnails");

        $sync1.slick({
            dots: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            asNavFor: $sync2,
            infinite: false
        });
        $sync2.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: $sync1,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            infinite: false
        });

        var thumbPadding = $('.product-image-slider-thumbnails').find('button').hasClass('slick-arrow');
        if (thumbPadding) {
            $('.product-image-slider-thumbnails').css('padding-left', '30px');
            $('.product-image-slider-thumbnails').css('padding-right', '30px');
        } else {

            $('.product-image-slider-thumbnails').css('margin-left', '-7px');
            $('.product-image-slider-thumbnails').css('margin-right', '-7px');
        };

    });



    // ---------------------------------------------------------------------------------------------------------------------------->
    // Hero Slider ( Revolution Slider )  ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->
    revHeroSlider();

    function revHeroSlider() {

        var tpj = jQuery;
        var revapi1078;
        tpj(document).ready(function() {
            if (tpj("#rev_slider_1078_1").revolution == undefined) {
                revslider_showDoubleJqueryError("#rev_slider_1078_1");
            } else {
                revapi1078 = tpj("#rev_slider_1078_1").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "../plugins/rev_slider/js/",
                    sliderLayout: "fullwidth",
                    dottedOverlay: "none",
                    delay: 5000,
                    touchenabled: "on",

                    swipe_velocity: 0.7,
                    swipe_min_touches: 1,
                    swipe_max_touches: 1,
                    drag_block_vertical: false,
                    keyboardNavigation: 'on',

                    fullWidth: 'on',
                    fullScreen: 'off',

                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        arrows: {
                            style: "zeus",
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 1025,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            }
                        },
                        bullets: {
                            enable: true,
                            hide_onmobile: false,
                            hide_over: 1025,
                            style: "metis",
                            hide_onleave: false,
                            direction: "horizontal",
                            h_align: "center",
                            v_align: "bottom",
                            h_offset: 0,
                            v_offset: 20,
                            space: 10,
                            tmp: ''
                        }
                    },
                    viewPort: {
                        enable: true,
                        outof: "pause",
                        visible_area: "80%",
                        presize: false
                    },
                    hideTimerBar: 'on',
                    responsiveLevels: [1240, 1024, 778, 480],
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: [1240, 1024, 778, 480],
                    gridheight: [600, 600, 500, 400],
                    lazyType: "smart",
                    shadow: 0,
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    hideThumbsOnMobile: "off",
                    hideBulletsOnMobile: 'off',
                    hideArrowsOnMobile: 'off',

                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });

    };

})(jQuery);