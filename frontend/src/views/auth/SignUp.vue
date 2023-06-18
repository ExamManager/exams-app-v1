<script lang="ts">
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import authenticate from '../../functions/authenticate';

export default {
  mixins: [authenticate],
  name: "SignUp",
  components: {
    HomeIcon,
    ChevronRightIcon
  },
  data() {
    return {
      test: "test",
      email: "",
      password: "",
    };
  },
  methods: {
    async signuplocal() {
      const response = await this.signup(this.email, this.password);
      console.log(response)
      window.location.href = "/";
    },
    async googlelocal() {
      const response = this.signingoogle();
      console.log(response)
    },
  },
};
</script>

<template>
    <div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-12 w-auto" src="https://i.vgy.me/HGoEMr.png" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <a @click="this.$router.push('/login')" class="font-medium text-orange-600 hover:text-orange-500">Login to your Account</a>
        </p>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input v-model="email" type="email" autocomplete="email" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" />
              </div>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input v-model="password" type="password" autocomplete="current-password" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" />
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
  
              <div class="text-sm">
                <a @click='this.$router.push("/")' class="font-medium text-orange-600 hover:text-orange-500">Forgot your password?</a>
              </div>
            </div>
  
            <div>
              <button @click="signuplocal" class="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Sign up</button>
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
                <a @click="googlelocal" class="inline-flex w-full justify-center rounded-md border col-span-3 border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                  <span class="sr-only">Sign up with Google</span>
                  <svg class="h-6 w-max" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" viewBox="0 0 512 512"><g transform="matrix(1.5838926,0,0,1.5838926,18.416107,18.416107)" fill="none"><path d="m293 153.4c0-10.6-0.9-20.7-2.7-30.5l-140.3 0 0 57.6 80.2 0c-3.4 18.6-13.9 34.4-29.7 45l0 37.4 48.2 0c28.2-25.9 44.4-64.1 44.4-109.5z" fill="#4285f4"/><path d="m150 299c40.2 0 74-13.3 98.6-36.1l-48.1-37.4c-13.3 8.9-30.4 14.2-50.5 14.2-38.8 0-71.7-26.2-83.4-61.4l-49.8 0 0 38.6C41.4 265.6 91.8 299 150 299Z" fill="#34a853"/><path d="m66.6 178.3c-3-8.9-4.7-18.5-4.7-28.3 0-9.8 1.7-19.4 4.7-28.3l0-38.6-49.8 0C6.8 103.2 1 126 1 150c0 24 5.8 46.8 15.9 66.9l49.8-38.6z" fill="#fbbc05"/><path d="m150 60.3c21.9 0 41.5 7.5 57 22.3L249.7 39.8C223.9 15.8 190.2 1 150 1 91.8 1 41.4 34.4 16.9 83.1l49.8 38.6C78.3 86.5 111.2 60.3 150 60.3Z" fill="#ea4335"/><path d="M1 1 299 1 299 299 1 299 1 1Z"/></g></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  