(function(window, undefined) {
  "use strict";

  var mobileDim = new CELEMENTS.mobile.Dimensions();

  var hasOverlayYui = function() {
    return (CELEMENTS && CELEMENTS.presentation && CELEMENTS.presentation.getOverlayObj);
  };

  var centerOverlay = function() {
    if (hasOverlayYui() && CELEMENTS.presentation.getOverlayObj()._overlayDialog) {
      CELEMENTS.presentation.getOverlayObj()._overlayDialog.center();
    }
  };

  /**
   * Responsive Width
   **/

  var getMaxMobileWidth = function() {
    if (mobileDim.isMobile.iPhone()) {
      return 1100;
    } else {
      return 700;
    }
  };

  var widthChangeHandler = function() {
    var innerWidth = mobileDim.getInnerWidth();
    var maxMobileWidth = getMaxMobileWidth();
    if (innerWidth <= maxMobileWidth) {
      $(document.body).addClassName('bellisMobile');
      console.log('add bellisMobile ', innerWidth);
      if (innerWidth <= 500) {
        $(document.body).addClassName('smallMobileWidth');
      } else {
        $(document.body).removeClassName('smallMobileWidth');
      }
      $(document.body).fire('bellis:switchLayout', {
        'toMobile' : true
      });
    } else if (innerWidth >= (maxMobileWidth + 5)) {
      $(document.body).removeClassName('bellisMobile');
      $(document.body).removeClassName('smallMobileWidth');
      console.log('remove bellisMobile ', innerWidth);
      $(document.body).fire('bellis:switchLayout', {
        'toMobile' : false
      });
    }
    $('navigation_mobile').hide();
    $('sitecontainer').setStyle({
      'marginLeft' : ''
    });
  };

  var delayedWindowResizeCall = null;
  var delayedWindowResizeStarter = function(event) {
    if (delayedWindowResizeCall) {
      clearTimeout(delayedWindowResizeCall);
    }
    delayedWindowResizeCall = delayedWindowResize.delay(0.4, event);
  };

  var delayedWindowResize = function(event) {
    $(document.body).fire('celements:delayedWindowResize');
  };

  var registerResponsiveWidth = function() {
    $(document.body).stopObserving('celements:delayedWindowResize', widthChangeHandler);
    $(document.body).observe('celements:delayedWindowResize', widthChangeHandler);
    $(document.body).stopObserving('celements:delayedWindowResize', responsiveSlideShowHandler);
    $(document.body).observe('celements:delayedWindowResize', responsiveSlideShowHandler);
    Event.stopObserving(window, 'resize', delayedWindowResizeStarter);
    Event.observe(window, 'resize', delayedWindowResizeStarter);
    Event.stopObserving(window, "orientationchange", delayedWindowResizeStarter);
    Event.observe(window, "orientationchange", delayedWindowResizeStarter);
    delayedWindowResizeStarter();
  };

  /**
   * mobile menu
   */

  var isMobileLayout = function() {
    return $(document.body).hasClassName('bellisMobile');
  };

  var menuAccordeon = null;

  /**
   * Starting
   **/
  if (window.celAddOnBeforeInitializeSlideShowListener) {
    window.celAddOnBeforeInitializeSlideShowListener(function() {
      widthChangeHandler(); //check for mobile layout
      registerResponsiveWidth();
      $$('#sitecontainer img.celimage_slideshow').each(function(slideShowImg) {
        slideShowImg.addClassName('celimage_forceAutoResize');
      })
    });
  }

  var mobileMenuEffect = null;
  var toggleMobileMenuHandler = function(event) {
    event.stop();
    var menuWidth = $('navigation_mobile').getWidth();
    console.log('gartnern toggleMobileMenuHandler: click ', menuWidth, event);
    try {
      if (mobileMenuEffect) {
        mobileMenuEffect.cancel();
      }
      console.log('toggleMobileMenuHandler: click 2 ', menuWidth, event);
      var endLeft = null;
      var endMarginLeft = null;
      var afterFinishedFunc = function() {};
      $('sitecontainer').setStyle({
        'position' : 'relative'
      });
      $('navigation_mobile').setStyle({
        'top' : '0px'
      });
      if (!$('navigation_mobile').visible()) {
        $('navigation_mobile').setStyle({
          'left' : (-menuWidth + 'px')
        });
        $('navigation_mobile').show();
        endLeft = 0;
        endMarginLeft = menuWidth;
      } else {
        endLeft = -menuWidth;
        endMarginLeft = 0;
        afterFinishedFunc = function() {
          $('navigation_mobile').hide();
        };
      }
      mobileMenuEffect = new Effect.Parallel([
//         new Effect.Move('navigation_mobile', {
//           sync: true,
//           x: endLeft,
//           y: 0,
//           mode: 'absolute'
//         }), 
         new Effect.Morph('sitecontainer', { sync: true,
           style: ('margin-left: ' + endMarginLeft + 'px') }) 
       ], { 
         duration: 0.8,
         delay: 0.5,
         afterFinish : afterFinishedFunc 
       });
    } catch (exp) {
      console.error('toggleMobileMenuHandler: failed ', exp);
    }
  };

  var navAccordeonEffect = undefined;

  var navigateToMainLinkClickHandler = function(event) {
    var step = event.memo;
    console.log('navigateToMainLinkClickHandler: ', step);
    if (navAccordeonEffect.isStepVisible(step)) {
      event.stop();
      window.location.href = step.down('a').href;
    }
  };

  var registerMobileMenu = function() {
    $('navigation_mobile').hide();
    var menuPointElem = $('header').down('.menu_point a');
    if (menuPointElem) {
      console.log('registerMobileMenu: ', menuPointElem);
      menuPointElem.stopObserving('click', toggleMobileMenuHandler);
      menuPointElem.observe('click', toggleMobileMenuHandler);
    }
    navAccordeonEffect = new CELEMENTS.anim.AccordeonEffect('navigation_mobile',
        '#menu_mobile > ul > li', 'a', 'ul');
    $('navigation_mobile').select('#menu_mobile > ul > li').each(function(step) {
      step.stopObserving('celanim_accordeon-block:beforeClickHandler',
          navigateToMainLinkClickHandler);
      step.observe('celanim_accordeon-block:beforeClickHandler',
          navigateToMainLinkClickHandler);
    });
  };

  var responsiveSlideShowHandler = function() {
    $$('#row1 .celimage_slideshow_wrapper').each(function(slideShowContainer) {
      var slideShowContainerId = slideShowContainer.id;
      var origWidth = parseInt(slideShowContainerId.split(':')[8]);
      var origHeight = parseInt(slideShowContainerId.split(':')[9]);
      $(slideShowContainerId).setStyle({
        'width' : '',
        'height' : ''
      });
      $(slideShowContainerId).select('.cel_slideShow_slideRoot').each(
        function(slideRoot) {
          slideRoot.setStyle({
            'width' : '',
            'height' : '',
            'position' : 'relative',
            'left' : '0',
            'top' : '0'
          });
      });
      var newWidth = Math.min($(slideShowContainerId).getWidth(), origWidth);
      var newHeight = newWidth * origHeight / origWidth;
      var slideShowId = slideShowContainerId.replace(/^slideContainer_/, '');
      window.CELEMENTS.image.getSlideShowObj(slideShowId).changeContainerSize(newWidth,
          newHeight);
    });
  };

  window.celAddOnBeforeLoadListener(function() {
    widthChangeHandler(); //check for mobile layout
    registerResponsiveWidth();
    if (mobileDim.isMobile.Safari() && (mobileDim.version() <= 7)) {
      $(document.body).addClassName('SafariOldBrowserFix');
    }
    registerMobileMenu();
  });

  if (hasOverlayYui()) {
    Event.observe(window, 'scroll', centerOverlay);
  }

})(window);
