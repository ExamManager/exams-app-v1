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
  mounted() {
    this.resetToken = this.$route.query.token?.toString() || "";
    window.addEventListener('keyup',  (e) => {
      if (e.key === 'Enter') {
        this.pwdReset()
      }
    })
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
      // Notification
      showNotif: false,
      type: "simple",
      text: "",
      colour: "",
      description: "",
      icon: "",
      duration: 3000,
      href: "",
      update: 1,
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
    notification(
      type: string,
      text: string,
      description?: string,
      icon?: string,
      colour?: string,
      duration?: number,
      href?: string
    ) {
      this.showNotif = false;
      this.showNotif = true;
      console.log(this.showNotif);
      console.log("Notification");
      this.type = type || "simple";
      this.text = text || "Notification";
      this.colour = "text-" + colour || "text-green-400";
      this.description = description || "";
      this.icon = icon || "CheckIcon";
      this.duration = duration || 3000;
      this.href = href || "";
      setTimeout(() => {
        this.showNotif = false;
      }, this.duration);
    },
    close() {
      this.showNotif = false;
    },
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
      if (!this.validEmail || this.email == "") {
        this.notification(
          "simple",
          "Invalid email",
          "Please enter a valid email and try again",
          "XCircleIcon",
          "red-400",
          3000
        )

        this.email = ""
        
        console.log('invalid email')
        return false
      }


      const currentEmail = this.email
      const data = await this.checkUserExists({col: 'email', val: currentEmail})

      if (data.length === 1) {
        if (data[0].provider != 'email') {
          this.providerIsEmail = false
          this.notification(
            "simple", 
            "Invalid email", 
            "Your account is linked to a third party provider. Use that account to log in.",
            "XCircleIcon",
            "red-400",
            3000
            )
          
          this.email = ""
        }
        else {
          this.notification(
            "loading",
            "Upadting password...",
            "Please wait while we update your password",
            "ArrowPathIcon",
            "gray-700",
            9999999
          )
          const response = await this.sendPasswordResetEmail(currentEmail)
          console.log(response)
          this.success = true
          this.notification(
            "simple",
            "Success",
            "We sent you a link to reset your password.",
            "CheckIcon",
            "green-400",
            3000
          )
        }
      } else {
        this.emailExists = false
        this.notification(
          "simple",
          "Invalid email",
          "This email is not linked to any account.",
          "XCircleIcon",
          "red-400",
          3000
        )

        this.email = ""
      }
    },
  },
};
</script>
<template>
  <div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
         <p class="font-medium">
           You will recieve an email with a link to reset your password.
         </p>
       </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white pt-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <div class="mt-1  rounded-md shadow-sm">
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
  <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
    <div
      v-if="this.type === 'simple' && showNotif"
      class="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-5 sm:items-start sm:p-4"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex flex-shrink-0">
                  <!-- Icon set by this.icon -->
                  <component :is="this.icon" :class="['h-5', 'w-5', colour]" class="self-center justify-self-center" aria-hidden="true" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">
                    {{this.text}}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{this.description}}
                  </p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    @click="close()"
                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
  <!-- Loading -->
  <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
    <div
      v-if="this.type === 'loading' && showNotif"
      class=" pointer-events-none fixed inset-0 flex items-end px-4 py-5 sm:items-start sm:p-4"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <!-- Icon set by this.icon -->
                  <component :is="this.icon" :class="['h-6', 'w-6', 'animate-spin', this.colour]" aria-hidden="true" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">
                    {{this.text}}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{this.description}}
                  </p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    @click="close()"
                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
  