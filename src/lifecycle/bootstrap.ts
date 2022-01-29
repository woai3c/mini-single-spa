import { isPromise } from 'src/utils/utils'
import { AnyObject, Application, AppStatus } from '../types'

export default async function bootstrapApp(app: Application) {    
    const { bootstrap, mount, unmount } = await app.loadApp()

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

    let result = (app as any).bootstrap(app.props)
    if (!isPromise(result)) {
        result = Promise.resolve(result)
    }
    
    return result
    .then(() => {
        app.status = AppStatus.BOOTSTRAPPED
    })
    .catch((err: Error) => {
        app.status = AppStatus.BOOTSTRAP_ERROR
        throw err
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