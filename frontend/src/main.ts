import { createApp } from 'vue'
import './style.css'
import App from './views/App.vue'
import router from './router'
import VMask from "@ssibrahimbas/v-mask";
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const app = createApp(App)

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
});
  
const store = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin]
});

app.use(store);
app.use(VMask);
app.use(router);
app.mount('#app')