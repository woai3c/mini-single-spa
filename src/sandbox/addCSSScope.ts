import { Application } from '../types'
import { nextTick } from '../utils/utils'

/**
 * 给每一条 css 选择符添加对应的子应用作用域
 * 1. a {} -> a[single-spa-name=${app.name}] {}
 * 2. a b c {} -> a[single-spa-name=${app.name}] b c {}
 * 3. a, b {} -> a[single-spa-name=${app.name}], b[single-spa-name=${app.name}] {}
 * 4. body {} -> #${子应用挂载容器的 id}[single-spa-name=${app.name}] {}
 * 5. @media @supports 特殊处理，其他规则直接返回 cssText
 */
export default function addCSSScope(style: HTMLStyleElement, app: Application) {
    // 等 style 标签挂载到页面上，给子应用的 style 内容添加作用域
    nextTick(() => {
        // 禁止 style 生效
        (style as any).disabled = true
        if (style.sheet?.cssRules) {
            style.textContent = handleCSSRules(style.sheet.cssRules, app)
        }
        
        // 使 style 生效
        (style as any).disabled = false
    })
}

function handleCSSRules(cssRules: CSSRuleList, app: Application) {
    let result = ''
    Array.from(cssRules).forEach(cssRule => {
        result += handleCSSRuleHelper(cssRule, app)
    })

    return result
}

function handleCSSRuleHelper(cssRule: CSSRule, app: Application) {
    let result = ''
    const cssText = cssRule.cssText
    const selectorText = (cssRule as CSSStyleRule).selectorText
    if (selectorText) {
        result += modifyCSSText(cssRule, app)
    } else if (cssText.startsWith('@media')) {
        result += `
            @media ${(cssRule as CSSMediaRule).conditionText} { 
                ${handleCSSRules((cssRule as CSSMediaRule).cssRules, app)} 
            }
        `
    } else if (cssText.startsWith('@supports')) {
        result += `
            @supports ${(cssRule as CSSSupportsRule).conditionText} { 
                ${handleCSSRules((cssRule as CSSKeyframesRule).cssRules, app)} 
            }
        `
    } else {
        result += cssText
    }

    return result
}

/**
 * 用新的 css 选择符替换原有的选择符
 */
function modifyCSSText(cssRule: CSSRule, app: Application) {
    const selectorText = (cssRule as any).selectorText
    return cssRule.cssText.replace(
        selectorText, 
        getNewSelectorText(selectorText, app),
    )
}

let count = 0
const re = /^(\s|,)?(body|html)\b/g
function getNewSelectorText(selectorText: string, app: Application) {
    const arr = selectorText.split(',').map(text => {
        const items = text.trim().split(' ')
        items[0] = `${items[0]}[single-spa-name=${app.name}]`
        return items.join(' ')
    })

    // 如果子应用挂载的容器没有 id，则随机生成一个 id
    let id = app.container.id
    if (!id) {
        id = 'single-spa-id-' + count++
        app.container.id = id
    }

    // 将 body html 标签替换为子应用挂载容器的 id
    return arr.join(',').replace(re, `#${id}`)
}
