(function ($) {
  "use strict";

  // ==========================================================================
  // CURSOR FUNCTIONALITY
  // ==========================================================================

  function initCursor() {
    var mouseX = window.innerWidth / 2,
      mouseY = window.innerHeight / 2;

    var cursor = {
      el: $(".cursor"),
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: 30,
      h: 30,
      update: function () {
        var l = this.x - this.w / 2;
        var t = this.y - this.h / 2;
        this.el.css({ transform: "translate3d(" + l + "px," + t + "px, 0)" });
      },
    };

    // Mouse movement tracking
    $(window).mousemove(function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Cursor zoom effect on interactive elements
    $(
      "a, .swiper-pagination, .swiper-button-prev, .swiper-button-next, button, .button, .btn, .lnk"
    ).hover(
      function () {
        $(".cursor").addClass("cursor-zoom");
      },
      function () {
        $(".cursor").removeClass("cursor-zoom");
      }
    );

    // Smooth cursor movement animation
    setInterval(move, 1000 / 60);

    function move() {
      cursor.x = lerp(cursor.x, mouseX, 0.1);
      cursor.y = lerp(cursor.y, mouseY, 0.1);
      cursor.update();
    }

    // Linear interpolation function for smooth cursor movement
    function lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    }
  }

  // ==========================================================================
  // PRELOADER & WINDOW LOAD EVENTS
  // ==========================================================================

  $(window).on("load", function () {
    $("body").imagesLoaded({}, function () {
      var preload = $(".preloader");
      preload.addClass("loaded");
      preload.find(".centrize").fadeOut();

      // Initialize cursor
      initCursor();

      // Initialize scroll animations
      $(".elementor-widget-text-editor").attr("data-animate", "active");
      $(".scroll-animate").scrolla({
        once: true,
        mobile: true,
      });

      // Initialize parallax effects
      $(".js-parallax").jarallax({
        speed: 0.65,
        type: "scroll",
      });

      // Initialize text splitting animation
      Splitting();

      // Initialize Skrollr for desktop
      if ($(window).width() > 1200) {
        skrollr.init();
      }
    });

    // Disable right-click context menu
    $(document).on("contextmenu", function (e) {
      e.preventDefault();
    });
  });

  // ==========================================================================
  // MAIN INITIALIZATION
  // ==========================================================================

  $(function () {
    "use strict";

    // ==========================================================================
    // LAYOUT & RESPONSIVE SETUP
    // ==========================================================================

    // Set initial full height sections
    var setFullHeight = function () {
      var height = $(window).height();
      $(".error-page, .menu-full-overlay, .preloader .centrize").css({
        height: height,
      });
    };

    setFullHeight();
    $(window).resize(setFullHeight);

    // Add decorative Block lines
    if ($(".v-line").length) {
      $(".v-line .container").append(
        '<div class="v-line-block"><span></span></div>'
      );
      $(".v-line .hero-started").append(
        '<div class="v-line-block"><span></span></div>'
      );
    }

    // ==========================================================================
    // TEXT ANIMATIONS
    // ==========================================================================

    // Initialize typed text animation
    $(".subtitle-typed").each(function () {
      var subtitleContainer = $(this);

      subtitleContainer.typed({
        stringsElement: subtitleContainer.find(".typing-title"),
        backDelay: 1500, // Delay in text change
        typeSpeed: 60, // Typing speed
        backSpeed: 40,
        loop: true
      });
    });

    // ==========================================================================
    // HEADER FUNCTIONALITY
    // ==========================================================================

    var $header = $(".header");
    var $body = $("body");
    var $window = $(window);

    var lastScroll = 0;

    // Sticky header on scroll
    $window.on("scroll", function () {
      var scrollTop = $window.scrollTop();

      // --- Sticky toggle ---
      if (scrollTop > 100) {
        $header.addClass("sticky");
      } else {
        $header.removeClass("sticky animate-in animate-out");
        lastScroll = scrollTop;
        return; // stop here, don't animate
      }

      // --- Scroll direction ---
      if (scrollTop > lastScroll) {
        // Scrolling down → slide header in
        $header.removeClass("animate-out").addClass("animate-in");
      } else {
        // Scrolling up → slide header out (but only near top)
        if (scrollTop < 200) {
          $header.removeClass("animate-in").addClass("animate-out");
        }
      }

      lastScroll = scrollTop;
    });


    // Theme switcher functionality
    var skin = $.cookie("skin");
    if (skin == "light") {
      $body.removeClass("dark-skin").addClass("light-skin");
    }
    if (skin == "dark") {
      $body.removeClass("light-skin").addClass("dark-skin");
    }

    if ($body.hasClass("dark-skin")) {
      $header.find(".switcher-btn").addClass("active");
    }

    $header.on("click", ".switcher-btn", function () {
      var $this = $(this);
      if ($this.hasClass("active")) {
        $this.removeClass("active");
        $body.removeClass("dark-skin").addClass("light-skin");
        $.cookie("skin", "light", { expires: 7, path: "/" });
      } else {
        $this.addClass("active");
        $body.removeClass("light-skin").addClass("dark-skin");
        $.cookie("skin", "dark", { expires: 7, path: "/" });
      }
      return false;
    });

    // ==========================================================================
    // NAVIGATION MENU
    // ==========================================================================

    var $menuBtn = $(".menu-btn");
    var $menuOverlay = $(".menu-overlay");
    var $menuFullOverlay = $(".menu-full-overlay");

    // Mobile menu toggle
    $header.on("click", ".menu-btn", function () {
      var $this = $(this);
      var isActive = $this.hasClass("active");

      if (isActive) {
        // Close menu
        $this.removeClass("active").addClass("no-touch");
        $menuOverlay.addClass("no-touch");
        $body.removeClass("no-scroll");
        $menuFullOverlay.removeClass("is-open has-scroll animate-active");
        setTimeout(function () {
          $menuFullOverlay.removeClass("visible");
          $menuBtn.removeClass("no-touch");
          $menuOverlay.removeClass("no-touch");
        }, 1000);
      } else {
        // Open menu
        $this.addClass("active no-touch");
        $menuOverlay.addClass("no-touch");
        $menuFullOverlay.css({ height: $window.height() });
        $body.addClass("no-scroll");
        $menuFullOverlay.addClass("is-open visible");
        setTimeout(function () {
          $menuFullOverlay.addClass("has-scroll animate-active");
          $menuBtn.removeClass("no-touch");
          $menuOverlay.removeClass("no-touch");
        }, 1000);
      }
      return false;
    });

    // Close menu when clicking overlay
    $menuFullOverlay.on("click", ".menu-overlay", function () {
      $menuBtn.removeClass("active").addClass("no-touch");
      $menuOverlay.addClass("no-touch");
      $body.removeClass("no-scroll");
      $menuFullOverlay.removeClass("is-open has-scroll animate-active");
      setTimeout(function () {
        $menuFullOverlay.removeClass("visible");
        $menuBtn.removeClass("no-touch");
        $menuOverlay.removeClass("no-touch");
      }, 1000);
      return false;
    });

    // Close menu when clicking menu links (except parent items)
    $(".menu-full").on("click", "a", function () {
      if (!$(this).parent().hasClass("has-children")) {
        $(".header .menu-btn.active").trigger("click");
      }
    });

    // Dropdown menu functionality
    $(".menu-full .has-children > a").append(
      '<i class="fas fa-chevron-down"></i>'
    );
    $(".menu-full").on("click", ".has-children > a", function () {
      if ($(this).closest("li").hasClass("opened")) {
        $(this).closest("li").removeClass("opened");
        $(this).closest("li").addClass("closed");
        $(this).closest("li").find("> ul").slideUp();
      } else {
        $(this)
          .closest("ul")
          .find("> li")
          .removeClass("closed")
          .removeClass("opened");
        $(this).closest("ul").find("> li").find("> ul").slideUp();
        $(this).closest("li").addClass("opened");
        $(this).closest("li").find("> ul").slideDown();
      }
      return false;
    });

    // ==========================================================================
    // CAROUSEL/SLIDER COMPONENTS
    // ==========================================================================

    // Services carousel
    new Swiper(".js-services", {
      slidesPerView: 3,
      spaceBetween: 40,
      watchSlidesVisibility: true,
      noSwipingSelector: "a",
      loop: false,
      speed: 1000,
      pagination: {
        el: ".js-services .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: false,
      breakpoints: {
        // when window width is >= 320px
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });

    // Testimonials carousel
    new Swiper(".js-testimonials", {
      slidesPerView: 3,
      spaceBetween: 40,
      watchSlidesVisibility: true,
      noSwipingSelector: "a",
      loop: false,
      speed: 1000,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: false,
      breakpoints: {
        // when window width is >= 320px
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });

    // ==========================================================================
    // PORTFOLIO/GALLERY FUNCTIONALITY
    // ==========================================================================

    // Initialize portfolio and gallery section with isotope
    var $container = $(".works-items");
    var $gal_container = $(".m-gallery");

    $container.imagesLoaded(function () {
      $container.isotope({
        itemSelector: ".works-col",
        percentPosition: true,
      });
    });

    $gal_container.imagesLoaded(function () {
      $gal_container.isotope({
        itemSelector: ".col-lg-6",
        percentPosition: true,
      });
      
      // Layout refresh when images finish loading
      $gal_container.find('img').on('load', function() {
        $gal_container.isotope('layout');
      });
    });

    // Portfolio filter functionality
    $(".filter-links").on("click", "a", function () {
      var filterValue = $(this).attr("data-href");
      $container.isotope({ filter: filterValue });

      $(".filter-links a").removeClass("active");
      $(this).addClass("active");

      if (!$(filterValue).find(".scroll-animate").hasClass("animate__active")) {
        $(filterValue).find(".scroll-animate").addClass("animate__active");
      }

      return false;
    });

    // ==========================================================================
    // POPUP/MODAL FUNCTIONALITY
    // ==========================================================================

    // Popup configurations
    $(".has-popup-image").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      mainClass: "mfp-img-mobile",
      image: {
        verticalFit: true,
      },
    });

    // Video and audio popups (shared configuration)
    $(".has-popup-video, .has-popup-audio").magnificPopup({
      disableOn: 700,
      type: "iframe",
      iframe: {
        patterns: {
          youtube_short: {
            index: "youtu.be/",
            id: "youtu.be/",
            src: "https://www.youtube.com/embed/%id%?autoplay=1",
          },
        },
      },
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      mainClass: "mfp-fade",
      callbacks: {
        markupParse: function (template) {
          template.find("iframe").attr("allow", "autoplay");
        },
      },
    });

    // ==========================================================================
    // UI COMPONENTS
    // ==========================================================================

    // Tab functionality
    $(".tab-menu").on("click", ".tab-btn", function () {
      var tab_bl = $(this).attr("href");

      $(this).closest(".tab-menu").find("li").removeClass("active");
      $(this).closest("li").addClass("active");

      $(this).closest(".tabs").find("> .tab-item").hide();
      $(tab_bl).fadeIn();

      return false;
    });

    // Collapse/Accordion functionality
    $(".lui-collapse-item").on("click", ".lui-collapse-btn", function () {
      if ($(this).closest(".lui-collapse-item").hasClass("opened")) {
        $(this).closest(".lui-collapse-item").removeClass("opened");
        $(this).removeClass("active");
      } else {
        $(this).closest(".lui-collapse-item").addClass("opened");
        $(this).addClass("active");
      }
    });

    // ==========================================================================
    // MEDIA FUNCTIONALITY
    // ==========================================================================

    // Large video play functionality
    $(".m-video-large .video").on("click", ".play, .img", function () {
      $(this).closest(".video").addClass("active");
      var iframe = $(this).closest(".video").find(".js-video-iframe");
      var src = iframe.data("src");
      iframe.attr("src", src);
      return false;
    });

    // ==========================================================================
    // SEARCH FUNCTIONALITY
    // ==========================================================================

    // Initialize Jekyll search if element exists
    if ($("#search-input").length) {
      SimpleJekyllSearch({
        searchInput: document.getElementById("search-input"),
        resultsContainer: document.getElementById("results-container"),
        json: "/search.json",
      });
    }

    // ==========================================================================
    // CONTACT FORM
    // ==========================================================================

    // Contact form validation and submission
    if ($(".contacts-form").length) {
      // Form validation
      $("#cform").validate({
        rules: {
          name: {
            required: true,
          },
          message: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
        },
        success: "valid",
        submitHandler: function () {
          return 1;
        },
      });

      // Form submission handler
      $("#cform").on("submit", function (event) {
        event.preventDefault();
        var $form = $(this);
        var $status = $("#formAlertSuccess");
        var formData = new FormData(this);

        $.ajax({
          url: $form.attr("action"),
          type: $form.attr("method"),
          data: formData,
          processData: false,
          contentType: false,
          headers: {
            Accept: "application/json",
          },
          success: function () {
            $status.show();
            $form[0].reset();
          },
          error: function (xhr) {
            var errorMessage = "Oops! There was a problem submitting your form";
            if (xhr.responseJSON && xhr.responseJSON.errors) {
              errorMessage = xhr.responseJSON.errors
                .map(function (error) {
                  return error.message;
                })
                .join(", ");
            }
            $status.html(errorMessage).show();
          },
        });
      });
    }
  });


})(jQuery);
