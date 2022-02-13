import { loadApps } from './application/apps'

let isStarted = false
export default function start() {
    if (!isStarted) {
        isStarted = true
        loadApps()
    }
}

export function isStart() {
    return isStarted
}