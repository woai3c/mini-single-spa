import { Application, AppStatus } from '../types'

export default function unMountApp(app: Application): Promise<any> {
    app.status = AppStatus.BEFORE_UNMOUNT
    return (app as any).unmount(app.customProps || {}).then(() => {
        app.status = AppStatus.UNMOUNTED
    })
}