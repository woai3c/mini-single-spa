import { isUniqueElement } from '../utils/dom'
import { getApp, getCurrentApp, getCurrentAppName, setCurrentAppName } from '../utils/application'
import { executeScripts, fetchScriptAndExecute, fetchStyleAndReplaceStyleContent, globalLoadedURLs } from '../utils/source'
import { 
    originalAppendChild,
    originalCreateElement,
    originalDocument,
    originalGetElementById, 
    originalGetElementsByClassName, 
    originalGetElementsByName, 
    originalGetElementsByTagName, 
    originalInsertBefore, 
    originalQuerySelector,
    originalQuerySelectorAll, 
} from '../utils/originalEnv'
import addCSSScope from './addCSSScope'

export function patchDocument() {
    Element.prototype.appendChild = function appendChild<T extends Node>(node: T): any {
        return patchAddChild(this, node, null, 'append')
    }
    
    Element.prototype.insertBefore = function insertBefore<T extends Node>(newNode: T, referenceNode: Node | null): any {
        return patchAddChild(this, newNode, referenceNode, 'insert')
    }

    Document.prototype.createElement = function createElement(
        tagName: string,
        options?: ElementCreationOptions,
    ): HTMLElement {
        const appName = getCurrentAppName()
        const element = originalCreateElement.call(this, tagName, options)
        appName && element.setAttribute('single-spa-name', appName)
        return element
    }

    // 将所有查询 dom 的范围限制在子应用挂载的 dom 容器上
    Document.prototype.querySelector = function querySelector(this: Document, selector: string) {
        const app = getCurrentApp()
        if (!app || !selector || isUniqueElement(selector)) {
            return originalQuerySelector.call(this, selector)
        }

        return app.container.querySelector(selector)
    }

    Document.prototype.querySelectorAll = function querySelectorAll(this: Document, selector: string) {
        const app = getCurrentApp()
        if (!app || !selector || isUniqueElement(selector)) {
            return originalQuerySelectorAll.call(this, selector)
        }

        return app.container.querySelectorAll(selector)
    }

    Document.prototype.getElementById = function getElementById(id: string) {
        return getElementHelper(this, originalGetElementById, 'querySelector', id, `#${id}`)
    }

    Document.prototype.getElementsByClassName = function getElementsByClassName(className: string) {
        return getElementHelper(this, originalGetElementsByClassName, 'getElementsByClassName', className, className)
    }

    Document.prototype.getElementsByName = function getElementsByName(elementName: string) {
        return getElementHelper(this, originalGetElementsByName, 'querySelectorAll', elementName, `[name=${elementName}]`)
    }

    Document.prototype.getElementsByTagName = function getElementsByTagName(tagName: string) {
        return getElementHelper(this, originalGetElementsByTagName, 'getElementsByTagName', tagName, tagName)
    }
}

function getElementHelper(
    parent: Document, 
    originFunc: Function, 
    funcName: string,
    originSelector: string, 
    newSelector: string,
) {
    const app = getCurrentApp()
    if (!app || !originSelector) {
        return originFunc.call(parent, originSelector)
    }

    return (app.container as any)[funcName](newSelector)
}

export function releaseDocument() {
    setCurrentAppName(null)
    Document.prototype.createElement = originalCreateElement
    Document.prototype.appendChild = originalAppendChild
    Document.prototype.insertBefore = originalInsertBefore
    Document.prototype.getElementById = originalGetElementById
    Document.prototype.getElementsByClassName = originalGetElementsByClassName
    Document.prototype.getElementsByName = originalGetElementsByName
    Document.prototype.getElementsByTagName = originalGetElementsByTagName
    Document.prototype.querySelector = originalQuerySelector
    Document.prototype.querySelectorAll = originalQuerySelectorAll
}

const head = originalDocument.head
const tags = ['STYLE', 'LINK', 'SCRIPT']
function patchAddChild(parent: Node, child: any, referenceNode: Node | null, type: 'append' | 'insert') {
    const tagName = child.tagName
    if (!tags.includes(tagName)) {
        return addChild(parent, child, referenceNode, type)
    }
    
    const appName = child.getAttribute('single-spa-name')
    const app = getApp(appName)
    if (!appName || !app) return addChild(parent, child, referenceNode, type)

    // 所有的 style 都放到 head 下
    if (tagName === 'STYLE') {
        if (app.sandboxConfig.css) {
            addCSSScope(child, app)
        }

        return addChild(head, child, referenceNode, type)
    }

    if (tagName === 'SCRIPT') {
        const src = child.src
        if (
            src
            && !globalLoadedURLs.includes(src)
            && !app?.loadedURLs.includes(src)
        ) {
            if (child.getAttribute('global')) {
                globalLoadedURLs.push(src)
            } else {
                app?.loadedURLs.push(src)
            }

            fetchScriptAndExecute(src, app)
            return null
        }

        executeScripts([child.textContent as string], app)
        return null
    }

    if ( 
        child.rel === 'stylesheet' 
        && child.href
        && !globalLoadedURLs.includes(child.href)
        && !app?.loadedURLs.includes(child.href)
    ) {
        const href = child.href
        if (child.getAttribute('global')) {
            globalLoadedURLs.push(href)
        } else {
            app?.loadedURLs.push(href)
        }

        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')

        fetchStyleAndReplaceStyleContent(style, href, app)

        return addChild(head, style, referenceNode, type)
    }

    return addChild(parent, child, referenceNode, type)
}

function addChild(parent: Node, child: any, referenceNode: Node | null, type: 'append' | 'insert') {
    if (type === 'append') {
        return originalAppendChild.call(parent, child)
    }

    return originalInsertBefore.call(parent, child, referenceNode)
}