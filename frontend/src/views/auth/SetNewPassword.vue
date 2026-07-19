<script lang="ts">
import { LockClosedIcon, ChevronDoubleRightIcon } from "@heroicons/vue/20/solid";
import authenticate from "../../functions/authenticate.ts";
import Notification from "../../components/Notifications.vue";

export default (await import("vue")).defineComponent({
  name: "Reset Password",
  mixins: [authenticate, Notification],
  components: {
    LockClosedIcon,
    ChevronDoubleRightIcon,
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
    this.resetToken = this.$route.query.token?.toString() || "";
  },
  watch: {
    password1: {
      handler: function (newVal) {
        this.passwordLength = newVal.length > 7;
      },
    },
    password2: {
      handler: function (newVal) {
        this.passwordsMatch = this.password1 === newVal;
      },
    },
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
    addressPassword() {},
    async updatePassword() {
      return;
    },
  },
});
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="/logo.png"
        alt="Workflow"
        @click="showNotification('simple', 'test')"
      />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Reset your password
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div
          role="status"
          class="mb-4 flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-950"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="h-3.5 w-3.5 shrink-0 opacity-80"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h18.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <p>Login is currently unavailable.</p>
        </div>
        <fieldset disabled class="min-w-0 space-y-6">
          <div class="mt-1 rounded-md shadow-sm">
            <div class="flex z-10 focus:z-20">
              <input
                type="password"
                name="password1"
                readonly
                value=""
                class="block w-full min-w-0 flex-1 rounded-l-md border-gray-300 px-3 py-2 opacity-60 sm:text-sm"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                disabled
                class="items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 opacity-60 sm:text-sm"
              >
                <ChevronDoubleRightIcon class="z-40 h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </fieldset>
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
