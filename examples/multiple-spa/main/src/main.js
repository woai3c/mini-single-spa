import Vue from 'vue'
import App from './App'
import { registerApplication, start } from 'mini-single-spa'
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
    loadApp: async () => {
        return window.__Vue_App__
    },
    pageEntry: 'http://localhost:8001',
    activeRule: pathPrefix('/vue'),
    customProps: {
        container: $('#subapp-viewport')
    }
})

registerApplication({
    name: 'react',
    loadApp: async () => {
        return window.__React_App__
    },
    pageEntry: 'http://localhost:8002',
    activeRule:pathPrefix('/react'),
    customProps: {
        container: $('#subapp-viewport')
    }
})

start()
