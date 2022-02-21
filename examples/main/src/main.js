import Vue from 'vue'
import App from './App'
import { registerApplication, start } from '@mini-single-spa/esm'
import { $, pathPrefix } from './utils'

function render() {
    new Vue({
        el: '#app',
        render(h) {
            return h(App)
        }
    });
}

render()

registerApplication({
    name: 'vue',
    pageEntry: 'http://localhost:8001',
    activeRule: pathPrefix('/vue'),
    container: $('#subapp-viewport'),
    sandboxConfig: {
        enabled: true,
        css: true
    },
    /**
     * app 生命周期钩子，加载页面资源前触发，只会触发一次
     */
    beforeBootstrap: () => console.log('vue beforeBootstrap'),
    /**
     * app 生命周期钩子，页面入口的资源被加载并执行后触发，只会触发一次
     */
    bootstrapped: () => console.log('vue bootstrapped'),
    /**
     * app 生命周期钩子，挂载前触发
     */
    beforeMount: () => console.log('vue beforeMount'),
    /**
     * app 生命周期钩子，挂载后触发
     */
    mounted: () => console.log('vue mounted'),
    /**
     * app 生命周期钩子，卸载前触发
     */
    beforeUmount: () => console.log('vue beforeUmount'),
    /**
     * app 生命周期钩子，卸载后触发
     */
    unmounted: () => console.log('vue unmounted'),
    /**
     * js 代码的 loader，每次获取到 js 代码后会传给 loader() 并将返回值作为新的代码
     */
    loader: (code) => {
        console.log('vue loader')
        return code
    }
})

registerApplication({
    name: 'react',
    pageEntry: 'http://localhost:8002',
    activeRule: (location) => location.pathname.indexOf('/react') === 0 || location.pathname.indexOf('/multiple') === 0,
    container: $('#subapp-viewport'),
    sandboxConfig: {
        enabled: true,
        css: true
    }
})

registerApplication({
    name: 'multiple',
    pageEntry: 'http://localhost:8003',
    activeRule: pathPrefix('/multiple'),
    container: $('#multiple-app'),
    sandboxConfig: {
        enabled: true,
        css: true
    }
})

start()
window.name = 'parent'
console.log(window.name)

window.spaGlobalState.on('vue', () => alert('父应用监听到 vue 子应用发送了一个全局事件: vue'))
window.spaGlobalState.on('multiple', () => alert('父应用监听到 multiple 子应用发送了一个全局事件: multiple'))