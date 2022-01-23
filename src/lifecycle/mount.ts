import { isPromise } from 'src/utils/utils'
import { Application, AppStatus } from '../types'

export default function mountApp(app: Application): Promise<any> {
    app.status = AppStatus.BEFORE_MOUNT
    let result = (app as any).mount(app.customProps)
    if (!isPromise(result)) {
        result = Promise.resolve(result)
    }
    
    return result.then(() => {
        app.status = AppStatus.MOUNTED
    })
}