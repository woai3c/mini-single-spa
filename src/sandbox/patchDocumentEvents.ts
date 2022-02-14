/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getCurrentAppName } from '../utils/application'
import { originalDocument, originalDocumentAddEventListener, originalDocumentRemoveEventListener } from '../utils/originalEnv'
import { isBoundFunction } from './Sandbox'

type eventMap = Map<string, { listener: any, options: any }[]>

// 所有子应用绑定到 document 上的事件
export const documentEventMap = new Map<string, eventMap>()

export function patchDocumentEvents() {
    originalDocument.addEventListener = function addEventListener(
        type: string, 
        listener: EventListenerOrEventListenerObject, 
        options?: boolean | AddEventListenerOptions | undefined,
    ) {
        const appName = getCurrentAppName()
        // react 16 会在第一次 mount() 时绑定 "bound dispatchDiscreteEvent()" 事件到 document 上，后续 mount() 不会重新绑定
        // 所以无需记录这种事件，也不需要移除，以免程序运行不正常
        if (appName && !isBoundFunction(listener as Function)) {
            let curMap = documentEventMap.get(appName)
            if (!curMap) {
                curMap = new Map()
                documentEventMap.set(appName, curMap)
            }

            if (!curMap.get(type)) {
                curMap.set(type, [])
            }
    
            curMap.get(type)?.push({ listener, options })
        }
        
        return originalDocumentAddEventListener.call(originalDocument, type, listener, options)
    }
    
    originalDocument.removeEventListener = function removeEventListener(
        type: string, 
        listener: EventListenerOrEventListenerObject, 
        options?: boolean | AddEventListenerOptions | undefined,
    ) {
        const appName = getCurrentAppName()
        if (appName && !isBoundFunction(listener as Function)) {
            const curMap = documentEventMap.get(appName)
            const arr = curMap?.get(type) || []
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].listener === listener) {
                    arr.splice(i, 1)
                    break
                }
            }
        }
    
        return originalDocumentRemoveEventListener.call(originalDocument, type, listener, options)
    }
}

export function releaseAppDocumentEvents(appName: string) {
    const curMap = documentEventMap.get(appName)
    if (!curMap) return
    
    for (const [type, arr] of curMap) {
        for (const item of arr) {
            originalDocumentRemoveEventListener.call(originalDocument, type as string, item.listener, item.options)
        }

        curMap.delete(type)
    }
}

export function releaseDocumentEvents() {
    originalDocument.addEventListener = originalDocumentAddEventListener
    originalDocument.removeEventListener = originalDocumentRemoveEventListener
}