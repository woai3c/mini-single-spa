import bootstrapApp from '../lifecycle/bootstrap'
import mountApp from '../lifecycle/mount'
import unMountApp from '../lifecycle/unmount'
import { Application, AppStatus } from '../types'

export const apps: Application[] = []

export async function loadApps() {
    const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED)
    await Promise.all(toUnMountApp.map(unMountApp))
    
    const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP)
    await Promise.all(toLoadApp.map(bootstrapApp))

    const toMountApp = [
        ...getAppsWithStatus(AppStatus.BOOTSTRAPPED),
        ...getAppsWithStatus(AppStatus.UNMOUNTED),
    ]
    
    await toMountApp.map(mountApp)
}

function getAppsWithStatus(status: AppStatus) {
    const result: Application[] = []
    apps.forEach(app => {
        // tobootstrap or tomount
        if (isActive(app) && app.status === status) {
            switch (app.status) {
                case AppStatus.BEFORE_BOOTSTRAP:
                case AppStatus.BOOTSTRAPPED:
                case AppStatus.UNMOUNTED:
                    result.push(app)
                    break
            }
        } else if (app.status === AppStatus.MOUNTED && status === AppStatus.MOUNTED) {
            // tounmount
            result.push(app)
        }
    })

    return result
}

function isActive(app: Application) {
    return typeof app.activeRule === 'function' && app.activeRule(window.location)
}