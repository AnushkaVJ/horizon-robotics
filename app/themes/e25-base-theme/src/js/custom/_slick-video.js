$(() => {
    $('.bs-section--main-slider .slick-slider').on('afterChange', function(event, slick, currentSlide){
        var _video = $(slick['$slides'][slick.currentSlide]).find('video');
        if(_video.length) {
            _video[0].play();
        }
        // else {
        //     let _videoArray = $(slick['$slides'].find('video')).toArray();
        //     if(_videoArray.length) {
        //         _videoArray.forEach(singleVideo => singleVideo.pause());
        //     }
        // }
    });

    $('.bs-section--main-slider .slick-slider').on('beforeChange', function(event, slick, currentSlide){
        var _video = $(slick['$slides'][slick.currentSlide]).find('video');
        if(_video.length) {
            _video[0].pause();
        }
    });
});