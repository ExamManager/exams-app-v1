//import { Module, VuexModule, Mutation } from "vuex-module-decorators"
import { createStore } from 'vuex'


export default createStore({
  state: {
    userId: "",
    userName: "",
    plan: 0,
    fullName: "",
    avatarUrl: "",
    provider: "",
    email: "",
    metaData: {},
    setupComplete: false,
  },
  mutations: {
    updateUserId(state, userId) {
      state.userId = userId
    },
    updateUsername(state, userName) {
      state.userName = userName
    },
    updatePlan(state, plan) {
      state.plan = plan
    },
    updateFullName(state, fullName) { 
      state.fullName = fullName
    },
    updateAvatarUrl(state, avatarUrl) { 
      state.avatarUrl = avatarUrl
    },
    updateProvider(state, provider) {
      state.provider = provider
    },
    updateEmail(state, email) {
      state.email = email
    },
    updateMetadata(state, metadata) {
      state.metaData = metadata
    },
    updateSetupComplete(state, setupComplete) {
      state.setupComplete = setupComplete
    },
    updateAllData(state, data) {
      state.userId = data.userId || state.userId
      state.userName = data.userName || state.userName
      state.plan = data.plan ||  state.plan
      state.fullName = data.fullName  || state.fullName
      state.avatarUrl = data.avatarUrl  || state.avatarUrl
      state.provider = data.provider  || state.provider
      state.email = data.email || state.email 
      state.metadata = data.metadata || state.metadata 
      state.accountComplete = data.accountComplete || state.accountComplete
    }
    
  },
  actions: {
    updateParam(context, payload) {
      //payload is in array in format [stateName, newValue]
      const key = payload[0]
      const newVal = payload[1]
      
      const updateName = `update${key.charAt(0).toUpperCase() + key.slice(1)}`
      context.commit(updateName, newVal)
    },
    updateParams(context, payload) {
    for (const param in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, param)) {
        const value = payload[param];
        const capitalizedParam = param.charAt(0).toUpperCase() + param.slice(1);
        context.commit(`update${capitalizedParam}`, value);
      }
    }}, 
  },
  getters: {
    getData: function(state, data) {
      // data is an array of strings that tell the getter what data to return
      let returnData = {}
      data.forEach((item) => {
        returnData[item] = state[item]
      })
      return returnData // idk if that works
    },
    getAllData: function(state) {
      return state
    } 
  },
})