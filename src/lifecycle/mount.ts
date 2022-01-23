import { isPromise } from 'src/utils/utils'
import { Application, AppStatus } from '../types'
import { createMutationObserver } from '../utils/observer'
import { $ } from '../utils/utils'

export default function mountApp(app: Application): Promise<any> {
    // 是否首次加载应用
    const isFirstLoad = app.status === AppStatus.BOOTSTRAPPED
    if (!isFirstLoad) {
        addStyles(app)
        app.observer = createMutationObserver(app)
    }
    
    app.status = AppStatus.BEFORE_MOUNT
    let result = (app as any).mount(app.customProps)
    if (!isPromise(result)) {
        result = Promise.resolve(result)
    }
    
    return result.then(() => {
        app.status = AppStatus.MOUNTED
    })
}

const head = $('head')!
function addStyles(app: Application) {
    app.loadedStyle?.forEach(style => {
        head.appendChild(style)
    })
}