import {createRouter, createWebHistory} from 'vue-router'
import App from "@/App.vue";

import './assets/main.css'
import 'bootstrap/dist/js/bootstrap.min.js';

import {createApp} from 'vue'
import Index from "@/components/Index.vue";
import About from "@/components/About.vue";
import Account from "@/components/Account.vue";

//Routes array example {path: '/', component: ComponentName}
const routes = [
    {path: '/', component: Index},
    {path: '/about', component: About},
    {path: '/account/:id', component: Account, props: true},
    // {path: '/', component: ComponentName},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp(App)
app.use(router).mount('#app')
