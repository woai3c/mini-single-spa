import Sandbox from '../sandbox/Sandbox'
import { addStyles } from '../utils/dom'
import { executeScripts, parseHTMLandLoadSources } from '../utils/source'
import { isFunction, isObject } from '../utils/utils'
import { AnyObject, Application, AppStatus } from '../types'
import { triggerAppHook } from 'src/utils/application'

export default async function bootstrapApp(app: Application) {
    triggerAppHook(app, 'beforeBootstrap', AppStatus.BEFORE_BOOTSTRAP)

    try {
        // 加载 js css
        await parseHTMLandLoadSources(app)
    } catch (error) {
        app.status = AppStatus.BOOTSTRAP_ERROR
        throw error
    }

    app.sandbox = new Sandbox(app)
    app.sandbox.start()
    app.container.innerHTML = app.pageBody
    addStyles(app.styles)
    executeScripts(app.scripts, app)
    
    const { bootstrap, mount, unmount } = await getLifeCycleFuncs(app)

    validateLifeCycleFunc('bootstrap', bootstrap)
    validateLifeCycleFunc('mount', mount)
    validateLifeCycleFunc('unmount', unmount)

    app.bootstrap = bootstrap
    app.mount = mount
    app.unmount = unmount
    
    try {
        app.props = await getProps(app.props)
    } catch (err) {
        app.status = AppStatus.BOOTSTRAP_ERROR
        throw err
    }
    
    const result = (app as any).bootstrap({ props: app.props, container: app.container })

    return Promise.resolve(result)
    .then(() => {
        // 子应用首次加载的脚本执行完就不再需要了
        app.scripts.length = 0
        // 记录当前的 window 快照，重新挂载子应用时恢复
        app.sandbox.recordWindowSnapshot()
        
        triggerAppHook(app, 'bootstrapped', AppStatus.BOOTSTRAPPED)
    })
    .catch((err: Error) => {
        app.status = AppStatus.BOOTSTRAP_ERROR
        throw err
    })
}

async function getProps(props: AnyObject | (() => AnyObject)) {
    if (isFunction(props)) return (props as () => AnyObject)()
    if (isObject(props)) return props
    return {}
}

function validateLifeCycleFunc(name: string, fn: any) {
    if (!isFunction(fn)) {
        throw Error(`The "${name}" must be a function`)
    }
}

async function getLifeCycleFuncs(app: Application) {
    const result = app.sandbox.proxyWindow.__MICRO_APP__
    if (isFunction(result)) {
        return result()
    }

    if (isObject(result)) {
        return result
    }

    // eslint-disable-next-line no-restricted-globals
    throw Error('The micro app must inject the lifecycle("bootstrap" "mount" "unmount") into window.__MICRO_APP__')
}