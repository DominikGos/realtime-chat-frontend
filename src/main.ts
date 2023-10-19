import './assets/main.sass';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { store } from './store';
const app = createApp(App);

app.use(router).use(store);

app.mount('#app');



axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
