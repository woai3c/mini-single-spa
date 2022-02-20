import { Application, AppStatus } from '../types'
import { appMaps } from '../utils/application'

export default function registerApplication(app: Application) {
    if (typeof app.activeRule === 'string') {
        const path = app.activeRule
        app.activeRule = (location = window.location) => location.pathname === path
    }

    app = {
        ...app,
        status: AppStatus.BEFORE_BOOTSTRAP,
        pageBody: '',
        loadedURLs: [],
        scripts: [],
        styles: [],
        isFirstLoad: true,
    }

    if (!app.sandboxConfig) {
        app.sandboxConfig = {
            enabled: true,
            css: false,
        }
    }
    
    appMaps.set(app.name, app)
}