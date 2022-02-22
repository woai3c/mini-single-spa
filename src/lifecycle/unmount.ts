import { removeStyles } from '../utils/dom'
import { Application, AppStatus } from '../types'
import { isSandboxEnabled, triggerAppHook } from '../utils/application'
import { originalWindow } from 'src/utils/originalEnv'

export default function unMountApp(app: Application): Promise<any> {
    triggerAppHook(app, 'beforeUmount', AppStatus.BEFORE_UNMOUNT)
    const result = (app as any).unmount({ props: app.props, container: app.container })
    
    return Promise.resolve(result)
    .then(() => {
        if (isSandboxEnabled(app)) {
            app.sandbox.stop()
        }
        
        // 移除子应用样式
        app.styles = removeStyles(app.name)
        // 移除子应用的全局状态、事件
        originalWindow.spaGlobalState.clearGlobalStateByAppName(app.name)

        triggerAppHook(app, 'unmounted', AppStatus.UNMOUNTED)
    })
    .catch((err: Error) => {
        app.status = AppStatus.UNMOUNT_ERROR
        throw err
    })
}