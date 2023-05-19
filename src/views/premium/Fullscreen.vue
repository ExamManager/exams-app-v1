<script lang="ts">
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

export default {
  name: "Premium Fullscreen",
  components: {
    HomeIcon,
    ChevronRightIcon
  },
  data() {
    return {
      fullscreen: false,
      timestamp: "",
      datestamp: "",
      people: [
                { id: "swrfdsfdf", name: "Example Paper", start: "9:00", end: "10:00", duration: "1:00", totalduration: "0:03", timeleft: "1:00", started: false, about: "This is an example Paper to demonstrate the functionality of the Webpage", extratimeenabled: true, readingtimeenabled: false, extratime: "50", readingtime: "", min5warning: false, min15warning: false, min30warning: false , status: "inactive" },
            ],
    };
  },
  methods: {
    fullscreen1() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    },
    updateTime() {
        var d = new Date();
        var n = d.toLocaleTimeString("de-EN");
        this.timestamp = n;
    },
    updateDate() {
        var d = new Date();
        var n = d.toLocaleDateString();
        this.datestamp = n;
    },
  },
  mounted() {
    // full screen
    setInterval(() => {
    this.updateTime();
    this.updateDate();
    if (localStorage.getItem('people')) {
      // if there is, then load it into the people array
      this.people = JSON.parse(localStorage.getItem('people') || '{}');
    }
    }, 100);
  },
};
</script>

<template>
  <nav class="flex fixed pt-4 pl-4 z-30" aria-label="Breadcrumb">
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
            <a href="/premium" class="mx-4 text-sm font-medium text-gray-500 hover:text-gray-700">Premium</a>
          </div>
          <div class="flex items-center">
            <ChevronRightIcon class="h-10 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Studentview</a>
          </div>
        </li>
      </ol>
      <div class="mt-4 space-x-4 sm:mt-0 sm:flex-none pl-2">
        <span class="isolate inline-flex rounded-md shadow bg-white">
          <button type="button" class="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm group/button1 font-medium text-gray-500 hover:bg-gray-50 focus:z-10" @click.native="fullscreen1">
            <svg class=" h-6 w-4 group-hover/button1:mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M496 304h-416v-224H32v240c0 17.6 14.4 32 32 32L264 352v47.02l-72 72c-9.354 9.352-9.354 24.52 0 33.88c9.348 9.348 24.51 9.359 33.87 .0195L288 442.9l62.09 62.09c9.391 9.391 24.63 9.348 33.97-.0938c9.301-9.406 9.258-24.55-.0938-33.91L312 399V352L512 352c17.6 0 32-14.4 32-32V80h-48V304zM552 0H23.96C10.72 0 0 10.73 0 23.95S10.72 48 23.96 48h528.1C565.3 48 576 37.27 576 24.05S565.3 0 552 0z"/></svg>
            <span class="text-md w-0 collapse group-hover/button1:visible group-hover/button1:w-min">Fullscreen</span>
          </button>
        </span>
      </div>
    </nav>
  <div class="pr-4 pt-4">
    <div class="flex justify-end">
      <div class="flex flex-col items-end">
        <div class="flex flex-row">
          <div class="text-7xl font-bold text-gray-900">{{ timestamp }}</div>
        </div>
        <div class="flex flex-row">
          <div class="text-2xl font-bold text-gray-900">{{ datestamp }}</div>
        </div>
      </div>
    </div>
  </div>
    <div class="mt-4 flex flex-col mx-4">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="min-w-[12rem] py-3.5 pl-4 pr-3 text-left text-xl font-semibold text-gray-900">Subject Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">Start Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">End Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">Duration</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">Time Left</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="person in people" :key="person.id" class="bg-white">
                  <td class='whitespace-nowrap py-4 pr-3 pl-4 text-lg font-medium'>
                    {{ person.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-lg text-gray-500">
                    {{ person.start }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-lg text-gray-500">
                    {{ person.end }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-lg text-gray-500">
                    {{ person.duration }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-lg text-gray-500">
                    {{ person.timeleft }}
                  </td>
                  <td class="whitespace-nowrap py-4 text-sm text-gray-500">
                    <span v-if="person.status === 'active'" class="inline-flex rounded-full bg-green-100 px-2 text-sm font-semibold leading-5 text-green-800">Active</span>
                    <span v-else-if="person.status === 'reading'" class="inline-flex rounded-full bg-orange-100 px-2 text-sm font-semibold leading-5 text-orange-500">Reading Time</span>
                    <span v-else-if="person.status === 'extra'" class="inline-flex rounded-full bg-blue-100 px-2 text-sm font-semibold leading-5 text-blue-500">Extra Time</span>
                    <span v-else-if="person.status === 'inactive'" class="inline-flex rounded-full bg-red-100 px-2 text-sm font-semibold leading-5 text-red-800">Not Started</span>
                    <span v-else-if="person.status === 'finished'" class="inline-flex rounded-full bg-gray-100 px-2 text-sm font-semibold leading-5 text-gray-800">Finished</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>