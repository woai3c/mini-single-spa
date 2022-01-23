import parseHTMLandloadSources from 'src/utils/parseHTMLandloadSources'
import { isPromise } from 'src/utils/utils'
import { AnyObject, Application, AppStatus } from '../types'
import { createMutationObserver } from '../utils/observer'

export default async function bootstrapApp(app: Application) {
    app.observer = createMutationObserver(app)

    try {
        // 加载 js css
        await parseHTMLandloadSources(app.pageEntry as string)
    } catch (error) {
        throw error
    }
    
    const { bootstrap, mount, unmount } = await app.loadApp()

    validateLifeCycleFunc('bootstrap', bootstrap)
    validateLifeCycleFunc('mount', mount)
    validateLifeCycleFunc('unmount', unmount)

    app.bootstrap = bootstrap
    app.mount = mount
    app.unmount = unmount
    app.customProps = await getProps(app.customProps)
    
    let result = (app as any).bootstrap(app.customProps)
    if (!isPromise(result)) {
        result = Promise.resolve(result)
    }
    
    return result.then(() => {
        app.status = AppStatus.BOOTSTRAPPED
    })
}

async function getProps(props: Function | AnyObject) {
    if (typeof props === 'function') return props()
    if (typeof props === 'object') return props
    return {}
}

function validateLifeCycleFunc(name: string, fn: any) {
    if (typeof fn !== 'function') {
        throw Error(`The "${name}" must be a function`)
    }
}