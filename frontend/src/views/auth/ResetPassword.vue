<script lang="ts">
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import authenticate from '../../functions/authenticate';
import Notification from '../../components/Notifications.vue'

export default {
  mixins: [authenticate, Notification],
  name: "requestPwdReset",
  components: {
    HomeIcon,
    ChevronRightIcon,
  },
  data() {
    return {
      test: "test",
      email: "",
      passwordReset: false,
      validEmail: true,
      emailExists: true,
      providerIsEmail: true,
      success: false,
    };
  },
  watch: {
    email: {
      handler: function(newVal) {
        this.validEmail = newVal.match('@') || [].length === 1
      }
    }
  },
  methods: {
    async signinlocal() {
      const response = this.signin(this.email, this.password);
      console.log(response)
      setTimeout(() => {
        this.$router.push("/");
      }, 500);
    },
    async googlelocal() {
      const response = await this.signingoogle();
      console.log('googleSignInResponse: ', response)
      localStorage.setItem("googleSignInReponse", JSON.stringify(response));
      return response
    },
    async pwdReset() {
      const currentEmail = this.email
      const data = await this.checkUserExists({col: 'email', val: currentEmail})
      if (data.length === 1) {
        if (data[0].provider != 'email') {this.providerIsEmail = false}
        else {
          const response = await this.sendPasswordResetEmail(currentEmail)
          console.log(response)
          this.success = true
        }
      } else this.emailExists = false
    },
  },
};
</script>
<template>
  <div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://i.vgy.me/HGoEMr.png" alt="Workflow"
        @click="showNotification('simple', 'test')" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
         
         <a class="font-medium">
           You will recieve an email with a link to reset your password.
         </a>
       </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white pt-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <div class="mt-1  rounded-md shadow-sm">
            
              <label class="font-medium text-sm" v-if="!validEmail || !emailExists || !providerIsEmail || success" >{{validEmail ? emailExists ? providerIsEmail ? !success ? "" : "We've sent you an email with instructions to reset your password! You can now close this page." : "Your account is linked to a different provider. Change your password with them": "This email is not linked to an account!" : "Please enter a valid email!"}}</label>
              <div class="flex z-10 focus:z-20">
                <input type="email" name="Email" @change="emailExists = true" v-model="email" placeholder="Enter your email" class="block w-full min-w-0 flex-1 rounded-l-md border-gray-300 px-3 py-2 sm:text-sm focus:border-gray-300 focus:ring-0">
                <button class="items-center border border-l-0 rounded-r-md border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm" @click="pwdReset()">
                  <ChevronDoubleRightIcon  class="z-40 h-6 w-6" aria-hidden="true" />
                </button>
              </div>
          </div>
        </div>
      </div>
      <button @click="$router.push('/login')" class="ml-2 font-medium text-sm mt-4 mb-6 text-orange-600 hover:text-orange-500 h-fit">
        Back to login
      </button>
    </div>
  </div>
  </div>
  <Notification />
</template>
  