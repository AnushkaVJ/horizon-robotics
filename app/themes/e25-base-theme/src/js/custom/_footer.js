$(() => {
    $('.mobile-nav .menu > li.menu-item-has-children').each(function () {
        $(this).append('<span class="footer-drop-down-helper"></span>');
    });

    let footerDropDownHelper = $('.mobile-nav .menu > li.menu-item-has-children span.footer-drop-down-helper');
    footerDropDownHelper.on('click', function () {
        let $this = $(this);
        $this.prev('ul').slideToggle(600);
        $this.parent('li').toggleClass('activenav');
    });

    let mobilenavicon = $('.header .nav-right .mobile-icon');
    mobilenavicon.on('click', function () {
        $('.mobile-nav').addClass('active');
    });

    let closebutton = $('.mobile-nav  .close-button span');
    closebutton.on('click', function () {
        $('.mobile-nav').removeClass('active');
    });
});