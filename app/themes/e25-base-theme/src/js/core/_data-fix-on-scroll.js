$(() => {
    /**
     * Fix on scroll
     * ----
     * This module can be use for when a element wants to be on fixed position while scroll.
     * NOTE : Currently this will support for only top position. We will extend to bottom position in future.
     *        And the element should have only one child element. ( Child element is must )
     * TODO: Need to implement for bottom fix element.
     */

    /**
     * Data attributes
     */
    const DATA_FIX_ON_SCROLL = 'data-fix-on-scroll',
        DATA_FIX_ON_SCROLL__FIXED = `${DATA_FIX_ON_SCROLL}--fixed`; // CSS class name

    /**
     * Static properties
     */
    const COMPONENTS = $(`[${DATA_FIX_ON_SCROLL}]`);
    let TOP_OFFSET = 102,
        _hash = window.location.hash,
        _isOnFirstLoad = true;
    let clickInitiated = false;

    /**
     * First, get all elements and get the bounding height then set it to the element.
     */
        // TODO : the 'i' parameter is not used. should remove ?
    const init = () => {
            $.each(COMPONENTS, (i, element) => {
                $(element).height($(element).outerHeight());
            });

            scrolled();
        };


    /**
     * After scroll, this function will  set the top position and 'data-fix-on-scroll--fixed' css class.
     * or will remove the class and position top.
     */
    const scrolled = () => {

        _.forEach(COMPONENTS, (element, i) => {
            let elem = $(element),
                elemHeight = elem.height(),
                rect = elem.get(0).getBoundingClientRect();

            if (rect.y < TOP_OFFSET && !elem.hasClass(DATA_FIX_ON_SCROLL__FIXED)) {
                elem.addClass(DATA_FIX_ON_SCROLL__FIXED);
                elem.children().first().css({'top': `${TOP_OFFSET}px`});
                TOP_OFFSET += elemHeight;
                offsetChanged(TOP_OFFSET);
            } else if (rect.y >= (TOP_OFFSET - elemHeight) && elem.hasClass(DATA_FIX_ON_SCROLL__FIXED)) {
                elem.removeClass(DATA_FIX_ON_SCROLL__FIXED);
                elem.children().first().css({'top': `unset`});
                TOP_OFFSET -= elemHeight;
                offsetChanged(TOP_OFFSET);
            }

            if (COMPONENTS.length == (i + 1) && _hash && _hash.length > 1 && _isOnFirstLoad) {
                _isOnFirstLoad = false;
                scrollTo(_hash);
            }
        });


    };

    const offsetChanged = (topOffset) => {
        if (topOffset && clickInitiated) {
            scrollTo(_hash);
        }
    };

    const scrollTo = _.throttle((hash) => {
        if (hash && document.querySelector(hash)) {
            clickInitiated = true;
            let element = document.querySelector(hash);

            // get offset
            let _calculatedOffset = window.scrollY + element.getBoundingClientRect().top - TOP_OFFSET;

            // _ignoreScrolled = true;
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: _calculatedOffset
                }, 300, function () {
                    clickInitiated = false;
                });
            }, 0);

            // select active
            let link = document.querySelector(`a[href="${hash}"]`);
            if (link) {
                link.classList.add('active');
                // parent is li then we need to add the active class for li too.
                // TODO : need to ask from developers, is this important or not?
                let parent = link.parentNode;
                if (parent.nodeName === 'LI') {
                    parent.classList.add('active');
                }
            }
        }
    }, 300);

    //
    $('a[href^="#"]').click((e) => {
        e.preventDefault();

        if (e.target.getAttribute('href') && e.target.getAttribute('href').length > 1) {
            _hash = e.target.getAttribute('href');
            history.pushState({extraData: e.target.innerText}, '', _hash);
            scrollTo(_hash);
        }
    });


    /**
     * INIT
     * ---
     * Bind and init the functionality
     */
    // init();_.debounce(, 50)
    $(window).scroll(scrolled);


    /**
     * RE INIT
     * ----
     * When orientation change or resize the window then re init the whole functions.
     */
    $(window).on('orientationchange resize load', () => {
        _.forEach(COMPONENTS, (item, index) => {
            // reset height and child's top properties.
            let elem = $(item);
            elem.css({'height': 'unset'});
            elem.children().first().css({'top': 'unset'});

            // when reset is done, re init the component.
            if (COMPONENTS.length == (index + 1)) {
                init();
            }
        });

        // if (COMPONENTS.length == 0) {
        //     scrollTo(_hash, true);
        // }
    });


});