import { createApp } from 'vue'
import './style.css'
import App from './views/index.vue'

import VMask from "@ssibrahimbas/v-mask";



const app = createApp(App)
app.use(VMask)
app.mount('#app')

