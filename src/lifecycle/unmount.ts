import { isPromise } from 'src/utils/utils'
import { Application, AppStatus } from '../types'

export default function unMountApp(app: Application): Promise<any> {
    app.status = AppStatus.BEFORE_UNMOUNT

    let result = (app as any).unmount({ props: app.props, container: app.container })
    if (!isPromise(result)) {
        result = Promise.resolve(result)
    }
    
    return result
    .then(() => {
        app.status = AppStatus.UNMOUNTED
    })
    .catch((err: Error) => {
        app.status = AppStatus.UNMOUNT_ERROR
        throw err
    })
}