import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import '@/styles/reset.css'

Vue.config.productionTip = false

let router = null
let app = null
function render(options = {}) {
    const { container } = options
    router = new VueRouter({
        base: window.__IS_SINGLE_SPA__ ? '/vue' : '/',
        mode: 'history',
        routes,
    })
    
    app = new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount(container ? helper(container) : '#app')

    function helper(container) {
        let div = container.querySelector('#app')
        if (!div) {
            div = document.createElement('div')
            div.id = 'app'
            container.appendChild(div)
        }

        return div
    }
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped')
}

export async function mount(options) {
    console.log('[vue] options from main framework', options)
    render(options)
}

export async function unmount() {
    app.$destroy()
    app.$el.innerHTML = ''
    app = null
    router = null
}

if (window.__IS_SINGLE_SPA__) {
    window['mini-single-spa-vue'] = {
        bootstrap,
        mount,
        unmount
    }
} else {
    render()
}
