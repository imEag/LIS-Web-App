import './assets/styles/main.scss';
import 'modern-normalize/modern-normalize.css';

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
