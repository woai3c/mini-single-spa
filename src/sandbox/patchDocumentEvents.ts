/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getCurrentAppName } from '../utils/application'
import { originalDocument, originalDocumentAddEventListener, originalDocumentRemoveEventListener } from '../utils/originalEnv'

type eventMap = Map<string, { listener: any, options: any }[]>
type onEventMap = Map<string, EventListenerOrEventListenerObject>

// 所有子应用绑定到 document 上的事件
export const documentEventMap = new Map<string, eventMap>()
// 所有子应用 document onxxx 事件集合
export const onDocumentEventMap = new Map<string, onEventMap>()

documentEventMap.set('global', new Map())
export function patchDocumentEvents() {
    originalDocument.addEventListener = function addEventListener(
        type: string, 
        listener: EventListenerOrEventListenerObject, 
        options?: boolean | AddEventListenerOptions | undefined,
    ) {
        const appName = getCurrentAppName()
        let curMap: eventMap = new Map()
        if (appName) {
            if (!documentEventMap.get(appName)) {
                curMap = new Map()
                documentEventMap.set(appName, curMap)
            }
        } else {
            curMap = documentEventMap.get('global')!
        }

        if (!curMap.get(type)) {
            curMap.set(type, [])
        }
    
        curMap.get(type)?.push({ listener, options })
        return originalDocumentAddEventListener.call(originalDocument, type, listener, options)
    }
    
    originalDocument.removeEventListener = function removeEventListener(
        type: string, 
        listener: EventListenerOrEventListenerObject, 
        options?: boolean | AddEventListenerOptions | undefined,
    ) {
        const appName = getCurrentAppName()
        let curMap: eventMap = new Map()
        if (appName) {
            curMap = documentEventMap.get(appName)!
        } else {
            curMap = documentEventMap.get('global')!
        }

        if (!curMap) return

        const arr = curMap.get(type) || []
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].listener === listener) {
                arr.splice(i, 1)
                break
            }
        }
    
        return originalDocumentRemoveEventListener.call(originalDocument, type, listener, options)
    }
}

export function releaseAppDocumentEvents(appName: string) {
    const curMap = documentEventMap.get(appName)!
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