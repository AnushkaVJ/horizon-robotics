var ww = $(window).width();
var limit = 1200;

var a = document.getElementById("testimonial");
if (a) {
    function refresh() {
        ww = $(window).width();
        var w = ww < limit ? (location.reload(true)) : (ww > limit ? (location.reload(true)) : ww = limit);
    }


    var tOut;
    $(window).resize(function () {
        var resW = $(window).width();
        clearTimeout(tOut);
        if ((ww > limit && resW < limit) || (ww < limit && resW > limit)) {
            tOut = setTimeout(refresh, 100);
        }
    });
}





