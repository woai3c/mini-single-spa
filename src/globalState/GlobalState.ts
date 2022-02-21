import { AnyObject, Application } from '../types'
import { getApp, getCurrentAppName, isActive } from '../utils/application'
import EventBus from './EventBus'

export default class GlobalState extends EventBus {
    private state: AnyObject = {}
    private callbacksMap: Map<string, Array<(state: AnyObject, operator: string, key?: string) => void>> = new Map()

    set(key: string, value: any) {
        this.state[key] = value
        this.emitChange('set', key)
    }

    get(key: string) {
        return this.state[key]
    }

    getAll() {
        return this.state
    }

    delete(key: string) {
        delete this.state[key]
        this.emitChange('delete', key)
    }

    clear() {
        this.state = {}
        this.callbacksMap.clear()
        this.emitChange('clear')
    }

    onChange(callback: (state: AnyObject, operator: string, key?: string) => void) {
        const appName = getCurrentAppName()
        if (!appName) return

        const { callbacksMap } = this
        if (!callbacksMap.get(appName)) {
            callbacksMap.set(appName, [])
        }

        callbacksMap.get(appName)?.push(callback)
    }

    emitChange(operator: string, key?: string) {
        this.callbacksMap.forEach((callbacks, appName) => {
            /**
             * 如果是点击其他子应用或父应用触发全局数据变更，则当前打开的子应用获取到的 app 为 null
             * 所以需要改成用 activeRule 来判断当前子应用是否运行
             */
            if (!isActive(getApp(appName) as Application)) return
            callbacks.forEach(callback => callback(this.state, operator, key))
        })
    }
}
