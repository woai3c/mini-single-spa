/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import deepCopy from '../utils/deepCopy'
import { Application, MicroWindow } from '../types'
import { temporarySetCurrentAppName } from '../utils/application'
import { isFunction } from '../utils/utils'
import { patchDocument, releaseDocument } from './patchDocument'
import { documentEventMap, patchDocumentEvents, releaseAppDocumentEvents, releaseDocumentEvents } from './patchDocumentEvents'
import { getEventTypes } from '../utils/dom'
import { 
    originalWindowAddEventListener,
    originalWindowRemoveEventListener,
    originalDocument, 
    originalEval, 
    originalWindow,
    originalDocumentAddEventListener,
    originalDefineProperty,
} from '../utils/originalEnv'

/**
 * js 沙箱，用于隔离子应用 window 作用域
 */
export default class Sandbox {
    // 当前存活的子应用数量
    static activeCount = 0;
    // 子应用 window 的代理对象
    public proxyWindow: MicroWindow = {}
    // 子应用 window 对象
    public microAppWindow: MicroWindow = {}
    // 子应用名称
    private appName = ''
    // 记录子应用第一次 mount() 前的 window 快照
    private windowSnapshot = new Map<string | symbol, Map<string | symbol, any>>()
    // 子应用是否激活
    private active = false
    // 子应用向 window 注入的 key
    private injectKeySet = new Set<string | symbol>()
    // 子应用 setTimeout 集合，退出子应用时清除
    private timeoutSet = new Set<number>()
    // 子应用 setInterval 集合，退出子应用时清除
    private intervalSet = new Set<number>()
    // 子应用 requestIdleCallback 集合，退出子应用时清除
    private idleSet = new Set<number>()
    // 子应用绑定到 window 上的事件，退出子应用时清除
    private windowEventMap = new Map<string | symbol, { listener: any, options: any }[]>()
    // 子应用 window onxxx 事件集合，退出子应用时清除
    private onWindowEventMap = new Map<string, EventListenerOrEventListenerObject>()

    constructor(app: Application) {
        // 代理了 window、document 的 addEventListener 和 window.onxxx 事件
        this.windowSnapshot.set('attrs', new Map<string | symbol, any>())
        this.windowSnapshot.set('windowEvents', new Map<string | symbol, any>())
        this.windowSnapshot.set('onWindowEvents', new Map<string | symbol, any>())
        this.windowSnapshot.set('documentEvents', new Map<string | symbol, any>())

        this.appName = app.name
        this.hijackProperties()
        this.proxyWindow = this.createProxyWindow(app.name)
    }

    /**
     * 开启沙箱 
     */
    start() {
        if (this.active) return

        this.active = true
        // 如果当前子应用为第一个
        if (++Sandbox.activeCount === 1) {
            patchDocument()
            patchDocumentEvents()
        }
    }

    /**
     * 关闭沙箱
     */
    stop() {
        if (!this.active) return
        this.active = false

        const { 
            injectKeySet,
            microAppWindow,
            timeoutSet,
            intervalSet,
            idleSet,
            windowEventMap,
            onWindowEventMap,
        } = this

        for (const key of injectKeySet) {
            Reflect.deleteProperty(microAppWindow, key as (string | symbol))
        }

        for (const timer of timeoutSet) {
            originalWindow.clearTimeout(timer)
        }

        for (const timer of intervalSet) {
            originalWindow.clearInterval(timer)
        }

        for (const timer of idleSet) {
            originalWindow.cancelIdleCallback(timer)
        }
        
        for (const [type, arr] of windowEventMap) {
            for (const item of arr) {
                originalWindowRemoveEventListener.call(originalWindow, type as string, item.listener, item.options)
            }
        }

        getEventTypes().forEach(eventType => {
            const fn = onWindowEventMap.get(eventType) as EventListenerOrEventListenerObject
            fn && originalWindowRemoveEventListener.call(
                originalWindow, 
                eventType, 
                fn,
            )
        })

        timeoutSet.clear()
        intervalSet.clear()
        idleSet.clear()
        injectKeySet.clear()
        windowEventMap.clear()
        onWindowEventMap.clear()
        releaseAppDocumentEvents(this.appName)

        // 如果所有的子应用都已卸载
        if (--Sandbox.activeCount === 0) {
            releaseDocument()
            releaseDocumentEvents()
        }
    }

