import Sandbox from '../sandbox/Sandbox'
import { addStyles } from '../utils/dom'
import { executeScripts, parseHTMLandLoadSources } from '../utils/source'
import { isFunction, isObject } from '../utils/utils'
import { AnyObject, Application, AppStatus } from '../types'
import { isSandboxEnabled, triggerAppHook } from '../utils/application'
import { originalWindow } from '../utils/originalEnv'

export default async function bootstrapApp(app: Application) {
    triggerAppHook(app, 'beforeBootstrap', AppStatus.BEFORE_BOOTSTRAP)

    try {
        // 加载 js css
        await parseHTMLandLoadSources(app)
    } catch (error) {
        app.status = AppStatus.BOOTSTRAP_ERROR
        throw error
    }

    // 开启沙箱
    if (isSandboxEnabled(app)) {
        app.sandbox = new Sandbox(app)
        app.sandbox.start()
    }
    
    app.container.innerHTML = app.pageBody

    // 执行子应用入口页面的 style script 标签
    addStyles(app.styles)
    executeScripts(app.scripts, app)
    
    const { mount, unmount } = await getLifeCycleFuncs(app)

    validateLifeCycleFunc('mount', mount)
    validateLifeCycleFunc('unmount', unmount)

    app.mount = mount
    app.unmount = unmount
    
    try {
        app.props = await getProps(app.props)
    } catch (err) {
        app.status = AppStatus.BOOTSTRAP_ERROR
        throw err
    }
    
    // 子应用首次加载的脚本执行完就不再需要了
    app.scripts.length = 0

    if (isSandboxEnabled(app)) {
        // 记录当前的 window 快照，重新挂载子应用时恢复
        app.sandbox.recordWindowSnapshot()
    }
    
    triggerAppHook(app, 'bootstrapped', AppStatus.BOOTSTRAPPED)
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
    let result = originalWindow.__SINGLE_SPA__
    if (isSandboxEnabled(app)) {
        result = app.sandbox.proxyWindow.__SINGLE_SPA__
    }
     
    if (isFunction(result)) {
        return result()
    }

    if (isObject(result)) {
        return result
    }

    // eslint-disable-next-line no-restricted-globals
    throw Error('The micro app must inject the lifecycle("bootstrap" "mount" "unmount") into window.__SINGLE_SPA__')
}