import { loadApps } from '../application/apps'
import { originalPushState, originalReplaceState, originalWindow, originalWindowAddEventListener } from './originalEnv'

export default function overwriteEventsAndHistory() {
    originalWindow.history.pushState = function (state: any, title: string, url: string) {
        const result = originalPushState.call(this, state, title, url)
        loadApps()
        return result
    }
    
    originalWindow.history.replaceState = function (state: any, title: string, url: string) {
        const result = originalReplaceState.call(this, state, title, url)
        loadApps()
        return result
    }
    
    originalWindowAddEventListener.call(originalWindow, 'popstate', () => {
        loadApps()
    }, true)
    
    originalWindowAddEventListener.call(originalWindow, 'hashchange', () => {
        loadApps()
    }, true)
}
