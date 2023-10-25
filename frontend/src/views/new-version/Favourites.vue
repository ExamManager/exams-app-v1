<script lang="ts">
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { NewExam } from "../../components/classes";

export default {
  name: 'ExamPopup',
  components: {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild
  },
  data() {
    return {
      newexam: [] as NewExam[],
      newexamextratimeenabled: false,
      newexamreadingtimeenabled: false,
      newexam5min: false,
      newexam15min: false,
      newexam30min: false,
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
                    <div>
                      <h3 class="text-xl font-medium leading-6 text-gray-900">
                        New Exam
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Please enter all the details for the new exam.
                      </p>
                    </div>

                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div class="sm:col-span-4">
                        <label for="username" class="block text-sm font-medium text-gray-700">Exam<a class="text-red-600">
                            *</a></label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span
                            class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Subject</span>
                          <input v-model="newexam.name" placeholder="Physics Paper 1" type="text" name="examname"
                            id="examname" autocomplete="examname"
                            class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label for="about" class="block text-sm font-medium text-gray-700">About</label>
                        <div class="mt-1">
                          <textarea id="about" name="about" v-model="newexam.about" rows="3"
                            placeholder="Each student recieves one Formula Booklet..."
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="pt-8">
                    <div>
                      <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Exam Information
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Please enter all the time and date information for the
                        exam.
                      </p>
                    </div>
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">Planned Start Time</label>
                        <div class="mt-1">
                          <input type="time" name="starttime" placeholder="9:37" v-model="newexam.start" id="starttime"
                            autocomplete="given-name"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="last-name" class="block text-sm font-medium text-gray-700">Duration</label>
                        <div class="mt-1">
                          <input type="number" name="Duration" id="duration" v-mask="'###'" v-model="newexam.duration"
                            placeholder="90 min"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="pt-8">
                    <div>
                      <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Additional Information
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Please enter all the additional information for the
                        exam.
                      </p>
                    </div>
                    <div class="mt-6">
                      <fieldset>
                        <legend class="sr-only">By Email</legend>
                        <div class="text-base font-medium text-gray-900" aria-hidden="true">
                          Timing Options
                        </div>
                        <div class="mt-4 space-y-4">
                          <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                              <input id="comments" name="comments" type="checkbox" v-model="newexamextratimeenabled"
                                class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="comments" class="font-semibold text-gray-700">Extra Time</label>
                              <p class="text-gray-500">
                                Check to enable extra time and select the
                                percentage.
                              </p>
                              <div class="mt-2">
                                <transition enter-active-class="transform ease-out duration-400 transition"
                                  enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                  enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                  leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                  leave-to-class="opacity-0">
                                  <div v-if="newexamextratimeenabled" class="flex-auto items-center space-x-2">
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                      <input v-model="newexam.extratime" placeholder="15" type="text" v-mask="'##'"
                                        name="examname" id="examname" autocomplete="examname"
                                        class="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                                      <span
                                        class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Percent</span>
                                    </div>
                                  </div>
                                </transition>
                              </div>
                            </div>
                          </div>
                          <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                              <input id="candidates" name="candidates" v-model="newexamreadingtimeenabled" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="candidates" class="font-medium text-gray-700">Reading Time</label>
                              <p class="text-gray-500">
                                Check to enable reading time and enter the time
                              </p>
                              <div class="sm:col-span-2">
                                <div class="mt-2">
                                  <transition enter-active-class="transform ease-out duration-400 transition"
                                    enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                    leave-to-class="opacity-0">
                                    <div v-if="newexamreadingtimeenabled === true" class="mt-1 flex rounded-md shadow-sm">
                                      <input v-model="newexam.readingtime" placeholder="15" type="text" v-mask="'##'"
                                        name="examname" id="examname" autocomplete="examname"
                                        class="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                                      <span
                                        class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Minutes</span>
                                    </div>
                                  </transition>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset class="mt-6">
                        <legend class="contents text-base font-medium text-gray-900">
                          Reminder Options
                          <a class="text-gray-300">(Not Implemented)</a>
                        </legend>
                        <p class="text-sm text-gray-500">
                          These will show a notification and play a sound.
                        </p>
                        <div class="relative flex items-start mt-4">
                          <div class="flex h-5 items-center">
                            <input id="candidates" name="candidates" v-model="newexam5min"  type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="candidates" class="font-medium text-gray-700">5 Minutes</label>
                            <p class="text-gray-500">
                              Get a reminder 5 minutes before the exam ends.
                            </p>
                          </div>
                        </div>
                        <div class="relative flex items-start mt-4">
                          <div class="flex h-5 items-center">
                            <input id="candidates" name="candidates" v-model="newexam15min"  type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="candidates" class="font-medium text-gray-700">15 Minutes</label>
                            <p class="text-gray-500">
                              Get a reminder 15 minutes before the exam ends.
                            </p>
                          </div>
                        </div>
                        <div class="relative flex items-start mt-4">
                          <div class="flex h-5 items-center">
                            <input id="candidates" name="candidates" v-model="newexam30min"  type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="candidates" class="font-medium text-gray-700">30 Minutes</label>
                            <p class="text-gray-500">
                              Get a reminder 30 minutes before the exam ends.
                            </p>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
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