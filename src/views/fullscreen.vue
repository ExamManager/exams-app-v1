<script lang="ts">

export default {
  data() {
    return {
      fullscreen: false,
      people: [
                { id: "swrfdsfdf", name: "Example Paper", start: "9:00", end: "10:00", duration: "1:00", totalduration: "0:03", timeleft: "1:00", started: false, about: "This is an example Paper to demonstrate the functionality of the Webpage", extratimeenabled: true, readingtimeenabled: false, extratime: "50", readingtime: "", min5warning: false, min15warning: false, min30warning: false , status: "inactive" },
            ],
    };
  },
  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
    },
  },
  mounted() {
    setInterval(() => {
    if (localStorage.getItem('people')) {
      // if there is, then load it into the people array
      this.people = JSON.parse(localStorage.getItem('people') || '{}');
    }
    }, 100);
  },
};
</script>

<template>
    <div class="mt-4 flex flex-col mx-4">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="min-w-[12rem] py-3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900">Subject Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Start Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">End Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Duration</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Time Left</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="person in people" :key="person.id" class="bg-gray-50">
                  <td class='whitespace-nowrap py-4 pr-3 pl-4 text-md font-medium'>
                    {{ person.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {{ person.start }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {{ person.end }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {{ person.duration }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {{ person.timeleft }}
                  </td>
                  <td class="whitespace-nowrap py-4 text-sm text-gray-500">
                    <span v-if="person.status === 'active'" class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                    <span v-else-if="person.status === 'reading'" class="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-500">Reading Time</span>
                    <span v-else-if="person.status === 'extra'" class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-500">Extra Time</span>
                    <span v-else-if="person.status === 'inactive'" class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Not Started</span>
                    <span v-else-if="person.status === 'finished'" class="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">Finished</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>