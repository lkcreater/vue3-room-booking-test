//import './assets/main.css'
import 'ant-design-vue/dist/antd.css';
import '@/assets/custom.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')