    /**
     * 记录子应用快照
     */
    recordWindowSnapshot() {
        const { windowSnapshot, microAppWindow } = this
        const recordAttrs = windowSnapshot.get('attrs')!
        const recordWindowEvents = windowSnapshot.get('windowEvents')!
        const recordOnWindowEvents = windowSnapshot.get('onWindowEvents')!
        const recordDocumentEvents = windowSnapshot.get('documentEvents')!
        
        this.injectKeySet.forEach(key => {
            recordAttrs.set(key, deepCopy(microAppWindow[key]))
        })
        
        this.windowEventMap.forEach((arr, type) => {
            recordWindowEvents.set(type, deepCopy(arr))
        })

        this.onWindowEventMap.forEach((func, type) => {
            recordOnWindowEvents.set(type, func)
        })
        
        documentEventMap.get(this.appName)?.forEach((arr: any[], type: string) => {
            recordDocumentEvents.set(type, deepCopy(arr))
        })
    }

    /**
     * 恢复子应用快照
     */
    restoreWindowSnapshot() {
        const { 
            windowSnapshot, 
            injectKeySet, 
            microAppWindow, 
            windowEventMap, 
            onWindowEventMap,
        } = this
        const recordAttrs = windowSnapshot.get('attrs')!
        const recordWindowEvents = windowSnapshot.get('windowEvents')!
        const recordOnWindowEvents = windowSnapshot.get('onWindowEvents')!
        const recordDocumentEvents = windowSnapshot.get('documentEvents')!
        
        recordAttrs.forEach((value, key) => {
            injectKeySet.add(key)
            microAppWindow[key] = deepCopy(value)
        })
        
        recordWindowEvents.forEach((arr, type) => {
            windowEventMap.set(type, deepCopy(arr))
            for (const item of arr) {
                originalWindowAddEventListener.call(originalWindow, type as string, item.listener, item.options)
            }
        })

        recordOnWindowEvents.forEach((func, type) => {
            onWindowEventMap.set(type as string, func)
            originalWindowAddEventListener.call(originalWindow, type as string, func)
        })

        const curMap = documentEventMap.get(this.appName)!
        recordDocumentEvents.forEach((arr, type) => {
            curMap.set(type as string, deepCopy(arr))
            for (const item of arr) {
                originalDocumentAddEventListener.call(originalDocument, type as string, item.listener, item.options)
            }
        })
    }

