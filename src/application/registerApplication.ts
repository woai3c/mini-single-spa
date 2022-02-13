import { Application, AppStatus } from '../types'
import { appMaps } from '../utils/application'

export default function registerApplication(app: Application) {
    if (typeof app.activeRule === 'string') {
        const path = app.activeRule
        app.activeRule = (location = window.location) => location.pathname === path
    }

    app.status = AppStatus.BEFORE_BOOTSTRAP
    app.pageBody = ''
    app.loadedURLs = []
    app.scripts = []
    app.styles = []
    app.isFirstLoad = true
    
    appMaps.set(app.name, app)
}