/**
 * Common helpers and values
 */

export const LOGGER_COLORS = {
    info : '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    success: '#28a745'
};

export function LOGGER(message, type = 'info'){
    console.log(`%c ${message}`, `color: ${LOGGER_COLORS[type]}`);
}

export const BREAK_POINTS = {
    small: 567,
    medium: 768,
    large: 992,
    xlarge: 1200
};

export const DEVICE_NAMES = {
    xs : 'x-small',
    sm : 'small',
    md : 'medium',
    lg : 'large',
    xl : 'x-large'
};

export function isDEVICE(name) {
    let width = window.innerWidth;

    switch (name) {
        case DEVICE_NAMES.xs:
            return width < BREAK_POINTS.small;
        case DEVICE_NAMES.sm:
            return width < BREAK_POINTS.medium && width >= BREAK_POINTS.small;
        case DEVICE_NAMES.md:
            return width < BREAK_POINTS.large && width >= BREAK_POINTS.medium;
        case DEVICE_NAMES.lg:
            return width < BREAK_POINTS.xlarge && width >= BREAK_POINTS.large;
        case DEVICE_NAMES.xl:
            return width >= BREAK_POINTS.xlarge;
        default:
            LOGGER('device name is important');
            return false;
    }
}

export function isDEVICE_GREATERTHAN(name){
    let width = window.innerWidth;

    return (name === DEVICE_NAMES.xs) ||
        (name === DEVICE_NAMES.sm && width >= BREAK_POINTS.small) ||
        (name === DEVICE_NAMES.md && width >= BREAK_POINTS.medium) ||
        (name === DEVICE_NAMES.lg && width >= BREAK_POINTS.large) ||
        (name === DEVICE_NAMES.xl && width >= BREAK_POINTS.xlarge);

}

export function isDEVICE_NAME() {
    let width = window.innerWidth;

    if (width < BREAK_POINTS.small) {
        return DEVICE_NAMES.xs;
    } else if (width < BREAK_POINTS.medium) {
        return DEVICE_NAMES.sm;
    } else if (width < BREAK_POINTS.large) {
        return DEVICE_NAMES.md;
    } else if (width < BREAK_POINTS.xlarge) {
        return DEVICE_NAMES.lg;
    } else if (width >= BREAK_POINTS.xlarge) {
        return DEVICE_NAMES.xl;
    }  else {
        LOGGER('isDEVICE_NAME : have some issue');
        return false;
    }
}

/**
 * Trigger event will help to observable.
 * @param el
 * @param type
 */
export function triggerEvent(el, type){
    if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE 8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on'+e.eventType, e);
    }
}


















