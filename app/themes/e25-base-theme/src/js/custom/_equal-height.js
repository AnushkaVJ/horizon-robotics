$(window).on('load', function () {
    $('.bs-section--testimonial-container .simple-tabs .bs-accordion__content-wrapper').makeMeEqual();

    $(".simple-tabs .simple-tabs__content").each(function (i) {
        $(this).height($(this).find('.tab-pane >  div').height());
    });

    $('.bs-section--three-blurbs .bs-blurb__title h5').makeMeEqual();

});
