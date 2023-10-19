import './assets/main.sass'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex';
import axios from 'axios';

const app = createApp(App)

app.use(router).use(Vuex)

app.mount('#app')

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;