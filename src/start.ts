import { loadApps } from './application/apps'
import GlobalState from './globalState/GlobalState'
import { originalWindow } from './utils/originalEnv'
import { isInBrowser } from './utils/utils'

let isStarted = false
export default function start() {
    if (!isInBrowser()) {
        throw Error('mini-single-spa must be running in browser!')
    }

    if (!isStarted) {
        originalWindow.spaGlobalState = new GlobalState()
        isStarted = true
        loadApps()
    }
}

export function isStart() {
    return isStarted
}