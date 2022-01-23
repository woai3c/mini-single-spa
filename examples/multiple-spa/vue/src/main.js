import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import '@/styles/reset.css'

Vue.config.productionTip = false

let router = null
let app = null
function render(props = {}) {
    const { container } = props
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

if (!window.__IS_SINGLE_SPA__) {
    render()
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
    console.log('[vue] props from main framework', props)
    render(props)
}

export async function unmount() {
    app.$destroy()
    app.$el.innerHTML = ''
    app = null
    router = null
}
