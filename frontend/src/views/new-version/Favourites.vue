<script lang="ts">
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Favourite, NewExam } from "../../components/classes";

import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'

const favourites = [
  {
    exam:
    {
      name: 'Physics',
      about: 'Each student recives a frmula booklet and is allowed a calculator...',
      start: new Date,
      duration: 120,
      readingtime: 5
    },
  },
  {
    exam:
    {
      name: 'Chemistry',
      about: 'Each student recives a periodic table and is allowed a calculator...',
      start: new Date,
      duration: 75,
      readingtime: 5
    },
  },
  // More people...
] as Favourite[]

export default {
  name: 'ExamPopup',
  components: {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
    favourites,
  },
  data() {
    return {
      newexam: [] as NewExam[],
      newexamextratimeenabled: false,
      newexamreadingtimeenabled: false,
      newexam5min: false,
      newexam15min: false,
      newexam30min: false,
      favourites,
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    addExam() {
      // change newexam.start to a date object give a time like HH:MM and add today as the date
      const newstart = new Date()
      const starttime = this.newexam.start.split(':')
      newstart.setHours(parseInt(starttime[0]))
      newstart.setMinutes(parseInt(starttime[1]))
      newstart.setSeconds(0)
      this.newexam.start = newstart
      console.log(this.newexam.duration)
      const newend = new Date(newstart)
      // duration given minutes
      newend.setMinutes(newend.getMinutes() + this.newexam.duration)
      this.newexam.end = newend
      // duration given as HH:MM
      console.log(this.newexam)
      // set the reminder times in the number array
      const reminderTimes = []
      if (this.newexam5min) {
        reminderTimes.push(5)
      }
      if (this.newexam15min) {
        reminderTimes.push(15)
      }
      if (this.newexam30min) {
        reminderTimes.push(30)
      }
      this.newexam.reminders = reminderTimes


      this.$emit('add', this.newexam)
      this.closeModal()
    },
    toggleFavourite(favorite: Favourite){
      
    }

  },
}
</script>

<template>
  <TransitionRoot as="template" :show="true">
    <Dialog as="div" class="relative z-40" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
              <div class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <h3 class="text-xl font-medium leading-6 text-gray-900">
                      Favourites
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Add or edit your favourite exams...
                    </p>
                  </div>
                  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
                    <li v-for="favourite in favourites" :key="favourite.exam.name"
                      class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                      <div class="flex w-full items-center justify-between space-x-6 p-6">
                        <div class="flex-1 truncate" @click="toggleFavourite(favourite)" >
                          <div class="flex items-center space-x-3">
                            <h3 class="truncate text-sm font-medium text-gray-900">{{ favourite.exam.name }}</h3>
                            <span
                              class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">{{
                                favourite.exam.duration }} Minutes</span>
                          </div>
                          <p class="mt-1 truncate text-sm text-gray-500">{{ favourite.exam.about }}</p>
                        </div>
                        <!-- <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="favourite.exam." alt="" /> -->
                      </div>
                      <div>
                        <div class="-mt-px flex divide-x divide-gray-200">
                          <div class="flex w-0 flex-1">
                            <a
                              class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                              <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span class="ml-3">Edit</span>
                            </a>
                          </div>
                          <div class="-ml-px flex w-0 flex-1">
                            <a
                              class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                              <PhoneIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span class="ml-3">View</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button @click="closeModal()"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                      Cancel
                    </button>
                    <button @click="addExam()"
                      class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                      {{ "Add Exam" }}
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>./classes