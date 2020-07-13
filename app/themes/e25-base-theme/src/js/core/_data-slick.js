import 'slick-carousel';

$(() => {

    /**
     * SLICK SLIDER
     */
    const DATA_SLICK = 'data-slick',
        DATA_SLICK_SLIDER = `.bs-slick-slider`,
        DATA_SLICK_ASNAVFOR = `${DATA_SLICK}-as-nav-for`,
        DATA_SLICK_FLY_OVER = `${DATA_SLICK}-fly-over`,
        DATA_SLICK_FLY_OVER_SLIDE = `${DATA_SLICK_FLY_OVER}-slide`,
        DATA_SLICK_FLY_OVER_CONTAINER = `${DATA_SLICK_SLIDER}__container__fly-over`,
        DATA_SLICK_FLY_OVER_CONTAINER_POINTER = `${DATA_SLICK_FLY_OVER_CONTAINER}-pointer`;


    /**
     * Global Slick Init function.
     */
    const SLICK_SLIDER_COMPONENTS = $(`[${DATA_SLICK}]`);


    /**
     * When attribute data-slick-fly-over is available only these function will work.
     * example:
     *      <div data-slick="...options for the slick" data-slick-fly-over="true">
     *          ... slides
     *      </div>
     */


    /**
     * ON INIT
     * after initiate the slider we should add the position to the fly-over content and arrow.
     * @param event
     * @param slick
     */
    const sliderOnInit = (event, slick) => {

        // when fly over option available only whe should trigger the pointer and content change event
        if (event.target.hasAttribute(DATA_SLICK_FLY_OVER)) {
            changeFlyOverContent($(slick['$slides'][0]));

            // add if else
            if (event.target.getAttribute(DATA_SLICK_FLY_OVER)=='hover'){
                $(event.target).find('.slick-slide').hover(sliderOnHover, function(){
                    //console.log('a');
                });
                $(event.target).parent().addClass('has-data-slick-fly-over-hover');
            } else {
                $(event.target).parent().addClass('has-data-slick-fly-over');
            }

            // change slider container z-index when flyover is present.
            $(slick.$slider).parents('.bs-section').find('> div > div').css('z-index',3);

        }

        // Bind As Nav For Option
        if (event.target.hasAttribute(DATA_SLICK_ASNAVFOR)) {
            $(event.target).slick('asNavFor', event.target.getAttribute(DATA_SLICK_ASNAVFOR))
        }

    };

    /**
     * ON AFTER SLIDE CHANGE ( NEXT OR PREVIEW )
     * @param event
     * @param slick
     * @param currentSlide
     * @param nextSlide
     */
    const sliderOnAfterChange = (event, slick, currentSlide, nextSlide) => {
        if (event.target.hasAttribute(DATA_SLICK_FLY_OVER)) {
            changeFlyOverContent($(slick['$slides'][slick.currentSlide]));
        }
    };

    const sliderOnHover = (e) => {
        if(changeFlyOverContent($(e.target))){
          $(DATA_SLICK_FLY_OVER_CONTAINER).fadeToggle(300);
          $(DATA_SLICK_FLY_OVER_CONTAINER_POINTER).fadeToggle(300);
        }
    };

    /**
     * Change the content of fly over element.
     * @param currentSlide
     */
    const changeFlyOverContent = currentSlide => {
        let htmlData = currentSlide.find(`[${DATA_SLICK_FLY_OVER_SLIDE}]`).html();
        if(!htmlData){
            return false;
        }
        currentSlide.parents(DATA_SLICK_SLIDER)
            .find(DATA_SLICK_FLY_OVER_CONTAINER)
            .html(htmlData);
        changeFlyOverPointer(currentSlide);
        return true;
    };

    /**
     * Change the fly over pointer after the content update.
     * @param currentSlide
     */
    const changeFlyOverPointer = currentSlide => {
        // add a pointer to fly over content
        setTimeout(() => {
            var left = currentSlide.offset().left - currentSlide.parents(`[${DATA_SLICK}]`).offset().left;
            currentSlide.parents(DATA_SLICK_SLIDER)
                .find(DATA_SLICK_FLY_OVER_CONTAINER_POINTER)
                .css({left: left + currentSlide.outerWidth() / 2});
        }, 0);
    };


    /**
     * Initiate the sliders and bind after change event.
     */
    // $(window).on('load', () => {
        SLICK_SLIDER_COMPONENTS
            .on('init', sliderOnInit)
            .on('afterChange', sliderOnAfterChange)
            .slick();

        //console.log(SLICK_SLIDER_COMPONENTS.length);
    // });


    /**
     * When orientation change or resize the browser,
     * we should adjust the slider fly over content pointer position
     */
    $(window).on('orientationchange resize', () => {
        // debounce(300, () => {
            SLICK_SLIDER_COMPONENTS.each(e => {
                // check is fly over is available
                if ($(this).attr(DATA_SLICK_FLY_OVER)) {
                    var currentSlide = $(this).find('.slick-current');
                    changeFlyOverPointer(currentSlide);
                }
            });
        // });
    });


});