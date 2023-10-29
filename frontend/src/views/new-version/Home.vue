<script lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/vue";
import { HomeIcon, ChevronRightIcon, ChevronDownIcon, CogIcon, StarIcon, EllipsisHorizontalIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";
import { Exam, NewExam } from "../../components/classes";
import CreateExam from "./CreateExam.vue"
import UpdateExam from "./UpdateExam.vue"
import Favourites from "./Favourites.vue"

export default {
  name: "Free",
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    HomeIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    CogIcon,
    StarIcon,
    EllipsisHorizontalIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    CreateExam,
    UpdateExam,
    Favourites,
  },
  data() {
    return {
      test: "test",
      open: false,
      exams: [] as Exam[],
      selectedExams: [] as number[], // stores the ids of the selected exams
      detailedExam: 2, // stores the id of which exam is showing the details
      setup: {
        autostart: false, // automatically start the exam when the start time is reached
        synctimers: false, // makes timers wait and sync with the clock on start
      },
      modals: {
        newExam: false,
        editExam: false,
        settings: false,
        favourites: false,
      },
      editexam: 0,
    };
  },
  setup() {
    const timestamp = ref(new Date().toLocaleTimeString());
    const datestamp = ref(new Date().toLocaleDateString());

    setInterval(() => {
      timestamp.value = new Date().toLocaleTimeString();
      datestamp.value = new Date().toLocaleDateString();
    }, 1000);

    return { timestamp, datestamp };
  },
  mounted() {
    this.addExam({
      name: "Physics Paper 4",
      about: "Each student recieves one Formula Booklet...",
      start: new Date("2021-10-10T12:37:00"),
      extratime: 15,
      // end: new Date("2021-10-10T14:37:00"),
      duration: 180,
    });
    this.addExam({
      name: "Physics Paper 3",
      about: "Each student recieves one Formula Booklet...",
      start: new Date("2021-10-10T12:37:00"),
      extratime: 15,
      // end: new Date("2021-10-10T14:37:00"),
      duration: 180,
    });
    this.addExam({
      name: "Physics Paper 7",
      about: "Each student recieves one Formula Booklet...",
      start: new Date("2021-10-10T12:37:00"),
      extratime: 15,
      // end: new Date("2021-10-10T14:37:00"),
      duration: 180,
    });
    // add an example exam
    setTimeout(() => {
      this.addExam({
        name: "Physics Paper 1",
        about: "Each student recieves one Formula Booklet...",
        start: new Date("2021-10-10T09:37:00"),
        end: new Date("2021-10-10T09:38:00"),
        readingtime: 1,
        // duration: 120,
      });
    }, 100);
    setTimeout(() => {
      this.addExam({
        name: "Physics Paper 2",
        about: "Each student recieves one Formula Booklet...",
        start: new Date("2021-10-10T12:37:00"),
        extratime: 15,
        // end: new Date("2021-10-10T14:37:00"),
        duration: 180,
        reminders: [5, 30]
      });
    }, 300);


  },
  watch: {

  },
  methods: {
    addExam(exam: NewExam) {
      // the id should just look for the largest number stored for any exam id and add one
      let id = Math.max(...this.exams.map(exam => exam.id)) + 1;
      if (id === -Infinity) {
        id = 1;
      }
      const about = exam.about || "";
      // either end time or duration must be provided, calculate the other
      const end = exam.end || new Date(exam.start.getTime() + exam.duration! * 60000);
      const duration = (exam.duration || (exam.end!.getTime() - exam.start.getTime()) / 60000) * 60;
      const readingtime = (exam.readingtime || 0) * 60
      // extratime is percentage, convert it into seconds
      const extratime = duration * (exam.extratime || 0) / 100;
      // (new Date(exam.end) - new Date(exam.start)).toString().slice(11, 19)
      const timeleft = new Date(duration * 1000).toISOString().slice(11, 19)
      const status = "Not Started";
      const newexam: Exam = {
        id,
        name: exam.name,
        about,
        start: exam.start,
        plannedstart: exam.start,
        end,
        plannedend: end,
        duration,
        readingtime,
        extratime,
        extratimepercentage: exam.extratime || 0,
        timeleft,
        status,
        started: false,
        reminders: exam.reminders || [],
      };

      this.exams.push(newexam);
      // calculate the time left for the exam
      console.log(this.exams.map(exam => exam.id))
    },
    async startExam(id: number) {
      console.log(this.setup)
      const exam = this.exams.find((exam) => exam.id === id);
      if (!exam) return;
      exam.started = true;
      exam.start = new Date();
      // depending on whether there is reading time and/or extra time, add them up to the start time. both reading and extra time are in seconds
      const totalDuration = exam.duration + exam.readingtime;
      exam.end = new Date(exam.start.getTime() + totalDuration * 1000);
      const readingtimeends = new Date(exam.start.getTime() + exam.readingtime * 1000);
      exam.readingtimeends = readingtimeends;
      const extratime = exam.extratime || 0;
      const extratimeends = new Date(exam.start.getTime() + totalDuration * 1000 + extratime * 1000);
      exam.extratimeends = extratimeends;

      if (exam.readingtime > 0) {
        exam.status = "Reading";
        await this.countdown(exam, readingtimeends);
      }

      if (exam.duration > 0) {
        exam.status = "Active";
        await this.countdown(exam, exam.end);
      }

      if (extratime > 0) {
        exam.status = "Extra Time";
        await this.countdown(exam, extratimeends);
      }

      exam.status = "Finished";
      exam.started = false;
    },
    countdown(exam: any, endTime: Date) {
      if (!this.setup.synctimers) {
        return this.countdown1(exam, endTime);
      } else {
        return this.countdown2(exam, endTime);
      }
    },
    countdown1(exam: any, endTime: Date) {
      return new Promise<void>(resolve => {
        const intervalId = setInterval(() => {
          const now = new Date();
          const timeLeftInMilliseconds = endTime.getTime() - now.getTime();
          if (timeLeftInMilliseconds > 0) {
            const timeLeftInSeconds = Math.floor(timeLeftInMilliseconds / 1000);
            const hours = Math.floor(timeLeftInSeconds / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((timeLeftInSeconds % 3600) / 60).toString().padStart(2, '0');
            const seconds = (timeLeftInSeconds % 60).toString().padStart(2, '0');
            exam.timeleft = `${hours}:${minutes}:${seconds}`;
          } else {
            exam.timeleft = '00:00:00';
            clearInterval(intervalId);
            resolve();
          }
        }, 100);
        exam.intervalId = intervalId; // Store the interval ID
      });
    },
    countdown2(exam: any, endTime: Date) {
      return new Promise<void>(resolve => {
        // Calculate the time until the next full second
        const now = new Date();
        const delay = 1000 - now.getMilliseconds();
        const timeLeftInMilliseconds = endTime.getTime() - now.getTime();
        const timeLeftInSeconds = Math.floor(timeLeftInMilliseconds / 1000) - 1;
        const hours = Math.floor(timeLeftInSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((timeLeftInSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (timeLeftInSeconds % 60).toString().padStart(2, '0');
        exam.timeleft = `${hours}:${minutes}:${seconds}`;

        // Start the interval after the delay
        setTimeout(() => {
          const intervalId = setInterval(() => {
            const now = new Date();
            const timeLeftInMilliseconds = endTime.getTime() - now.getTime();
            if (timeLeftInMilliseconds > 0) {
              const timeLeftInSeconds = Math.floor(timeLeftInMilliseconds / 1000);
              const hours = Math.floor(timeLeftInSeconds / 3600).toString().padStart(2, '0');
              const minutes = Math.floor((timeLeftInSeconds % 3600) / 60).toString().padStart(2, '0');
              const seconds = (timeLeftInSeconds % 60).toString().padStart(2, '0');
              exam.timeleft = `${hours}:${minutes}:${seconds}`;
            } else {
              exam.timeleft = '00:00:00';
              clearInterval(intervalId);
              resolve();
            }
          }, 1000);
          exam.intervalId = intervalId; // Store the interval ID
        }, delay);
      });
    },
    stopExam(id: number) {
      const exam = this.exams.find((exam) => exam.id === id);
      if (!exam) return;
      exam.started = false;
      exam.status = "Not Started";
      clearInterval(exam.intervalId); // Stop the countdown
    },
    removeExam(id: number) {
      const examIndex = this.exams.findIndex((exam) => exam.id === id);
      if (examIndex === -1) return;
      this.exams.splice(examIndex, 1);
    },
    startSelected() {
      // make sure to not start exams that have already started
      this.selectedExams.forEach((id) => {
        const exam = this.exams.find((exam) => exam.id === id);
        if (!exam) return;
        if (!exam.started) {
          this.startExam(id);
        }
      });
    },
    deleteSelected() {
      this.selectedExams.forEach((id) => this.removeExam(id));
      this.selectedExams = [];
    },
    editExam(id: number) {
      const exam = this.exams.find((exam) => exam.id === id);
      if (!exam) return;
      this.editexam = id;
      this.modals.editExam = true;
    },
    duplicateExam(id: number) {
      const exam = this.exams.find((exam) => exam.id === id);
      if (!exam) return;
      const newexam: NewExam = {
        name: exam.name + " (Copy)",
        about: exam.about,
        start: exam.plannedstart,
        end: exam.plannedend,
        duration: exam.duration,
        readingtime: exam.readingtime,
        extratime: exam.extratimepercentage,
        reminders: exam.reminders,
      };
      this.addExam(newexam);
    },
  },
};
</script>

<template>
  <CreateExam v-if="modals.newExam" @close="modals.newExam = false" @add="addExam" />
  <UpdateExam v-if="modals.editExam" @close="modals.editExam = false" :exam="exams.find(exam => exam.id === editexam)"
    @update="removeExam(editexam); addExam($event)" />
  <Favourites v-if="modals.favourites" @close="modals.favourites = false" />
  <div class="px-4 sm:px-6 lg:px-8 lg:pt-8">
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

    <div class="sm:flex sm:items-center">
      <div class="mt-4 space-x-4 sm:mt-0 sm:flex-none">
        <span class="isolate inline-flex rounded-md shadow-sm">
          <button type="button"
            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            @click="modals.newExam = true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="-ml-1 mr-2 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Add Exam
          </button>
          <button type="button"
            class="hover-button relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
            <EllipsisHorizontalIcon class=" h-5 w-5 text-gray-400 visible-button " aria-hidden="true" />
            <div class="hidden-buttons -my-4 -mr-4 -ml-3 ">
              <!-- Your buttons go here -->
              <button type="button" @click="$router.push('/account?timer')"
                class="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                <CogIcon class="-ml-1 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
              <button type="button" @click="modals.favourites = true"
                class="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                <StarIcon class="-ml-1 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
              <button type="button" @click="toggleFullScreen"
                class="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                <span class="sr-only">Sort</span>
                <!-- Heroicon name: solid/sort-ascending -->
                <svg class="h-5 w-5  text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path fill="currentColor"
                    d="M496 304h-416v-224H32v240c0 17.6 14.4 32 32 32L264 352v47.02l-72 72c-9.354 9.352-9.354 24.52 0 33.88c9.348 9.348 24.51 9.359 33.87 .0195L288 442.9l62.09 62.09c9.391 9.391 24.63 9.348 33.97-.0938c9.301-9.406 9.258-24.55-.0938-33.91L312 399V352L512 352c17.6 0 32-14.4 32-32V80h-48V304zM552 0H23.96C10.72 0 0 10.73 0 23.95S10.72 48 23.96 48h528.1C565.3 48 576 37.27 576 24.05S565.3 0 552 0z" />
                </svg>
              </button>
            </div>
          </button>
        </span>
      </div>
    </div>
    <div class="mt-4 flex flex-col">
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="relative shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div v-if="selectedExams.length > 0"
              class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
              <button type="button"
                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                @click="startSelected">
                Start Exams
              </button>
              <button type="button"
                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                @click="deleteSelected">
                Delete
              </button>
            </div>
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2
                    h-4 w-4 rounded border-gray-300 text-orange-600
                    focus:ring-orange-500 sm:left-6" select all:
                      @click="selectedExams.length === exams.length ? selectedExams = [] : selectedExams = exams.map(exam => exam.id)"
                      :checked="selectedExams.length === exams.length">
                  </th>
                  <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-md font-semibold text-gray-900">
                    Subject Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Start Time
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    End Time
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Duration
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Time Left
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="exam in exams" :key="exam.id" :class="[selectedExams.includes(exam.id) && 'bg-gray-50']">
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div v-if="selectedExams.includes(exam.id)" class="absolute inset-y-0 left-0 w-0.5 bg-orange-600">
                    </div>
                    <input type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 sm:left-6"
                      :value="exam.id" v-model="selectedExams" />
                  </td>
                  <td :class="[
                    'whitespace-nowrap py-4 pr-3 text-md font-medium',
                    selectedExams.includes(exam.id)
                      ? 'text-orange-600'
                      : 'text-gray-900'
                  ]">
                    {{ exam.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {{ exam.start.toLocaleTimeString() }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {{ exam.end.toLocaleTimeString() }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {{ new Date(exam.duration * 1000).toISOString().slice(11, 19) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    <!-- Calculate left time by substracting the current time from the end time and show the time left in normal format-->
                    {{ exam.timeleft }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="exam.status === 'Active'"
                      class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                    <span v-else-if="exam.status === 'Reading'"
                      class="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-500">Reading
                      Time</span>
                    <span v-else-if="exam.status === 'Extra Time'"
                      class="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-500">Extra
                      Time</span>
                    <span v-else-if="exam.status === 'Not Started'"
                      class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Not
                      Started</span>
                    <span v-else-if="exam.status === 'Finished'"
                      class="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">Finished</span>
                  </td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="inline-flex rounded-md shadow-sm">
                      <button type="button"
                        class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        @click="
                          exam.started
                            ? stopExam(exam.id)
                            : startExam(exam.id)
                          ">
                        {{ exam.started ? "Stop Exam" : "Start Exam" }}
                      </button>
                      <Menu as="div" class="relative inline-block -ml-px">
                        <div>
                          <MenuButton
                            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10">
                            <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                          </MenuButton>
                        </div>

                        <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                          <MenuItems
                            class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">
                              <MenuItem v-slot="{ active }">
                              <a @click="editExam(exam.id)"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Edit</a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                              <a @click="duplicateExam(exam.id)"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Duplicate</a>
                              </MenuItem>
                            </div>
                            <!-- <div class="py-1">
                              <MenuItem v-slot="{ active }">
                              <a href="#"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Archive</a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                              <a href="#"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Move</a>
                              </MenuItem>
                            </div> -->
                            <div class="py-1">
                              <!-- <MenuItem v-slot="{ active }">
                              <a href="#"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Share</a>
                              </MenuItem> -->
                              <MenuItem v-slot="{ active }">
                              <a @click="modals.favourites = true"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Add
                                to favorites</a>
                              </MenuItem>
                            </div>
                            <div class="py-1">
                              <MenuItem v-slot="{ active }">
                              <a @click="removeExam(exam.id)"
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-not-allowed ']">Delete</a>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </div>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div aria-live="assertive"
    class="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-4">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition enter-active-class="transform ease-out duration-800 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg v-if="this.icon === 'success'" class="h-6 w-6 text-green-400"
                  x-description="Heroicon name: outline/check-circle" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-if="this.icon === 'reading'" class="h-6 w-6 text-orange-400"
                  x-description="Heroicon name: outline/check-circle" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-if="this.icon === 'extra'" class="h-6 w-6 text-orange-400"
                  x-description="Heroicon name: outline/check-circle" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-if="this.icon === 'error'" class="h-6 w-6 text-red-400"
                  x-description="Heroicon name: outline/x-circle" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ this.title }}
                </p>
                <p class="mt-1 text-sm text-gray-500">{{ this.text }}</p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button type="button" @click="show = false"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" x-description="Heroicon name: mini/x-mark" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div> -->
</template>

<style scoped>
.hover-button:hover .hidden-buttons {
  display: block;
}

.hover-button:hover .visible-button {
  display: none;
}

.hidden-buttons {
  display: none;
}
</style>