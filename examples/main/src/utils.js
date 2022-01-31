export function $(selector) {
    return document.querySelector(selector)
}

export function pathPrefix(prefix) {
    return function(location) {
        return location.pathname.indexOf(`${prefix}`) === 0;
    }
}