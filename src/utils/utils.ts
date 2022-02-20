import { originalDocument, originalWindow } from './originalEnv'

export function isPromise(fn: any) {
    if ((isObject(fn) || isFunction(fn)) && isFunction(fn.then)) {
        return true
    }

    return false
}

export function isObject(obj: any) {
    return obj !== null && typeof obj === 'object'
}

export function isFunction(fn: any) {
    return typeof fn === 'function'
}

export function $(selector: string) {
    return document.querySelector(selector)
}

export function nextTick(callback: () => void) {
    Promise.resolve().then(callback)
}

export function isInBrowser() {
    return typeof originalWindow === 'object' && typeof originalDocument === 'object'
}