import { isPromise } from 'src/utils/utils'
import parseHTMLandloadSources from 'src/utils/parseHTMLandloadSources'
import { Application, AppStatus } from '../types'

export default async function bootstrapApp(app: Application) {
    try {
        // 加载 js css
        await parseHTMLandloadSources(app.pageEntry as string)
    } catch (error) {
        throw error
    }
    
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