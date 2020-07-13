import * as CORE_HELPER from './core-helpers';

/**
 * EQUAL HEIGHT
 * ----
 * This jQuery plugin make elements to equal height.
 *
 * eg: This will work on greater than small devices.
 *  $('.bs-blurb').makeMeEqual({
 *      on: CORE_HELPER.DEVICE_NAMES.sm,
 *      by: 'row'
 *  });
 */

(function ($, CORE_HELPER) {

    const COMPONENTS = [];
    const DATA_EQUAL_HEIGHT = 'data-equal-height';

    $.fn.makeMeEqual = function (_options) {

        let elements = this,
            defaults = {
                on: CORE_HELPER.DEVICE_NAMES.xs,
                by: 'row',
                isResize: false
            },
            options = $.extend({}, defaults, _options);


        // save options and element for trigger on resize/orientation change
        if (!options.isResize) {
            COMPONENTS.push({
                options: _options,
                elements: elements
            });
        }

        // if responsive not support just ignore the equal height.
        if (!CORE_HELPER.isDEVICE_GREATERTHAN(options.on)) {
            return;
        }

        /**
         * get max height of this group
         *
         */
        let maxHeight = Math.max.apply(null, elements.map((i) => {
            return $(elements.get(i)).height();
        }).get());

        // set max height
        elements.map((i) => {
            return $(elements.get(i)).height(maxHeight);
        });

        return this;
    };


    $(() => {

        /**
         * When resize or orientation changed, This will reset and rerun the entire functions.
         */
        $(window).on('orientationchange resize', () => {

            // TD.debounce(300, false, () => {
            $.each(COMPONENTS, (index, item) => {

                // reset height and child's top properties.
                let elem = item.elements;
                elem.height('unset');

                // when reset is done, re init the component.
                if (COMPONENTS.length == (index + 1)) {
                    item.options['isResize'] = true;
                    elem.makeMeEqual(item.options);
                }
            });
            // });
        });


        $(window).on('load', () => {
            // let elements = $(`[${DATA_EQUAL_HEIGHT}]`);
            // $.each(elements, )
        });

    });




}(jQuery, CORE_HELPER));
