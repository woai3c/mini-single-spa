import { Application, AppStatus } from '../types'
import { originalWindow } from './originalEnv'
import { isFunction, nextTick } from './utils'

export const appMaps = new Map<string, Application>()

let currentAppName: null | string = null
export function getCurrentAppName() {
    return currentAppName
}

export function getCurrentApp() {
    return (currentAppName && appMaps.get(currentAppName)) || null
}

export function temporarySetCurrentAppName(name: string | null) {
    if (currentAppName !== name) {
        currentAppName = name
        // eslint-disable-next-line no-return-assign
        nextTick(() => currentAppName = null)
    }
}

export function setCurrentAppName(name: string | null) {
    currentAppName = name
}

export function getApp(name: string) {
    return appMaps.get(name)
}

export function triggerAppHook<K extends keyof Application>(app: Application, hook: K, status: AppStatus) {
    app.status = status
    if (isFunction(app[hook])) {
        // @ts-ignore
        app[hook]()
    }
}

export function isSandboxEnabled(app: Application) {
    return app.sandboxConfig.enabled
}

// 当前子应用的激活规则是否和 url 是否匹配
export function isActive(app: Application) {
    return isFunction(app.activeRule) && (app.activeRule as Function)(originalWindow.location)
}