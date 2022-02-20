import addCSSScope from '../sandbox/addCSSScope'
import { Application, Source } from '../types'
import { createElement, removeNode } from './dom'
import { originalAppendChild, originalWindow } from './originalEnv'
import { isFunction } from './utils'

const urlReg = /^http(s)?:\/\//
function isCorrectURL(url = '') {
    return urlReg.test(url)
}

export const globalLoadedURLs: string[] = []
export function parseHTMLandLoadSources(app: Application) {
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
            app.styles = data as string[]
            if (isScriptsDone && isStylesDone) resolve()
        })
        .catch(err => reject(err))

        Promise.all(loadScripts(scripts))
        .then(data => {
            isScriptsDone = true
            app.scripts = data as string[]
            if (isScriptsDone && isStylesDone) resolve()
        })
        .catch(err => reject(err))
    })
}

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

                originalAppendChild.call(head, link)
            } else {
                const style = createElement('style', {
                    global: item.isGlobal,
                    type: 'text/css',
                    textContent: item.value,
                })

                originalAppendChild.call(head, style)
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

            originalAppendChild.call(head, script)
            return
        }

        if (item.url) return loadSourceText(item.url)
        return Promise.resolve(item.value)
    })
    .filter(Boolean)
}

export function executeScripts(scripts: string[], app: Application) {
    try {
        scripts.forEach(code => {
            // 如果子应用提供了 loader
            if (isFunction(app.loader)) {
                // @ts-ignore
                code = app.loader(code)
            }
            
            if (app.sandboxConfig?.enabled) {
                // ts 使用 with 会报错，所以需要这样包一下
                // 将子应用的 js 代码全局 window 环境指向代理环境 proxyWindow
                const warpCode = `
                    ;(function(proxyWindow){
                        with (proxyWindow) {
                            (function(window){${code}\n}).call(proxyWindow, proxyWindow)
                        }
                    })(this);
                `

                new Function(warpCode).call(app.sandbox.proxyWindow)
            } else {
                new Function('window', code).call(originalWindow, originalWindow)
            }
        })
    } catch (error) {
        throw error
    }
}

export async function fetchStyleAndReplaceStyleContent(style: HTMLStyleElement, url: string, app: Application) {
    const content = await loadSourceText(url)
    style.textContent = content
    if (app.sandboxConfig?.css) {
        addCSSScope(style, app)
    }
}

export async function fetchScriptAndExecute(url: string, app: Application) {
    const content = await loadSourceText(url)
    executeScripts([content], app)
}