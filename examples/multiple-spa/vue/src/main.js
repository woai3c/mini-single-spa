import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

Vue.config.productionTip = false

let router = null
let instance = null

function render(props = {}) {
    const { container } = props
    router = new VueRouter({
        base: window.__IS_SINGLE_SPA__ ? '/vue' : '/',
        mode: 'history',
        routes,
    })
    
    instance = new Vue({
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
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    router = null
}
