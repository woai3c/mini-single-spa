import { AnyObject, Application, AppStatus } from '../types'
import { getApp, getCurrentAppName, isActive } from '../utils/application'
import EventBus from './EventBus'

type Callback = (state: AnyObject, operator: string, key?: string) => void

export default class GlobalState extends EventBus {
    private state: AnyObject = {}
    private stateChangeCallbacksMap: Map<string, Array<Callback>> = new Map()

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
        this.stateChangeCallbacksMap.clear()
        this.emitChange('clear')
    }

    onChange(callback: Callback) {
        const appName = getCurrentAppName()
        if (!appName) return

        const { stateChangeCallbacksMap } = this
        if (!stateChangeCallbacksMap.get(appName)) {
            stateChangeCallbacksMap.set(appName, [])
        }

        stateChangeCallbacksMap.get(appName)?.push(callback)
    }

    emitChange(operator: string, key?: string) {
        this.stateChangeCallbacksMap.forEach((callbacks, appName) => {
            /**
             * 如果是点击其他子应用或父应用触发全局数据变更，则当前打开的子应用获取到的 app 为 null
             * 所以需要改成用 activeRule 来判断当前子应用是否运行
             */
            const app = getApp(appName) as Application
            if (!(isActive(app) && app.status === AppStatus.MOUNTED)) return
            callbacks.forEach(callback => callback(this.state, operator, key))
        })
    }

    clearGlobalStateByAppName(appName: string) {
        this.stateChangeCallbacksMap.set(appName, [])
        this.clearEventsByAppName(appName)
    }
}
