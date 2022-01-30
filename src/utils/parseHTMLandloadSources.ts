/* eslint-disable array-callback-return */
import { $ } from './utils'

const urlReg = /^http(s)?:\/\//
function isCorrectURL(url = '') {
    return urlReg.test(url)
}

// 匹配域名
const hostReg = /(?<=:\/\/)[^/]*/
function getHost(url: string) {
    return url.match(hostReg)?.[0] || ''
}

const hasLoadedURLs: string[] = []
export default async function parseHTMLandloadSources(url: string) {
    if (!isCorrectURL(url)) return
    
    let html: string
    try {
        html = await loadSourceText(url) // load html
    } catch (error) {
        throw error
    }

    const domparser = new DOMParser()
    const doc = domparser.parseFromString(html, 'text/html')
    const scripts = Array.from(doc.querySelectorAll('script')).map(script => {
        const src = script.src
        // 防止加载重复的 url
        if (src && !hasLoadedURLs.includes(src)) {
            hasLoadedURLs.push(src)
            return src
        }
    }).filter(Boolean)

    const host = getHost(url)
    const linkPromises = Array.from(doc.querySelectorAll('link')).map(link => {
        const href = link.href
        // 1. preload 的资源一般和真正的资源成对出现, 因此不需要加载含有 preload 的资源
        // 2. 防止加载重复的 url
        // 3. 只加载与子应用域名一致的 url
        if (
            href
            && href.includes(host)
            && link.rel !== 'preload'
            && !hasLoadedURLs.includes(href)
        ) {
            hasLoadedURLs.push(href)
            return loadLink(href, link.attributes)
        }
    }).filter(Boolean)

    // 异步加载 link script 标签，顺序执行 js
    return Promise.all([...linkPromises, syncLoadScripts(scripts as string[])])
}

export function loadSourceText(url: string) {
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

const sourceReg = /\.css$/
const head = $('head')!
export function loadLink(url: string, attrs: NamedNodeMap) {
    return new Promise<void>((resolve, reject) => {
        const source = document.createElement('link')
        Array.from(attrs).forEach(attr => {
            source.setAttribute(attr.name, attr.value)
        })

        source.onload = resolve as any
        source.onerror = reject
        head.appendChild(source)
        // 如果不是 css 或者 js(prefetch)，马上 resolve
        if (!sourceReg.test(url)) {
            setTimeout(resolve)
        }
    })
}

// 异步加载 js 资源，顺序执行
export async function syncLoadScripts(urls: string[]) {
    try {
        const scriptTexts = await Promise.all(urls.map(url => loadSourceText(url)))
        scriptTexts.forEach(text => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.innerHTML = text
            head.appendChild(script)
        })
    } catch (error) {
        throw error
    }
}