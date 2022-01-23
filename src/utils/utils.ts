export function isPromise(fn: any) {
    if ((typeof fn === 'object' || typeof fn === 'function') && typeof fn.then === 'function') {
        return true
    }
}

export function $(selector: string) {
    return document.querySelector(selector)
}