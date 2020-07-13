
$(() => {
    /**
     * Overflow elements
     * ----
     */
    const SELECTOR = 'data-overflow';
    const COMPONENTS = $(`[${SELECTOR}]`);

    $.each(COMPONENTS, function(index, element){
        let _elem = $(element);
        console.log(_elem)
    });

});