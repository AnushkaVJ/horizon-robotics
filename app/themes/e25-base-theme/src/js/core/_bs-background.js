
$(() => {

    const SELECTOR = '.bs-background',
        COMPONENTS = $(SELECTOR).parent().parent();

    function initPositioningBackgroundMedia(components) {

        $.each(components, function () {

            const background = $(this).find(SELECTOR);
            const mediaImage = background.find('img');
            const mediaVideo = background.find('iframe, video');
            const _bHeight = background.height();
            const _bWidth = background.width();
            const _mImgHeight = mediaImage.height();
            const _mImgWidth = mediaImage.width();
            const _mHeight = mediaVideo.height();
            const _mWidth = mediaVideo.width();
            const _bRatio = _mWidth / _mHeight;

            if (mediaVideo.prop('tagName') === 'IFRAME' || mediaVideo.prop('tagName') === 'VIDEO') {
                let newWidth = _bWidth * _bRatio,
                    newHeight = newWidth / _bRatio;

                if (_bWidth < _bHeight) {
                    newHeight = _bHeight;
                    newWidth = _bWidth * _bRatio;
                }

                mediaVideo.css({
                    width: newWidth,
                    height: newHeight,
                    marginLeft: newWidth > _bWidth ? ((newWidth - _bWidth) / 2) * -1 : 0,
                    marginTop: newHeight > _bHeight ? ((newHeight - _bHeight) / 2) * -1 : 0
                });

            }

            if (mediaImage.prop('tagName') === 'IMG') {
                mediaImage.css({
                    marginTop: _bHeight < _mImgHeight ? ((_mImgHeight - _bHeight) / 2) * -1 : 0,
                    marginLeft: _bWidth < _mImgWidth ? ((_mImgWidth - _bWidth) / 2) * -1 : 0,
                    opacity: 1
                });
            }

        });

    }


    /**
     * When resize or orientation or load changed, This will reset and rerun the entire functions.
     */
    $(window).on('orientationchange resize load', () => {
        $.each(COMPONENTS, (index, item) => {

            // reset height and child's top properties.
            let elem = $(item);
            elem.find('img').css({
                height: 'auto',
                width: 'auto',
                marginTop: 'auto',
                marginLeft: 'auto',
                opacity: 'auto'
            });
            elem.find('iframe, video').css({
                height: 'auto',
                width: 'auto',
                marginTop: 'auto',
                marginLeft: 'auto'
            });

            // when reset is done, re init the component.
            if (COMPONENTS.length === (index + 1)) {
                initPositioningBackgroundMedia(COMPONENTS);
            }
        });
    });

});