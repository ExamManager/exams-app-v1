import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

 
const store = new Vuex.Store<State>({
  state: {
    user: { name: 'Arnav' },
    navigation: { path: '/home' }
  },
  plugins: [new VuexPersistence().plugin]
})
 
export default store
