$(() => {
    $('.collapse.show').parent().addClass('active');
    $('div[data-toggle="collapse"]').on('click', function (e) {        
        if ($(this).parents('.accordion').find('.collapse.show')) {
            var idx = $(this).index('[data-toggle="collapse"]');
            if (idx == $('.collapse.show').index('.collapse')) {
                // prevent collapse
                e.stopPropagation();
            }
            else {
                $(this).parents('.bs-accordion__container').find('.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        }        
    });
});