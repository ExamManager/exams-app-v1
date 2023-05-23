<script lang="ts">
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import authenticate from '../../functions/authenticate';

export default {
  mixins: [authenticate],
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
    };
  },
  methods: {
    async signinlocal() {
      const response = this.signin(this.email, this.password);
      console.log(response)
    },
    async signuplocal() {
      const response = this.signup(this.email, this.password);
      console.log(response)
    },
    async googlelocal() {
      const response = this.signingoogle();
      console.log(response)
    },

  },
};
</script>

<template>
    <nav class="flex fixed pt-4 pl-4" aria-label="Breadcrumb">
      <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
        <li class="flex">
          <div class="flex items-center">
            <a href="/" class="text-gray-400 flex items-center hover:text-gray-500">
                <HomeIcon class="h-10 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <a class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
            </a>
          </div>
        </li>
        <li class="flex">
          <div class="flex items-center">
            <ChevronRightIcon class="h-10 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <a href="/login" class="mx-4 text-sm font-medium text-gray-500 hover:text-gray-700">Login</a>
          </div>
        </li>
      </ol>
    </nav>

    <div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-12 w-auto" src="src/assets/vue.svg" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <a href="/" class="font-medium text-orange-600 hover:text-orange-500">Create an Account</a>
        </p>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input v-model="email"  type="email" autocomplete="email" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" />
              </div>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input v-model="password"  type="password" autocomplete="current-password" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" />
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
              <button @click="signinlocal" class="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Sign in</button>
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
                  <span class="sr-only">Sign in with Google</span>
                  // google svg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  