import { Application } from 'src/types'

export function createMutationObserver(app: Application): MutationObserver {
    const observer = new MutationObserver(mutationList => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                for (const node of Array.from(mutation.addedNodes)) {
                    if (node.nodeType === 1 && (node as HTMLElement).tagName === 'STYLE') {
                        app.loadedStyle?.push(node as HTMLStyleElement)
                    }
                }
            }
        }
    })

    observer.observe(document, {
        childList: true,
        subtree: true,
    })

    return observer
}