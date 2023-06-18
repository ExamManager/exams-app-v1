//import { Module, VuexModule, Mutation } from "vuex-module-decorators"
import { createStore } from 'vuex'


export default createStore({
  state: {
    userid: "null",
    username: "",
    plan: 0,
    fullname: "",
    avatarurl: "",
    provider: "",
    email: "",
    metadata: {},
    setupComplete: false,
  },
  mutations: {
    updateUserid(state, userid) {
      state.userid = userid
    },
    updateUsername(state, username) {
      state.username = username
    },
    updatePlan(state, plan) {
      state.plan = plan
    },
    updateFullname(state, fullname) { 
      state.fullname = fullname
    },
    updateAvatarurl(state, avatarurl) { 
      state.avatarurl = avatarurl
    },
    updateProvider(state, provider) {
      state.provider = provider
    },
    updateEmail(state, email) {
      state.email = email
    },
    updateMetadata(state, metadata) {
      state.metadata = metadata
    },
    updateSetupComplete(state, setupComplete) {
      state.setupComplete = setupComplete
    },
    updateAllData(state, data) {
      state.userid = data.userid || state.userid
      state.username = data.username || state.username
      state.plan = data.plan ||  state.plan
      state.fullname = data.fullname  || state.fullname
      state.avatarurl = data.avatarurl  || state.avatarurl
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