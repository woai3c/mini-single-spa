import { loadApps } from './application/apps'

let isStarted = false
export default function start() {
    if (!isStarted) {
        isStarted = true
        try {
            loadApps()
        } catch (error) {
            throw error
        }
    }
}

export function isStart() {
    return isStarted
}