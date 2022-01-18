import Vue from 'vue'
import App from './App'
import { registerApplication, start } from 'mini-single-spa'
import { loadScript, $, pathPrefix } from './utils'

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
    loadApp: async () => {
        await loadScript('http://localhost:8001/js/chunk-vendors.js')
        await loadScript('http://localhost:8001/js/app.js')

        return window.__Vue_App__
    },
    activeRule: pathPrefix('/vue'),
    customProps: {
        container: $('#subapp-viewport')
    }
})

registerApplication({
    name: 'react',
    loadApp: async () => {
        await loadScript('http://localhost:8002/static/js/bundle.js')
        await loadScript('http://localhost:8002/static/js/0.chunk.js')
        await loadScript('http://localhost:8002/static/js/main.chunk.js')
        // await loadScript('http://localhost:8002/main.a2bf08ebb0f9cf7e0a00.hot-update.js')

        return window.__React_App__
    },
    activeRule:pathPrefix('/react'),
    customProps: {
        container: $('#subapp-viewport')
    }
})

start()
