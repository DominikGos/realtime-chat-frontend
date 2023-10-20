import './assets/main.sass';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { store } from './store';
import AxiosService from './services/AxiosService';
import AuthService from './services/AuthService';

const axiosService = new AxiosService;
axiosService.setDefaults();

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');