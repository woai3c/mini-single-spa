import { isPromise } from 'src/utils/utils'
import { Application, AppStatus } from '../types'

export default function unMountApp(app: Application): Promise<any> {
    app.status = AppStatus.BEFORE_UNMOUNT

    let result = (app as any).unmount(app.customProps)
    if (!isPromise(result)) {
        result = Promise.resolve(result)
    }
    
    return result.then(() => {
        app.observer?.disconnect()
        app.observer = null
        removeStyles(app)
        app.status = AppStatus.UNMOUNTED
    })
}

function removeStyles(app: Application) {
    const result: HTMLStyleElement[] = []
    app.loadedStyle?.forEach(style => {
        const clone = style.cloneNode(true)
        result.push(clone as HTMLStyleElement)
        style.parentNode?.removeChild(style)
    })

    app.loadedStyle = result
}