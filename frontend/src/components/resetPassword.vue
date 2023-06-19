<script lang="ts">
import { LockClosedIcon, ChevronDoubleRightIcon } from '@heroicons/vue/20/solid'


export default (await import("vue")).defineComponent({
 name: "ResetPassword",
  components: {
    LockClosedIcon,
    ChevronDoubleRightIcon
  },
  data() {
   return {
    showingSecond: false,
    password1: "",
    password2: "",
    passwordsMatch: false,
    passwordLength: false,
    resetToken: "",
   }
  },
  mounted() {
    this.resetToken = this.$route.query.token
  },
  watch: {
   password2: {
    handler: function(newVal) {
     this.passwordsMatch = this.password1 === newVal
     if (this.passwordsMatch) {
      this.passwordLength = this.password1.length > 7
     }
    }
   },
  },
  methods: {
   updatePassword() {

   },
  }

})
</script>

<template>
 <div class="flex my-auto h-screen min-h-screen pb-56 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
   <div class="w-full max-w-md space-y-8">
     <div class="flex flex-row justify-center items-center">
       <img class="mr-2 h-12 w-auto" src="https://i.vgy.me/HGoEMr.png" alt="Your Company" />
       <h2 class="text-center align-middle text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
     </div>
     <div class="mt-8 space-y-6">
       <div class="-space-y-px rounded-md shadow-sm relative flex flex-col">
           <input v-model="password1" type="password" required class=" z-10 focus:z-20 inline-block absolute w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Enter new password" />
           <ChevronDoubleRightIcon @click="showingSecond = true" class="relative mr-6 bg-orange-200 p-px rounded-full translate-y-2 ml-auto left-3 h-6 w-6 text-orange-500 hover:bg-orange-300" viewBox="0 0 20 20" :class="showingSecond ? 'z-0' : 'z-50'"/>
           <input v-model="password2" type="password" v-if="showingSecond" required="" class="z-10 focus:z-20 absolute translate-y-full block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Re-enter password" />
       </div>
       <div v-if="showingSecond">
         <button type="submit" class="group relative translate-y-full flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" :class="passwordsMatch && passwordLength ? 'grayscale-0 hover:bg-orange-700' : 'grayscale '" :disabled="!passwordsMatch || !passwordLength">
           <span class="absolute inset-y-0 left-0 flex items-center pl-3">
             <LockClosedIcon class="h-5 w-5 text-orange-500" :class="passwordsMatch && passwordLength ? 'group-hover:text-oramge-400' : ''" aria-hidden="true" />
           </span>
           {{passwordsMatch ? passwordLength ? "Reset Password" : 'Password must be at least 8 characters' : "Passwords do not match" }}
         </button>
       </div>
     </div>
   </div>
 </div>
</template>