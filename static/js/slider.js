/*
 * Galerie (RoyalSlider) auf den Projektseiten.
 * Die Optionen entsprechen denen aus WordPress → RoyalSlider → Slider bearbeiten
 * und können hier angepasst werden.
 * Doku: https://dimsemenov.com/plugins/royal-slider/documentation/
 */
jQuery(function ($) {
  $('.royalSlider').each(function () {
    var $slider = $(this);
    var ratio = parseFloat($slider.data('ratio')) || 0.5625;

    $slider.royalSlider({
      autoScaleSlider: true,
      autoScaleSliderWidth: 800,
      autoScaleSliderHeight: Math.round(800 * ratio),
      imageScaleMode: 'fit',
      imageAlignCenter: true,
      controlNavigation: 'bullets',
      arrowsNav: true,
      arrowsNavAutoHide: false,
      loop: true,
      keyboardNavEnabled: true,
      navigateByClick: true,
      transitionType: 'move',
      slidesSpacing: 0
    });
  });
});
