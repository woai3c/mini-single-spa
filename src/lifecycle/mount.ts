import { addStyles } from '../utils/dom'
import { Application, AppStatus } from '../types'
import { isSandboxEnabled, triggerAppHook } from '../utils/application'

export default function mountApp(app: Application): Promise<any> {
    triggerAppHook(app, 'beforeMount', AppStatus.BEFORE_MOUNT)
    app.container.setAttribute('single-spa-name', app.name)
    
    if (!app.isFirstLoad) {
        if (isSandboxEnabled(app)) {
            // 重新加载子应用时恢复快照
            app.sandbox.restoreWindowSnapshot()
            app.sandbox.start()
        }
        
        app.container.innerHTML = app.pageBody
        addStyles(app.styles)
    } else {
        app.isFirstLoad = false
    }

    const result = (app as any).mount({ props: app.props, container: app.container })

    return Promise.resolve(result)
    .then(() => {
        triggerAppHook(app, 'mounted', AppStatus.MOUNTED)
    })
    .catch((err: Error) => {
        app.status = AppStatus.MOUNT_ERROR
        throw err
    })
}