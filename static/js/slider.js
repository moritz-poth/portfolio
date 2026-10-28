/*
 * Galerie (RoyalSlider) auf den Projektseiten.
 * Die Optionen sind 1:1 aus dem WordPress-Plugin "New RoyalSlider" übernommen.
 * Doku: https://dimsemenov.com/plugins/royal-slider/documentation/
 */
jQuery(function ($) {
  $('.royalSlider').royalSlider({
    width: '100%',
    height: '',
    autoScaleSliderWidth: 960,
    autoScaleSliderHeight: 750,
    autoHeight: true,
    slidesSpacing: 10,
    imageScaleMode: 'fill',
    imageAlignCenter: false,
    imageScalePadding: 0,
    arrowsNavAutoHide: false,
    arrowsNavHideOnTouch: true,
    sliderDrag: false
  });
});
