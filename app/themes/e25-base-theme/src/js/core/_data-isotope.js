var Isotope = require('isotope-layout');
// require('isotope-cells-by-row');
// https://isotope.metafizzy.co/extras.html

$(() => {

  if ($('.grid').length > 0 && $('[data-filter]').length > 0) {
    const $buttonGroup = $('.filter-button-group');
    const $filters = $('[data-filter]');
    const iso = new Isotope('.grid', {
      itemSelector: '.grid-item',
      filter: '.asia'
    });

    $filters.on('click', (e) => {
      iso.arrange({
        filter: e.target.getAttribute('data-filter')
      });
    });

    // set initial is-checked class
    $('[data-filter=".asia"]').addClass('is-active');

    // change is-checked class on buttons
    $filters.each(function () {
      $buttonGroup.on('click', 'a', function () {
        $buttonGroup.find('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
      });
    });

  }

});