<script lang="ts">
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    hide() {
      this.show = !this.show;
      sessionStorage.setItem('show', String(this.show));
    },
  },
  mounted() {
    // check which page is shows, and if it is on "/fullscreen" then hide the navbar always
    if (window.location.pathname == "/fullscreen") {
      console.log(window.location.pathname)
      this.show = false;
    } else {
      var show = sessionStorage.getItem('show');
      if (show === "false") {
      this.show = false;
    } else {
      this.show = true;
    }
    }
  },
};

</script>
<template>
    <transition enter-active-class="transform ease-out duration-400 transition" enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="this.show" class="fixed inset-x-0 bottom-0 pb-2 sm:pb-5" >
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="rounded-lg p-2 bg-gray-50 shadow-lg sm:p-3">
            <div class="flex flex-wrap items-center justify-between">
            <div class="flex w-0 flex-1 items-center">
                <span class="flex rounded-lg bg-gray-100 p-2">
                    <svg class="h-6 w-6 text-black" x-description="Heroicon name: outline/megaphone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"></path>
                    </svg>
                </span>
                <p class="ml-3 truncate font-medium text-black">
                <span class="hidden md:inline">Big news! We're excited to announce a brand new product.</span>
                </p>
            </div>
            <div class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-200">Learn more</a>
            </div>
            <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button type="button" class="-mr-1 flex rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white" @click="hide">
                <span class="sr-only">Dismiss</span>
                <svg class="h-6 w-6 text-black" x-description="Heroicon name: outline/x-mark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </transition>
    <main>
      <router-view />
    </main>
  </template>