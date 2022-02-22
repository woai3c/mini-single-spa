import { getApp, getCurrentAppName, isActive } from 'src/utils/application'
import { isFunction } from 'src/utils/utils'
import { Application, AppStatus } from '../types'

type Callback = (...args: any) => void

export default class EventBus {
    private eventsMap: Map<string, Record<string, Array<Callback>>> = new Map()

    on(event: string, callback: Callback) {
        if (!isFunction(callback)) {
            throw Error(`The second param ${typeof callback} is not a function`)
        }

        const appName = getCurrentAppName() || 'parent'

        const { eventsMap } = this
        if (!eventsMap.get(appName)) {
            eventsMap.set(appName, {})
        }

        const events = eventsMap.get(appName)!
        if (!events[event]) {
            events[event] = [] 
        }

        events[event].push(callback)
    }

    off(event: string, callback: Callback) {
        const appName = getCurrentAppName() || 'parent'

        const { eventsMap } = this
        const events = eventsMap.get(appName)
        if (!events) return
        if (!events[event]) return

        if (callback) {
            const cbs = events[event]
            let l = cbs.length
            while (l--) {
                if (callback == cbs[l]) {
                    cbs.splice(l, 1)
                }
            }
        } else {
            events[event] = []
        }
    }

    emit(event: string, ...args: any) {
        this.eventsMap.forEach((events, appName) => {
            /**
             * 如果是点击其他子应用或父应用触发全局数据变更，则当前打开的子应用获取到的 app 为 null
             * 所以需要改成用 activeRule 来判断当前子应用是否运行
             */
            const app = getApp(appName) as Application
            if (appName === 'parent' || (isActive(app) && app.status === AppStatus.MOUNTED)) {
                if (events[event]?.length) {
                    for (const callback of events[event]) {
                        callback.call(this, ...args)
                    }
                }
            }
        })
    }

    once(event: string, callback: Callback) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this

        function wrap(...args: any) {
            callback.call(self, ...args)
            self.off(event, wrap)
        }

        this.on(event, wrap)
    }

    clearEventsByAppName(appName: string) {
        this.eventsMap.set(appName, {})
    }
}