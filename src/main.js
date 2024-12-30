import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import qs from "qs"
const app = createApp(App)
app.provide("$axios",axios);
app.provide("$qs",qs);
app.use(ElementPlus);
app.use(router)
app.mount('#app')