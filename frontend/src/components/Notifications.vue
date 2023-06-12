<script lang="ts">
import * as SolidIcons from "@heroicons/vue/20/solid";

export default {
  components: {
    ...SolidIcons,
  },
  name: "Notification",
  data() {
    return {
      showNotif: false,
      type: "simple",
      text: "",
      icon: "",
      duration: 0,
      href: "",
    };
  },
  methods: {
    showNotification(type: string, text: string, icon?: string, duration?: number, href?: string) {
      console.log("Notification")
      this.type = type || "simple";
      this.text = text || "Notification";
      this.icon = icon || "CheckIcon";
      this.duration = duration || 3000;
      this.href = href || "";
      this.showNotif = true;
      setTimeout(() => {
        this.showNotif = false;
      }, this.duration);
    },
    close() {
      this.showNotif = false;
    },
  },
};
</script>

<template>
  <transition enter-active-class="transform ease-in duration-400 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-400"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div>
      <div v-if="this.type === 'simple'" aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
          <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
          <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div
              class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="p-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium text-gray-900">Successfully saved!</p>
                    <p class="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
                  </div>
                  <div class="ml-4 flex flex-shrink-0">
                    <button type="button" @click="close()"
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
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

      <div v-if="this.type === 'condensed'" aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
          <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
          <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div
              class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="p-4">
                <div class="flex items-center">
                  <div class="flex w-0 flex-1 justify-between">
                    <p class="w-0 flex-1 text-sm font-medium text-gray-900">Discussion archived</p>
                    <button type="button"
                      class="ml-3 flex-shrink-0 rounded-md bg-white text-sm font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Undo</button>
                  </div>
                  <div class="ml-4 flex flex-shrink-0">
                    <button type="button" @click="close()"
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
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

      <div v-if="this.type === 'action'" aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
          <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
          <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div
              class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="p-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <InboxIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium text-gray-900">Discussion moved</p>
                    <p class="mt-1 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit
                      oluptatum tenetur.</p>
                    <div class="mt-3 flex space-x-7">
                      <button type="button"
                        class="rounded-md bg-white text-sm font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Undo</button>
                      <button type="button"
                        class="rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Dismiss</button>
                    </div>
                  </div>
                  <div class="ml-4 flex flex-shrink-0">
                    <button type="button" @click="close()"
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
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
    </div>
  </transition>
</template>