<script lang="ts">
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import authenticate from '../../functions/authenticate';
import Notification from '../../components/Notification.vue'

export default {
  mixins: [authenticate, Notification],
  name: "Login",
  components: {
    HomeIcon,
    ChevronRightIcon
  },
  data() {
    return {
      test: "test",
      email: "",
      password: "",
      passwordverify: "",
      showNext: 0, // 0 = checking email, 1 = login, 2 = signup
      validEmail: true,
      validPassword: false,
      emailExists: true,
      error: "",
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
  mounted() {
    const url = this.$route.fullPath
    // split at ? and take the second part
    const urlParams = url.split('?')[1]
    this.email = urlParams
    if (this.email != null) {
      this.checkEmail()
      this.$router.fullPath = "/login"
    }
    // add event listener for enter key
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        if (this.showNext == 0) {
          this.checkEmail()
        } else if (this.showNext == 1) {
          this.signinlocal()
        } else if (this.showNext == 2) {
          this.signuplocal()
        }
      }
    })
  },
  methods: {
    async signinlocal() {
      this.error = ""
      this.notification("loading", "Signing in...", "Please wait while we sign you in" , "ArrowPathIcon", "gray-700" , 2000) 
      const currentEmail = this.email
      const currentPassword = this.password
      const response = await this.signin(currentEmail, currentPassword);
      console.log(response)
      if (response.error != null) {
        if (response.error == "AuthApiError: Invalid login credentials") {
          this.notification("simple", "Invalid login credentials", "Please make sure your email and password are correct", "XCircleIcon", "red-400" , 3000)
          this.password = ""
        } else {
          this.notification("simple", "An error occured", "Please try again later", "XCircleIcon", "red-400" , 3000)
          this.showNext = 0
          this.password = ""
          this.email = ""
        }
      } else {
        this.notification("simple", "Signed in Succesfully", "You will be redirected to the home page", "CheckIcon", "green-400" , 3000)
        setTimeout(() => {
          window.location.href='/';
        }, 1000);
      }
    },
    async signuplocal() {
      if (this.password != this.passwordverify) {
        this.notification("simple", "Passwords do not match", "Please make sure your passwords match", "XCircleIcon", "red-400" , 3000)
        this.passwordverify = ""
        return
      }
      if (this.password.length < 8) {
        this.notification("simple", "Password too short", "Please make sure your password is at least 8 characters long", "XCircleIcon", "red-400" , 3000)
        this.password = ""
        this.passwordverify = ""
        return
      }
      this.notification("loading", "Creating account...", "Please wait while we create your account" , "ArrowPathIcon", "gray-700" , 2000)
      const currentEmail = this.email
      const currentPassword = this.password
      const response = await this.signup(currentEmail, currentPassword);
      console.log(response)
      if (response.error != null) {
        if (response.error == "AuthApiError: Email already exists") {
          this.notification("simple", "Email already exists", "Please try logging in", "XCircleIcon", "red-400" , 3000)
          this.showNext = 0
          this.password = ""
          this.email = ""
        } else {
          this.notification("simple", "An error occured", "Please try again later", "XCircleIcon", "red-400" , 3000)
          this.showNext = 0
          this.password = ""
          this.email = ""
        }
      } else {
        this.notification("simple", "Account created Succesfully", "You will be redirected to the Setup Page", "CheckIcon", "green-400" , 3000)
        setTimeout(() => {
          window.location.href='/setup';
        }, 2000);
      }

    },
    async googlelocal() {
      const response = await this.signingoogle();
      console.log('googleSignInResponse: ', response)
      localStorage.setItem("googleSignInReponse", JSON.stringify(response));
      return response
    },
    async checkEmail() {
      // check that emails contains @ and .
      if (this.email.includes("@") && this.email.includes(".")) {
        this.validEmail = true
      } else {
        this.validEmail = false
        this.notification("simple", "Invalid email", "Please make sure your email is valid", "XCircleIcon", "red-400" , 3000)
        return
      }
      this.notification("loading", "Checking email...", "Searching Databases for User" , "ArrowPathIcon", "gray-700")
      const currentEmail = this.email
      const response = await this.checkUserExists({ col: "email", val: currentEmail })
      this.emailExists = ((response||[]).length === 1)
      console.log('emailExists: ', this.emailExists)

      if (this.emailExists) {
        this.showNext = 1
      } else {
        this.showNext = 2
      }
      this.close()
    },
    pwdReset() {
      window.location.href="/reset"
    },
    notification(
      type: string,
      text: string,
      description?: string,
      icon?: string,
      colour?: string,
      duration?: number,
      href?: string
    ) {
      this.showNotif = false
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
    }
  },
};
</script>
<template>
  <div class="flex min-h-full flex-col justify-center py-32 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://i.vgy.me/HGoEMr.png" alt="Workflow" />
      <h2 class="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">{{ showNext != 2 ? "Login to your account" : "Create your Account" }}</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Login
        <a class="font-medium">
          to view your dashboard
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <transition
                enter-active-class="transition ease-out duration-500"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-1000"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-10"
              >
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <div v-if="showNext != 0" class=" grid grid-cols-2" >
              <div class="flex pb-2 col-span-1" @click="showNext = 0" >
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                <button class="text-sm font-medium text-gray-900">Back</button>
              </div>
              <div class="flex pb-2 col-span-1 justify-end" @click="showNext == 2 ? signuplocal() : signinlocal()" >
                <button class="text-sm font-medium text-gray-900">{{ showNext == 1 ? 'Login' : 'Create Account' }}</button>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <div class="mt-1  rounded-md shadow-sm">
              <transition
                enter-active-class="transition ease-out duration-400"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
              >
              <div class="flex z-10 focus:z-20">
                <input type="email" v-model="email" name="Email" :disabled="showNext != 0" :class="[
                  ' block w-full min-w-0 flex-1 border-gray-300 px-3 py-2 sm:text-sm focus:border-gray-300 focus:ring-0',
                  showNext != 0 ? '  rounded-t-md rounded-b-none rounded-l-none' : 'rounded-md rounded-r-none',]" placeholder="you@example.com" />
                <button v-if="showNext == 0" class="items-center border border-l-0 rounded-r-md border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm" @click="checkEmail()">
                  <ChevronDoubleRightIcon  class=" z-40 h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              </transition>
              <transition
                enter-active-class="transition ease-out duration-700"
                enter-from-class="opacity-0 "
                enter-to-class="opacity-100 "
              >
               <div v-if="showNext == 1" class="flex z-10 focus:z-20"> <!-- SignIn -->
                <input v-model="password" type="password" name="Password" class="focus:border-gray-300 focus:ring-0 block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 px-3 py-2 sm:text-sm rounded-t-none" placeholder="Password" />
                <button @click="signinlocal()" class="items-center border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm rounded-b-md rounded-r-md rounded-t-none rounded-l-none" >
                  <ChevronDoubleRightIcon  class=" z-40 h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              </transition>
              <transition
                enter-active-class="transition ease-out duration-700"
                enter-from-class="opacity-0 "
                enter-to-class="opacity-100 "
              >
              <div v-if="showNext == 2" class="flex z-10 focus:z-20"> <!-- SignUp -->
                <input v-model="password" type="password" name="Password" class="focus:border-gray-300 focus:ring-0 block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 px-3 py-2 sm:text-sm rounded-t-none" placeholder="Password" />
                <input v-model="passwordverify" type="password" name="Password" class="focus:border-gray-300 focus:ring-0 block w-full min-w-0 flex-1 rounded-none border-gray-300 px-3 py-2 sm:text-sm rounded-t-none" placeholder="Verify Password" />
                <button @click="signuplocal()" class="items-center border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm rounded-b-md rounded-r-md rounded-t-none rounded-l-none" >
                  <ChevronDoubleRightIcon  class=" z-40 h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              </transition>
              
            </div>
            <button @click="$router.push('/reset')" class="pt-4 pl-1 font-medium text-sm text-orange-600 hover:text-orange-500 h-fit">
              Forgot your password?
            </button>
          </div>

        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid  gap-3">
            <div>
              <a @click="googlelocal"
                class="inline-flex w-full justify-center rounded-md border col-span-3 border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                <span class="sr-only">Sign in with Google</span>
                <svg class="h-6 w-max" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"
                  version="1.1" width="512" height="512" viewBox="0 0 512 512">
                  <g transform="matrix(1.5838926,0,0,1.5838926,18.416107,18.416107)" fill="none">
                    <path
                      d="m293 153.4c0-10.6-0.9-20.7-2.7-30.5l-140.3 0 0 57.6 80.2 0c-3.4 18.6-13.9 34.4-29.7 45l0 37.4 48.2 0c28.2-25.9 44.4-64.1 44.4-109.5z"
                      fill="#4285f4" />
                    <path
                      d="m150 299c40.2 0 74-13.3 98.6-36.1l-48.1-37.4c-13.3 8.9-30.4 14.2-50.5 14.2-38.8 0-71.7-26.2-83.4-61.4l-49.8 0 0 38.6C41.4 265.6 91.8 299 150 299Z"
                      fill="#34a853" />
                    <path
                      d="m66.6 178.3c-3-8.9-4.7-18.5-4.7-28.3 0-9.8 1.7-19.4 4.7-28.3l0-38.6-49.8 0C6.8 103.2 1 126 1 150c0 24 5.8 46.8 15.9 66.9l49.8-38.6z"
                      fill="#fbbc05" />
                    <path
                      d="m150 60.3c21.9 0 41.5 7.5 57 22.3L249.7 39.8C223.9 15.8 190.2 1 150 1 91.8 1 41.4 34.4 16.9 83.1l49.8 38.6C78.3 86.5 111.2 60.3 150 60.3Z"
                      fill="#ea4335" />
                    <path d="M1 1 299 1 299 299 1 299 1 1Z" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
  <!-- Notification -->
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
                  <div class="flex-shrink-0">
                    <!-- Icon set by this.icon -->
                    <component :is="this.icon" :class="['h-6', 'w-6', this.colour]" aria-hidden="true" />
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
  