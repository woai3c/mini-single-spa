import { AnyObject } from '../types'

// 常用的一些事件集合
export const onEventTypes = [
    'click',
    'scroll',
    'error',
    'load',
    'unload',
    'abort',
    'keydown',
    'keyup',
    'keypress',
    'message',
    'mousedown',
    'mouseup',
    'mousemove',
    'mouseenter',
    'mouseout',
    'mouseover',
    'mouseleave',
    'mousewheel',
    'online',
    'offline',
    'reset',
    'resize',
    'storage',
    'submit',
    'pagehide',
    'pageshow',
    'hashchange',
    'popstate',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerrawupdate',
    'pointerup',
    'popstate',
    'progress',
]

export function createElement(tag: string, attrs?: AnyObject) {
    const node = document.createElement(tag)
    attrs && Object.keys(attrs).forEach(key => {
        node.setAttribute(key, attrs[key])
    })

    return node
}

export function removeNode(node: Node) {
    node.parentNode?.removeChild(node)
}

const head = document.head
export function addStyles(styles: string[] | HTMLStyleElement[]) {
    styles.forEach(item => {
        if (typeof item === 'string') {
            const node = createElement('style', {
                type: 'text/css',
                textContent: item,
            })

            head.appendChild(node)
        } else {
            head.appendChild(item)
        }
    })
}

export function removeStyles(name: string) {
    const styles = document.querySelectorAll(`style[micro-app-name="${name}"]`)
    styles.forEach(style => {
        removeNode(style)
    })

    return styles as unknown as HTMLStyleElement[]
}

// unique element
export function isUniqueElement(key: string): boolean {
    return /^body$/i.test(key) || /^head$/i.test(key) || /^html$/i.test(key)
}