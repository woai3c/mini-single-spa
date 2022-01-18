import { loadApps } from '../application/apps'

const originalPushState = window.history.pushState
const originalReplaceState = window.history.replaceState

export default function overwriteEventsAndHistory() {
    window.history.pushState = function (state: any, title: string, url: string) {
        const result = originalPushState.call(this, state, title, url)
        loadApps()
        return result
    }
    
    window.history.replaceState = function (state: any, title: string, url: string) {
        const result = originalReplaceState.call(this, state, title, url)
        loadApps()
        return result
    }
    
    window.addEventListener('popstate', () => {
        loadApps()
    }, true)
    
    window.addEventListener('hashchange', () => {
        loadApps()
    }, true)
}
