import { isPromise } from 'src/utils'
import { Application, AppStatus } from '../types'

export default async function bootstrapApp(app: Application) {
    const { bootstrap, mount, unmount } = await app.loadApp()
    
    if (isPromise(bootstrap) && isPromise(mount) && isPromise(unmount)) {
        throw Error('The lifecycle function must be a Promise')
    }

    app.bootstrap = bootstrap
    app.mount = mount
    app.unmount = unmount
    
    return (app as any).bootstrap().then(() => {
        app.status = AppStatus.BOOTSTRAPPED
    })
}