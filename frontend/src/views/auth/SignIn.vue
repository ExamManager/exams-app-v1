<script lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import DeprecationBanner from "../../components/DeprecationBanner.vue";

export default {
  name: "Login",
  components: {
    ExclamationTriangleIcon,
    DeprecationBanner,
  },
};
</script>
<template>
  <div>
    <DeprecationBanner />
    <div class="flex min-h-full flex-col justify-center py-32 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          src="https://i.vgy.me/HGoEMr.png"
          alt="Exam Timer"
        />
        <h2
          class="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          Login to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Login
          <a class="font-medium"> to view your dashboard </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div
            role="status"
            class="mb-4 flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-950"
          >
            <ExclamationTriangleIcon
              class="h-3.5 w-3.5 shrink-0 opacity-80"
              aria-hidden="true"
            />
            <p>Login is currently unavailable.</p>
          </div>

          <fieldset disabled class="min-w-0 space-y-6">
            <form @submit.prevent class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  readonly
                  value=""
                  placeholder="you@example.com"
                  class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <input
                  type="password"
                  readonly
                  value=""
                  placeholder="Password"
                  class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled
                class="flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white opacity-60 shadow-sm"
              >
                Sign in
              </button>
            </form>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white px-2 text-gray-500"
                  >Or continue with</span
                >
              </div>
            </div>

            <button
              type="button"
              disabled
              class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 opacity-60 shadow-sm"
            >
              Google
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
