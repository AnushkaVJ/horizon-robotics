import 'jquery';
import 'waypoints/lib/noframework.waypoints.min'; // dependency for counterup
import 'waypoints/lib/jquery.waypoints.min'; // dependency for counterup
import 'jquery.counterup';

$(() => {
    function init() {
        $.each($('[data-counterup]'), (index, item) => {
            $(item).counterUp();
        });
    }
    init();
});