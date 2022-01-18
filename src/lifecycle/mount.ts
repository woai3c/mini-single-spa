import { Application, AppStatus } from '../types'

export default function mountApp(app: Application): Promise<any> {
    app.status = AppStatus.BEFORE_MOUNT
    return (app as any).mount(app.customProps || {}).then(() => {
        app.status = AppStatus.MOUNTED
    })
}