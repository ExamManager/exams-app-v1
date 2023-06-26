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
    window.addEventListener('keyup',  (e) => {
      if (e.key === 'Enter') {
        this.updatePassword()
      }
    })
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
      const currentPassword = this.password1;
      const currentPassword2 = this.password2;

      if (currentPassword.length < 8) {
        this.notification(
          "simple",
          "Invalid password",
          "Your password must be at least 8 characters long",
          "XCircleIcon",
          "red-400",
          3000
        );
        this.password1 = "";
        this.password2 = "";
      }
      else if (this.showNext === 0) {
        this.showNext = 1;
      }
      else if (currentPassword != currentPassword2) {
        this.notification(
          "simple",
          "Passwords don't match",
          "Your passwords don't match. Check them and resubmit.",
          "XCircleIcon",
          "red-400",
          3000
        );
        this.password2 = "";
      }
      //JUST MAKE SURE THAT EVERYTHING IS CORRECT
      else if (currentPassword.length > 7 && currentPassword === currentPassword2 && this.showNext === 1) {
        this.notification(
          "loading",
          "Upadting password...",
          "Please wait while we update your password",
          "ArrowPathIcon",
          "gray-700",
          9999999
        )
        
        const response = await this.updateUserAuth('none', { password: currentPassword })
        console.log(response)

        if (response.error == null) {
          this.notification(
            "simple",
            "Password changed succesfully",
            "You will now be redirected to your account page.",
            "CheckIcon",
            "green-400",
            3000
          )

          setTimeout(() => {
            window.location.href="/account"
          }, 1000);
        }
        else {
          this.notification(
            "simple",
            "Error",
            "An error occured on our end. Try again later.",
            "XCircleIcon",
            "red-400",
            3000
          )
        }
      }

      // if (this.passwordLength && this.passwordsMatch) {
      //   const response = await this.updateUserAuth('none', { password: currentPassword })
      //   console.log(response)
      // }
    },
  },
});
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://i.vgy.me/HGoEMr.png"
        alt="Workflow"
        @click="showNotification('simple', 'test')"
      />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Reset your password
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <!-- <label
              v-if="!passwordLength || !passwordsMatch"
              class="block text-sm font-medium text-gray-700"
            >
              {{
                passwordLength
                  ? showNext == 1
                    ? passwordsMatch
                      ? ""
                      : "Passwords don't match"
                    : ""
                  : "Password must be at least 8 characters long"
              }}
            </label> -->
            <div class="mt-1 rounded-md shadow-sm">
              <transition
                enter-active-class="transition ease-out duration-400"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-1000"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-10"
              >
                <div class="flex z-10 focus:z-20">
                  <input
                    type="password"
                    v-model="password1"
                    name="password1"
                    :class="[
                      ' block w-full min-w-0 flex-1  border-gray-300 px-3 py-2 sm:text-sm focus:border-gray-300 focus:ring-0',
                      showNext == 1
                        ? 'rounded-md rounded-b-none rounded-t-md'
                        : 'rounded-l-md',
                    ]"
                    placeholder="Enter your new password"
                  />
                  <button
                    v-if="showNext == 0"
                    class="items-center border border-l-0 rounded-r-md border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                    @click="updatePassword()"
                  >
                    <ChevronDoubleRightIcon class="z-40 h-6 w-6" aria-hidden="true" />
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
                <div v-if="showNext == 1" class="flex z-10 focus:z-20">
                  <!-- SignIn -->
                  <input
                    type="password"
                    v-model="password2"
                    name="password2"
                    class="focus:border-gray-300 focus:ring-0 block w-full min-w-0 flex-1 rounded-none border-gray-300 px-3 py-2 sm:text-sm rounded-t-none rounded-l-md"
                    placeholder="Confirm your new password"
                  />
                  <button
                    @click="updatePassword()"
                    class="items-center border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm rounded-b-md rounded-r-md rounded-t-none rounded-l-none"
                  >
                    <ChevronDoubleRightIcon class="z-40 h-6 w-6" aria-hidden="true" />
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
