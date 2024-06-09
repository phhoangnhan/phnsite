/*

[Master JS File (Unminified) : MAIN.JS]
–––––––––––––––––––––––––––––––––––––––––––––––––– 

 * Dyon - Simple vCard Resume Template
 * Author: Themesit, http://www.themesit.com
 */

(function($) {
    'use strict';

    /** Window on Load */
    $(window).on('load', function() {

        /** Loader */
        setTimeout(function() {
            $('.loader-wrapper').fadeOut(600);
        }, 1500);

    });


    /** Animation on scroll */
    function elementInView() {
        var $animatedElements = $('.anim');
        var $window = $(window);

        $window.on('scroll resize', function() {
            var windowHeight = $window.height();
            var windowTopPosition = $window.scrollTop();
            var windowBottPosition = (windowTopPosition + windowHeight);

            $.each($animatedElements, function() {
                var $element = $(this);
                var elementHeight = $element.outerHeight();
                var elementTopPosition = $element.offset().top;
                var elementBottPosition = (elementTopPosition + elementHeight);

                // Check to see if this current container is within viewport
                if ((elementBottPosition >= windowTopPosition) &&
                    (elementTopPosition <= windowBottPosition)) {
                    $element.addClass('animated');
                    //$element.removeClass('anim');

                    // Animate progress bar
                    if ($element.hasClass('progress-bar')) {
                        $element.css('width', $element.attr('data-percent') + '%');
                    }

                }
                //else {
                //$element.removeClass('animated');
                //}
            });
        });

        $window.trigger('scroll');
    }


    /** Document Ready */
    $(document).ready(function() {

        /** Animation on scroll */
        elementInView();

        /** Set Full Height for Intro/ Section */
        $('#intro, #birds-animation, .site-nav').height(parseInt($(window).height()));

        /** Background Image */
        $('.bg-image').each(function() {
            var $imgPath = $(this).attr('data-image');
            $(this).css('background-image', 'url(' + $imgPath + ')');
        });

        var navFixed = $('#intro').height() - 50;

        /** Nav fixed on scroll */
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > navFixed) {
                $('body').addClass('navfixed');
            } else {
                $('body').removeClass('navfixed');
            }
        });

        /** Typed.js (Text typing effect) */
        $("#typed").typed({
            strings: ["^2100&nbsp;I'm Pham Hoang Nhan.<br/>Editor/Designer from Ho Chi Minh City."],
            typeSpeed: 30,
            backDelay: 750,
            loop: false,
            cursorChar: "|",
            contentType: 'html', // or text
            loopCount: false, // defaults to false for infinite loop
        });

        /** Site Navigation LocalScroll */
        $('.site-nav ul').localScroll({
            target: 'body',
            offset: -30,
            queue: true,
            duration: 1000,
            hash: false,
        });

        /** Site Navigation Trigger*/
        $('.nav-toggler').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('menu-open');
        });

        $('.site-nav ul li a').on('click', function() {
            if ($('body').hasClass('menu-open')) {
                $('body').removeClass('menu-open');
            };
        });

        /** Portfolio */
        var $container = $('.works-container');

        // checking if all images are loaded
        $container.imagesLoaded(function() {

            //init isotope once all images are loaded
            $container.isotope({
                // options
                itemSelector: '.works-item',
                layoutMode: 'masonry',
                transitionDuration: '0.8s'
            });

            // forcing a perfect masonry layout after initial load
            setTimeout(function() {
                $container.isotope('layout');
            }, 500);

            // triggering filtering
            $('.works-filter li a').on('click', function() {
                $('.works-filter li a').removeClass('active');
                $(this).addClass('active');

                var selector = $(this).attr('data-filter');
                $('.works-container').isotope({
                    filter: selector
                });
                setTimeout(function() {
                    $container.isotope('layout');
                }, 700);
                return false;
            });

            // Isotope ReLayout on Window Resize event.
            $(window).on('resize', function() {
                $container.isotope('layout');
                $('#intro, #birds-animation, .site-nav').height(parseInt($(window).height()));
            });

            // Isotope ReLayout on device orientation changes
            window.addEventListener('orientationchange', function() {
                $container.isotope('layout');
            }, false);

        });

        /** MagnificPopup For Portfolio */
        $('a.lightbox').magnificPopup({
            type: 'image',
        });

        $('a.lightbox-iframe').magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '</div>',

                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },

                srcAction: 'iframe_src',
            }
        });

        /** Blog Masonry */
        $('.home .post-container').imagesLoaded(function() {
            $('.home .post-container').isotope({
                itemSelector: '.post',
                layoutMode: 'masonry',
                transitionDuration: '0s'
            });
        });

        /** Testimonial carousel */
        $('.testimonial-carousel').owlCarousel({
            autoplay: true,
            autoplaySpeed: 1000,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            autoWidth: false,
            autoHeight: false,
            items: 1,
            loop: true,
            nav: false,
            dots: false,
            navText: false,
            animateOut: 'fadeOut',
        });

        /** Client carousel */
        $('.client-carousel').owlCarousel({
            autoplay: true,
            autoplaySpeed: 1000,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            autoWidth: false,
            autoHeight: false,
            items: 3,
            margin: 30,
            loop: true,
            nav: false,
            dots: false,
            navText: false,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 4
                },
                1000: {
                    items: 3
                },
                1440: {
                    items: 4
                },
                1600: {
                    items: 5
                },
                2000: {
                    items: 6
                }
            }
        });

    });


    /** Contact Form */
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = 'Contact form submitted by ' + name;
        var message = $('#message').val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

        function isValidEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
            $.ajax({
                type: 'POST',
                url: 'php/contact.php',
                data: dataString,
                success: function() {
                    $('.success').fadeIn(1000);
                    $('.error').fadeOut(500);
                }
            });
        } else {
            $('.error').fadeIn(1000);
            $('.success').fadeOut(500);
        }

        return false;
    });

}(jQuery));