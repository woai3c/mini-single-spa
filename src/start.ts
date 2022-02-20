import { loadApps } from './application/apps'
import { isInBrowser } from './utils/utils'

let isStarted = false
export default function start() {
    if (!isInBrowser()) {
        throw Error('mini-single-spa must be running in browser!')
    }

    if (!isStarted) {
        isStarted = true
        loadApps()
    }
}

export function isStart() {
    return isStarted
}