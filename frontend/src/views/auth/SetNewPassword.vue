<script lang="ts">
import { LockClosedIcon, ChevronDoubleRightIcon } from '@heroicons/vue/20/solid'
import authenticate from '../../functions/authenticate.ts'
import Notification from '../../components/Notifications.vue'


export default (await import("vue")).defineComponent({
 name: "Reset Password",
 mixins: [authenticate, Notification],
  components: {
    LockClosedIcon,
    ChevronDoubleRightIcon
  },
  data() {
   return {
    showingSecond: false,
    password1: "",
    password2: "",
    passwordsMatch: true,
    passwordLength: true,
    resetToken: "",
    showNext: 0,
   }
  },
  mounted() {
    this.resetToken = this.$route.query.token?.toString() || ""
  },
  watch: {
    password1: {
      handler: function(newVal) {
        this.passwordLength = (newVal.length > 7)
      }
    },
    password2: {
      handler: function(newVal) {
      this.passwordsMatch = this.password1 === newVal
      }
    },
  },
  methods: {
   async updatePassword() {
    const currentPassword = this.password1

    if (this.passwordLength && this.passwordsMatch) {
      const response = await this.updateUserAuth('none', { password: currentPassword })
      console.log(response)
    }
   },
   
  }

})
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://i.vgy.me/HGoEMr.png" alt="Workflow"
        @click="showNotification('simple', 'test')" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <label v-if="!passwordLength || !passwordsMatch" class="block text-sm font-medium text-gray-700">{{passwordLength ? showNext == 1 ? passwordsMatch ? "" : "Passwords don't match" : "" : "Password must be at least 8 characters long"}}</label>
            <div class="mt-1  rounded-md shadow-sm">
              <transition
                enter-active-class="transition ease-out duration-400"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-1000"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-10"
              >
              <div class="flex z-10 focus:z-20">
                <input type="password" v-model="password1" name="password1" :class="[
                  ' block w-full min-w-0 flex-1  border-gray-300 px-3 py-2 sm:text-sm focus:border-gray-300 focus:ring-0',
                  showNext == 1 ? 'rounded-md rounded-b-none rounded-t-md' : 'rounded-l-md']" placeholder="Enter your new password" />
                <button v-if="showNext == 0" class="items-center border border-l-0 rounded-r-md border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm" @click="passwordLength ? showNext = 1 : showNext = 0">
                  <ChevronDoubleRightIcon  class=" z-40 h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              </transition>
              <transition
                enter-active-class="transition ease-out duration-700"
                enter-from-class="opacity-0 "
                enter-to-class="opacity-100 "
                leave-active-class="transition ease-in duration-500"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0 "
              >
               <div v-if="showNext == 1" class="flex z-10 focus:z-20"> <!-- SignIn -->
                <input type="password" v-model="password2" name="password2" class="focus:border-gray-300 focus:ring-0 block w-full min-w-0 flex-1 rounded-none border-gray-300 px-3 py-2 sm:text-sm rounded-t-none rounded-l-md" placeholder="Confirm your new password" />
                <button @click="updatePassword()" class="items-center border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm rounded-b-md rounded-r-md rounded-t-none rounded-l-none">
                  <ChevronDoubleRightIcon  class=" z-40 h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              </transition>
              <transition
                enter-active-class="transition ease-out duration-700"
                enter-from-class="opacity-0 "
                enter-to-class="opacity-100 "
                leave-active-class="transition ease-in duration-500"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0 "
              >
              </transition>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <Notification />
</template>
  