import { Application, Source } from '../types'
import { createElement, removeNode } from './dom'

const urlReg = /^http(s)?:\/\//
function isCorrectURL(url = '') {
    return urlReg.test(url)
}

export default function parseHTMLandLoadSources(app: Application) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve, reject) => {
        const pageEntry = app.pageEntry
        if (!isCorrectURL(pageEntry)) {
            return reject(Error(`${pageEntry} is not a valid url`))
        }
    
        let html = ''
        try {
            html = await loadSourceText(pageEntry) // load html
        } catch (error) {
            reject(error)
        }
        
        const domparser = new DOMParser()
        const doc = domparser.parseFromString(html, 'text/html')
        const { scripts, styles } = extractScriptsAndStyles(doc as unknown as Element, app)
        
        // 提取了 script style 后剩下的 body 部分的 html 内容
        app.pageBody = doc.body.innerHTML

        let isStylesDone = false, isScriptsDone = false
        // 加载 style script 的内容
        Promise.all(loadStyles(styles))
        .then(data => {
            isStylesDone = true
            addStyles(data as string[])
            if (isScriptsDone && isStylesDone) resolve()
        })
        .catch(err => reject(err))

        Promise.all(loadScripts(scripts))
        .then(data => {
            isScriptsDone = true
            executeScripts(data as string[])
            if (isScriptsDone && isStylesDone) resolve()
        })
        .catch(err => reject(err))
    })
}

export const globalLoadedURLs: string[] = []
function extractScriptsAndStyles(node: Element, app: Application) {
    if (!node.children.length) return { scripts: [], styles: [] }

    let styles: Source[] = []
    let scripts: Source[] = []
    for (const child of Array.from(node.children)) {
        const isGlobal = Boolean(child.getAttribute('global'))
        const tagName = child.tagName
        
        if (tagName === 'STYLE') {
            removeNode(child)
            styles.push({
                isGlobal,
                value: child.textContent || '',
            })
        } else if (tagName === 'SCRIPT') {
            removeNode(child)
            const src = child.getAttribute('src') || ''
            if (app.loadedURLs.includes(src) || globalLoadedURLs.includes(src)) {
                continue
            }
            
            const config: Source = {
                isGlobal,
                type: child.getAttribute('type'),
                value: child.textContent || '',
            }

            if (src) {
                config.url = src
                if (isGlobal) {
                    globalLoadedURLs.push(src)
                } else {
                    app.loadedURLs.push(src)
                }
            }

            scripts.push(config)
        } else if (tagName === 'LINK') {
            removeNode(child)
            const href = child.getAttribute('href') || ''
            if (app.loadedURLs.includes(href) || globalLoadedURLs.includes(href)) {
                continue
            }

            if (child.getAttribute('rel') === 'stylesheet' && href) {
                styles.push({
                    url: href,
                    isGlobal,
                    value: '',
                })

                if (isGlobal) {
                    globalLoadedURLs.push(href)
                } else {
                    app.loadedURLs.push(href)
                }
            }
        } else {
            const result = extractScriptsAndStyles(child, app)
            scripts = scripts.concat(result.scripts)
            styles = styles.concat(result.styles)
        }
    }

    return { scripts, styles }
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

const head = document.head
function loadStyles(styles: Source[]) {
    if (!styles.length) return []

    return styles.map(item => {
        if (item.isGlobal) {
            if (item.url) {
                const link = createElement('link', {
                    global: item.isGlobal,
                    href: item.url,
                    rel: 'stylesheet',
                })

                head.appendChild(link)
            } else {
                const style = createElement('style', {
                    global: item.isGlobal,
                    type: 'text/css',
                    textContent: item.value,
                })

                head.appendChild(style)
            }

            return
        }

        if (item.url) return loadSourceText(item.url)
        return Promise.resolve(item.value)
    })
    .filter(Boolean)
}

function loadScripts(scripts: Source[]) {
    if (!scripts.length) return []

    return scripts.map(item => {
        const type = item.type || 'text/javascript'
        if (item.isGlobal) {
            const script = createElement('script', { 
                type,
                global: item.isGlobal,
            })

            if (item.url) {
                script.setAttribute('src', item.url)
            } else {
                script.textContent = item.value
            }

            head.appendChild(script)
            return
        }

        if (item.url) return loadSourceText(item.url)
        return Promise.resolve(item.value)
    })
    .filter(Boolean)
}

export function executeScripts(scripts: string[]) {
    try {
        scripts.forEach(code => {
            // eslint-disable-next-line no-new-func
            new Function('window', code).call(window, window)
        })
    } catch (error) {
        throw error
    }
}

export function addStyles(styles: string[] | HTMLStyleElement[]) {
    styles.forEach(item => {
        if (typeof item === 'string') {
            const node = createElement('style', {
                type: 'text/css',
                textContent: item,
            })

            head.appendChild(node)
        } else {
            head.appendChild(item)
        }
    })
}