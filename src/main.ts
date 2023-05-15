import { createApp } from 'vue'
import './style.css'
import App from './views/App.vue'
import router from './router'
import VMask from "@ssibrahimbas/v-mask";

const app = createApp(App)
app.use(VMask);
app.use(router)
app.mount('#app')

