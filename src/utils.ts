import parse from 'node-html-parser'

export function isPromise(func: any) {
    if (typeof func === 'function' && typeof func.then === 'function') {
        return true
    }
}

export async function parseHTMLandLoadScripts(url: string) {
    const html = await loadHtml(url)
    const scripts = parse(html).querySelectorAll('script')
    const promise = scripts.map(script => loadScript(script.attrs.src))
    await Promise.all(promise)
}

export function loadHtml(url: string) {
    return new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = (res: any) => {
            resolve(res.target.response)
        }

        xhr.onerror = reject
        xhr.onabort = reject

        xhr.open('get', url)
        xhr.send()
    })
}

export function loadScript(url: string) {
    return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = (res: any) => {
            const script = document.createElement('script')
            script.text = res.target.response
            document.querySelector('head')?.appendChild(script)
            resolve()
        }

        xhr.onerror = reject
        xhr.onabort = reject

        xhr.open('get', url)
        xhr.send()
    })
}