    /**
     * 劫持 window 属性
     */
    hijackProperties() {
        const { 
            microAppWindow,
            intervalSet, 
            timeoutSet,
            idleSet,
            windowEventMap,
            onWindowEventMap,
        } = this
        
        microAppWindow.setInterval = function setInterval(callback: Function, timeout?: number | undefined, ...args: any[]): number {
            const timer = originalWindow.setInterval(callback, timeout, ...args)
            this.intervalSet.add(timer)
            return timer
        }
    
        microAppWindow.clearInterval = function clearInterval(timer?: number): void {
            if (timer === undefined) return
            originalWindow.clearInterval(timer)
            intervalSet.delete(timer)
        }
        
        microAppWindow.setTimeout = function setTimeout(callback: Function, timeout?: number | undefined, ...args: any[]): number {
            const timer = originalWindow.setTimeout(callback, timeout, ...args)
            timeoutSet.add(timer)
            return timer
        }
    
        microAppWindow.clearTimeout = function clearTimeout(timer?: number): void {
            if (timer === undefined) return
            originalWindow.clearTimeout(timer)
            timeoutSet.delete(timer)
        }
    
        microAppWindow.requestIdleCallback = function requestIdleCallback(
            callback: (options: any) => any, 
            options?: { timeout: number },
        ): number {
            const timer = originalWindow.requestIdleCallback(callback, options)
            idleSet.add(timer)
            return timer
        }
    
        microAppWindow.cancelIdleCallback = function cancelIdleCallback(timer?: number): void {
            if (timer === undefined) return
            originalWindow.cancelIdleCallback(timer)
            idleSet.delete(timer)
        }

        microAppWindow.addEventListener = function addEventListener(
            type: string, 
            listener: EventListenerOrEventListenerObject, 
            options?: boolean | AddEventListenerOptions | undefined,
        ) {
            if (!windowEventMap.get(type)) {
                windowEventMap.set(type, [])
            }

            windowEventMap.get(type)?.push({ listener, options })
            return originalWindowAddEventListener.call(originalWindow, type, listener, options)
        }

        microAppWindow.removeEventListener = function removeEventListener(
            type: string, 
            listener: EventListenerOrEventListenerObject, 
            options?: boolean | AddEventListenerOptions | undefined,
        ) {
            const arr = windowEventMap.get(type) || []
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].listener === listener) {
                    arr.splice(i, 1)
                    break
                }
            }

            return originalWindowRemoveEventListener.call(originalWindow, type, listener, options)
        }

        microAppWindow.eval = originalEval
        microAppWindow.document = originalDocument
        microAppWindow.originalWindow = originalWindow
        microAppWindow.window = microAppWindow

        // 劫持 window.onxxx 事件
        getEventTypes().forEach(eventType => {
            originalDefineProperty(microAppWindow, `on${eventType}`, {
                configurable: true,
                enumerable: true,
                get() {
                    return onWindowEventMap.get(eventType)
                },
                set(val) {
                    onWindowEventMap.set(eventType, val)
                    originalWindowAddEventListener.call(originalWindow, eventType, val)
                },
            })
        })
    }
    
    /**
     * 创建 window 代理对象
     */
    createProxyWindow(appName: string) {
        const descriptorMap = new Map<string | symbol, 'target' | 'originalWindow'>()
        return new Proxy(this.microAppWindow, {
            get(target, key) {
                temporarySetCurrentAppName(appName)
                if (Reflect.has(target, key)) {
                    return Reflect.get(target, key)
                }
                
                const result = originalWindow[key]
                // window 原生方法的 this 指向必须绑在 window 上运行，否则会报错 "TypeError: Illegal invocation"
                // e.g: const obj = {}; obj.alert = alert;  obj.alert();
                return (isFunction(result) && needToBindOriginalWindow(result)) ? result.bind(window) : result
            },

            set: (target, key, value) => {
                if (!this.active) return true
                
                this.injectKeySet.add(key)
                return Reflect.set(target, key, value)
            },

            has(target, key) {
                temporarySetCurrentAppName(appName)
                return key in target || key in originalWindow
            },

            // Object.keys(window)
            // Object.getOwnPropertyNames(window)
            // Object.getOwnPropertySymbols(window)
            // Reflect.ownKeys(window)
            ownKeys(target) {
                temporarySetCurrentAppName(appName)
                const result = Reflect.ownKeys(target).concat(Reflect.ownKeys(originalWindow))
                return Array.from(new Set(result))
            },

            deleteProperty: (target, key) => {
                this.injectKeySet.delete(key)
                return Reflect.deleteProperty(target, key)
            },

            // Object.getOwnPropertyDescriptor(window, key)
            // Reflect.getOwnPropertyDescriptor(window, key)
            getOwnPropertyDescriptor(target, key) {
                // 为什么不使用 Reflect.getOwnPropertyDescriptor() 
                // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
                if (Reflect.has(target, key)) {
                    // 这里的作用是保证在获取（Object.getOwnPropertyDescriptor）和设置（Object.defineProperty）一个 key 的 descriptor 时，都操作的是同一个对象
                    // 即都操作 proxyWindow 或 originalWindow，否则会报错 
                    descriptorMap.set(key, 'target')
                    return Object.getOwnPropertyDescriptor(target, key)
                }

                if (Reflect.has(originalWindow, key)) {
                    descriptorMap.set(key, 'originalWindow')
                    return Object.getOwnPropertyDescriptor(originalWindow, key)
                }
            },

            // Object.defineProperty(window, key, Descriptor)
            defineProperty: (target, key, value) => {
                if (!this.active) return true

                if (descriptorMap.get(key) === 'target') {
                    return Reflect.defineProperty(target, key, value)
                }

                return Reflect.defineProperty(originalWindow, key, value)
            },
            
            // 返回真正的 window 原型
            getPrototypeOf() {
                return Reflect.getPrototypeOf(originalWindow)
            },
        })
    }
}

// 构造函数、类、或使用 call() bind() apply() 绑定了作用域的函数都需要绑定到原始 window 上
export function needToBindOriginalWindow(fn: Function) {
    if (
        fn.toString().startsWith('class')
        || isBoundFunction(fn)
        || (/^[A-Z][\w_]+$/.test(fn.name) && fn.prototype?.constructor === fn)
    ) {
        return false
    }

    return true
}

export function isBoundFunction(fn: Function) {
    return fn?.name?.startsWith('bound ')
}