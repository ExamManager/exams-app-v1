<script lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
export default ({
    name: 'Modal',
    components: {
      Dialog,
      DialogPanel,
      DialogTitle,
      TransitionChild,
      TransitionRoot
    },
    data() {
        return {
            // New Exams
            newexamname: "",
            newexamduration: "",
            newexamplannedstart: "",
            newexamabout: "",
            // Options
            newexamextratimeenabled: false,
            newexamreadingtimeenabled: false,
            newexamextratime: "",
            newexamreadingtime: "",
            newexamminwarning: "5",
            // new exam others
            newexamplannedend: "",

            // Notifications
            icon: "error",
            title: "Error",
            text: "This is an error message",

            // Other Stuff
            popupedit: false,
            timestamp: "",
            datestamp: "",
            show: false,
            open: false,
            selectedPeople: [],
            indeterminate: false,
            checked: false,
            isOpen: [],
            people: [
                { id: "swrfdsfdf", name: "Physics Paper 2", start: "9:36", end: "10:36", duration: "3:15", totalduration: "1:01", timeleft: "0:30", started: false, about: "Test", extratimeenabled: false, readingtimeenabled: true, extratime: "", readingtime: "123", minwarning: "35", status: "inactive" },
            ],
            test: "test",
        };
    },
    mounted() {
        this.updateDate();
        this.updateTime();
        // set time left to duration
        for (var i = 0; i < this.people.length; i++) {
            this.people[i].timeleft = this.people[i].duration;
        }
        // check if there is a list of people in local storage
        // if (localStorage.getItem('people')) {
        //   // if there is, then load it into the people array
        //   this.people = JSON.parse(localStorage.getItem('people') || '{}');
        // }
        setInterval(() => {
            this.updateTime();
            this.updateDate();
        }, 100);
    },
    watch: {
        indeterminate() {
            this.selectedPeople.values.length > 0 && this.selectedPeople.values.length < this.people.length
        },
        newexamduration() {
            // watch the duration and replace a : after the first character to have it in H:MM format, but make a backspace work and allow a max of 4 characters
            let realNumber = this.newexamduration?.replace(/:/gi, '')

            // Generate dashed number but only add a dash after the first one, but this also creates a dash after every character
            if (realNumber.length != 0) {
              if (realNumber.length < 3) {
                var dashedNumber = realNumber.replace(/(.{1,1})/g, "$1:").slice(0, -1)
                this.newexamduration = dashedNumber
              }
            }
            // also limit it to only 4 characters
            if (realNumber.length > 3) {
              this.newexamduration = this.newexamduration.slice(0, -1)
            }
            // and only allow numbers
            if (isNaN(Number(realNumber))) {
              this.newexamduration = this.newexamduration.slice(0, -1)
            }
        },
        // a function that watches each person whether they are started, in extra time or in reading time or not started and updates their status
          
    },
    methods: {
        time(){
            // returen time in 24 hour format in the format HH:MM and add a zero if the minutes are less than 10 and a zero if the hours are less than 10
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            if (minutes < 10) {
                var time = hours.toString() + ":0" + minutes.toString();
            }
            else {
                var time = hours.toString() + ":" + minutes.toString();
            }
            if (hours < 10) {
                var time = "0" + time;
            }
            return time;
        },
        converter(time: string, sectime: string, type: string) {
            // convert time to minutes
            // check which format the time is in
            if (type === "MM") {
                var minutes = Number(time);
                return minutes.toString();
            }
            else if (type === "H:MM") {
                // split the time into hours and minutes
                var splitTime = time.split(":");
                // convert the hours to minutes and add the minutes
                var minutes = Number(splitTime[0]) * 60 + Number(splitTime[1]);
                // return the minutes
                return minutes.toString();
            }
            else if (type === "HH:MM") {
                // split the time into hours and minutes
                var splitTime = time.split(":");
                // convert the hours to minutes and add the minutes
                var minutes = Number(splitTime[0]) * 60 + Number(splitTime[1]);
                // return the minutes
                return minutes.toString();
            }
            else if (type === "-HH:MM") {
                // change minutes back again into time in the format HH:MM with 24 hour time
                var hours = Math.floor(Number(time) / 60);
                var minutes = Number(time) % 60;
                // add a 0 if the minutes are less than 10
                if (minutes < 10) {
                    var time = hours.toString() + ":0" + minutes.toString();
                }
                else {
                    var time = hours.toString() + ":" + minutes.toString();
                }
                if (hours < 10) {
                    var time = "0" + time;
                }
                // check that if the hours are over 24, then subtract 24 from them but make sure to add the 0 back if the hours are less than 10
                if (hours > 24) {
                    var hours = hours - 24;
                    if (hours < 10) {
                        var time = "0" + hours.toString() + ":" + minutes.toString();
                    }
                    else {
                        var time = hours.toString() + ":" + minutes.toString();
                    }
                }
                return time.toString();
            }
            else if (type === "-H:MM") {
                // change minutes back again into time in the format H:MM with 24 hour time
                var hours = Math.floor(Number(time) / 60);
                var minutes = Number(time) % 60;
                // add a 0 if the minutes are less than 10
                if (minutes < 10) {
                    var time = hours.toString() + ":0" + minutes.toString();
                }
                else {
                    var time = hours.toString() + ":" + minutes.toString();
                }
                // check that if the hours are over 24, then subtract 24 from them
                if (hours > 24) {
                    var hours = hours - 24;
                    var time = hours.toString() + ":" + minutes.toString();
                }
                return time.toString();
            }
            else if (type === "addtime") {
                // two times are given in HH:MM format, add them together and return the result in HH:MM format
                // be careful about 24 hour time and hours being over 24 and minutes being over 60
                // split the times into hours and minutes
                var splitTime2 = time.split(":");
                var splitTime3 = sectime.split(":");
                console.log(splitTime2);
                console.log(splitTime3);
                // add the hours and minutes together
                var hours = Number(splitTime2[0]) + Number(splitTime3[0]);
                var minutes = Number(splitTime2[1]) + Number(splitTime3[1]);
                // if the minutes are over 60, add an hour and subtract 60 minutes
                if (minutes >= 60) {
                    hours = hours + 1;
                    minutes = minutes - 60;
                }
                // if the hours are over 24, subtract 24 hours
                if (hours >= 24) {
                    hours = hours - 24;
                }
                // add a 0 if the minutes are less than 10
                if (minutes < 10) {
                    var time = hours.toString() + ":0" + minutes.toString();
                }
                else {
                    var time = hours.toString() + ":" + minutes.toString();
                }
                // check if string is only 4 characters long, if so add a 0 to the beginning
                if (time.length === 4) {
                    var time = "0" + time;
                }
                return time.toString();
            }
            else if (type === "addminutes") {
                // two times are given one in HH:MM and one in minutes, add them together and return the result in HH:MM format
                // split time in hours and minutes and then add sectime to minutes
                // when minutes is over 60, add an hour and subtract 60 minutes
                // when hours is over 24, subtract 24 hours
                // add a 0 if the minutes are less than 10
                // check if string is only 4 characters long, if so add a 0 to the beginning
                var splitTime2 = time.split(":");
                var hours = Number(splitTime2[0]);
                console.log("HOURS", hours);
                var minutes = Number(splitTime2[1]) + Number(sectime);
                console.log("MINUTES", minutes);
                // substract 60 from minutes and add 1 to hours until minutes is less than 60
                while (minutes >= 60) {
                    hours = hours + 1;
                    minutes = minutes - 60;
                }
                if (hours >= 24) {
                    hours = hours - 24;
                }
                if (minutes < 10) {
                    var time = hours.toString() + ":0" + minutes.toString();
                }
                else {
                    var time = hours.toString() + ":" + minutes.toString();
                }
                if (time.length === 4) {
                    var time = "0" + time;
                }
                console.log("TIMMMMME", time);
                return time.toString();
            }
            else {
                // if the time is not in any of the formats, return the time
                var minutes = Number(time);
                return minutes.toString();
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
        editButton(personid: string) {
          this.popupedit = true;
          this.open = true;
          console.log("PERSONID", personid);
          
        },
        openModal() {
            this.popupedit = false;
            // reset new exam form
            this.newexamname = "";
            this.newexamduration = "";
            this.newexamplannedstart = "";
            this.newexamabout = "";
            this.newexamextratimeenabled = false;
            this.newexamreadingtimeenabled = false;
            this.newexamextratime = "";
            this.newexamreadingtime = "";
            this.newexamminwarning = "5";
            // open modal
            this.open = true;
        },
        addExam() {
          // check if all fields are filled in
          if (this.newexamname == "" || this.newexamduration == "" || this.newexamplannedstart == "") {
            // show notification
            this.notification("error", "Error", "Please fill in all fields");
          }
          else {
            // convert duration to minutes
            var duration = this.converter(this.newexamduration, "", "H:MM");
            // convert planned start to minutes
            var plannedstart = this.converter(this.newexamplannedstart, "", "HH:MM");
            // calculate end time
            var endtime = Number(duration) + Number(plannedstart);
            // convert end time to HH:MM format
            this.newexamplannedend = this.converter(endtime.toString(), "" , "-HH:MM");
            // calculate the totalduration by adding the reading time and duration
            var totalduration2 = Number(duration) + Number(this.newexamreadingtime);
            // push new exam to exams array
            this.people.push({
              id: Math.random().toString(36).substr(2, 9),
              name: this.newexamname,
              duration: this.newexamduration,
              totalduration: totalduration2.toString(),
              timeleft: this.newexamduration,
              start: this.newexamplannedstart,
              end: this.newexamplannedend,
              about: this.newexamabout,
              extratimeenabled: this.newexamextratimeenabled,
              readingtimeenabled: this.newexamreadingtimeenabled,
              extratime: this.newexamextratime,
              readingtime: this.newexamreadingtime,
              minwarning: this.newexamminwarning,
              started: false,
              status: "inactive"
            });
            // close modal and then show notification
            this.open = false;
            this.notification("success", "Exam Added", this.newexamname + " has been added");
          }
        },
        duplicateButton(personid: string) {
            // find person with id
            var personIdx = this.people.find(person => person.id == personid);
            var personId = this.people.findIndex(person => person.id == personid);
            // duplicate person
            var newPerson = JSON.parse(JSON.stringify(personIdx));
            // add new person to people array
            this.people.push(newPerson);
            // put make the id a random 8 digit uuid
            this.people[this.people.length - 1].id = Math.random().toString(36).substr(2, 9);
            // show notification
            this.notification("success", "Exam Duplicated", this.people[personId].name + " has been duplicated");
            // save people array to local storage
            localStorage.setItem("people", JSON.stringify(this.people));
        },
        selectAllPeople() {
            // select or deselect all people by storing all id's in the selectedPeople array
            if (this.selectedPeople.length == this.people.length) {
                // if all people are selected, deselect them all
                this.selectedPeople = [];
            }
            else {
                // if not all people are selected, select them all
                this.selectedPeople = [];
                for (var i = 0; i < this.people.length; i++) {
                    this.selectedPeople.push(this.people[i].id);
                }
            }
        },
        popup(id: string) {
            // check if id is in the array if not add id, if it is remove it
            // grab the person with the id
            var personIdx = this.people.findIndex(person => person.id == id);

            if (this.people[personIdx].started === false) {
              if (this.isOpen.includes(id)) {
                  // remove id from array
                  this.isOpen.splice(this.isOpen.indexOf(id), 1);
              }
              else {
                  // add id to array
                  this.isOpen.push(id);
              }
            }
        },
        notification(icon: string, title: string, text: string) {
            // show notification
            this.show = false;
            this.icon = icon;
            this.title = title;
            this.text = text;
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, 2000);
        },
        deleteButton(personid: string) {
            // delete the person with the id personid
            // find the index of the person in the people array
            var personIdx = this.people.findIndex(person => person.id == personid);
            this.notification("success", "Exam Deleted", this.people[personIdx].name + " has been deleted");
            // delete the person
            this.people.splice(personIdx, 1);
            // also save it to local storage
            localStorage.setItem("people", JSON.stringify(this.people));
        },
        deleteSelected() {
            // delete all selected people
            console.log("this.selectedPeople");
            for (var i = 0; i < this.selectedPeople.length; i++) {
                // find the index of the person in the people array
                var personIdx = this.people.findIndex(person => person.id == this.selectedPeople[i]);
                // delete the person
                this.people.splice(personIdx, 1);
            }
            // show notification
            this.notification("success", "Exams Deleted", "The selected exams have been deleted");
            // also save it to local storage
            localStorage.setItem("people", JSON.stringify(this.people));
        },
        deletePerson(personIdx: number) {
            this.people.splice(personIdx, 1);
            // also save it to local storage
            localStorage.setItem("people", JSON.stringify(this.people));
        },
        stopExam(personIdx: string) {
            console.log("stop exam");
        },
        // When the button is pressed the exam starts, which should start a timer and set the start time for an exam and calculate the end time using the duration
        startExam(personIdx: string) {
            // find person with id
            var personIdx = this.people.findIndex(person => person.id == personIdx);
            // set the start time
            this.people[personIdx].start = this.time()
            var duration = this.converter(String(this.people[personIdx].duration),"","H:MM");
            // check if there is reading time and if so calculate the end time with the converter "addtime2" 
            var durationandreading = Number(duration) + Number(this.people[personIdx].readingtime);
            console.log(this.people[personIdx].readingtimeenabled)
            if (this.people[personIdx].readingtimeenabled === true) {
                this.people[personIdx].end = this.converter(String(this.people[personIdx].start),String(durationandreading),"addminutes");
                console.log("1")
            }
            else {
                // calculate the new end time with the converter
                var endtime = this.converter(String(this.people[personIdx].start),String(this.people[personIdx].duration),"addtime");
                // set the end time
                this.people[personIdx].end = endtime;
                console.log("2")
            }
            


        },
        async calculateTimeLeft(personIdx: string, start: Date, end: Date) {
            setInterval(() => {
                
            }, 1000);
        },
        async calculateStatus(personIdx: string, start: Date, end: Date) {
            setInterval(() => {
                
            }, 1000);
        },
    },
})
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
              <div class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-xl font-medium leading-6 text-gray-900">New Exam</h3>
                      <p class="mt-1 text-sm text-gray-500">Please enter all the details for the new exam.</p>
                    </div>

                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div class="sm:col-span-4">
                        <label for="username" class="block text-sm font-medium text-gray-700">Exam<a class="text-red-600"> *</a></label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Subject</span>
                          <input v-model="newexamname" placeholder="Physics Paper 1" type="text" name="examname" id="examname" autocomplete="examname" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label for="about" class="block text-sm font-medium text-gray-700">About</label>
                        <div class="mt-1">
                          <textarea id="about" name="about" v-model="newexamabout" rows="3" placeholder="Each student recieves one Formula Booklet..." class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <p class="mt-2 text-sm text-gray-500">Optional</p>
                      </div>
                    </div>
                  </div>

                  <div class="pt-8">
                    <div>
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Exam Information</h3>
                      <p class="mt-1 text-sm text-gray-500">Please enter all the time and date information for the exam.</p>
                    </div>
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">Planned Start Time</label>
                        <div class="mt-1">
                          <input type="time" name="starttime" placeholder="9:36" v-model="newexamplannedstart" id="starttime" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="last-name" class="block text-sm font-medium text-gray-700">Duration</label>
                        <div class="mt-1">
                          <input type="text" name="Duration" id="duration" v-model="newexamduration" placeholder="2:00" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="pt-8">
                    <div>
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Additional Information</h3>
                      <p class="mt-1 text-sm text-gray-500">Please enter all the additional information for the exam.</p>
                    </div>
                    <div class="mt-6">
                      <fieldset>
                        <legend class="sr-only">By Email</legend>
                        <div class="text-base font-medium text-gray-900" aria-hidden="true">Timing Options</div>
                        <div class="mt-4 space-y-4">
                          <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                              <input id="comments" name="comments" type="checkbox" v-model="newexamextratimeenabled" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="comments" class="font-semibold text-gray-700">Extra Time</label>
                              <p class="text-gray-500">Check to enable extra time and select the percentage.</p>
                              <div class="mt-2">
                                <transition enter-active-class="transform ease-out duration-400 transition" enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <select v-if="newexamextratimeenabled === true" id="extratimepercentage" v-model="newexamextratime" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                  <option>10%</option>
                                  <option>15%</option>
                                  <option>20%</option>
                                  <option selected >25%</option>
                                  <option>50%</option>
                                </select>
                              </transition>
                              </div>
                            </div>
                          </div>
                          <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                              <input id="candidates" name="candidates" v-model="newexamreadingtimeenabled" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="candidates" class="font-medium text-gray-700">Reading Time</label>
                              <p class="text-gray-500">Check to enable reading time and enter the time</p>
                              <div class="sm:col-span-2">
                                <div class="mt-2">
                                  <transition enter-active-class="transform ease-out duration-400 transition" enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                  <input v-if="newexamreadingtimeenabled === true" type="text" name="readingtime" v-model="newexamreadingtime" id="readingtime" placeholder='15 min' autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                </transition>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset class="mt-6">
                        <legend class="contents text-base font-medium text-gray-900">Reminder Options</legend>
                        <p class="text-sm text-gray-500">These will show a notification and play a sound.</p>
                        <div class="mt-4 space-y-4">
                          <div class="flex items-center">
                            <input id="push-everything" v-model="newexamminwarning" v-bind:value="'5'" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">5 minutes before end</label>
                          </div>
                          <div class="flex items-center">
                            <input id="push-email" v-model="newexamminwarning" v-bind:value="'30'" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">30 minutes before end</label>
                          </div>
                          <div class="flex items-center">
                            <input id="push-nothing" v-model="newexamminwarning" v-bind:value="'35'" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">30 & 5 minutes before end</label>
                          </div>
                          <div class="flex items-center">
                            <input id="push-nothing" v-model="newexamminwarning" v-bind:value="'0'" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">No notifications</label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button @click="open = false" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button v-if="popupedit === false" @click="addExam" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add Exam</button>
                    <button v-if="popupedit === true" @click="addExam" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update Exam</button>

                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div class="px-4 sm:px-6 lg:px-8 lg:pt-8">
    <div class="text-5xl font-bold flex justify-start">Online Exam Timer</div>
    <div class="flex justify-end pt-4">
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
          <button type="button" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="openModal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ml-1 mr-2 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            Add Exam
          </button>
          <button type="button" class="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <span class="sr-only">Sort</span>
            <!-- Heroicon name: solid/sort-ascending -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" h-5 w-5 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

          </button>
        </span>
      </div>
    </div>
    <div class="mt-4 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div v-if="selectedPeople.length > 0" class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
              <button type="button" class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30" @click="startmultipleExams">Start Exams</button>
              <button type="button" class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30" @click="deleteSelected" >Delete</button>
            </div>
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6" select all: @click="selectAllPeople" :checked="selectedPeople.length === people.length">
                  </th>
                  <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-md font-semibold text-gray-900">Subject Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Start Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">End Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Duration</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Time Left</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="person in people" :key="person.id" :class="[selectedPeople.includes(person.id) && 'bg-gray-50']">
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div v-if="selectedPeople.includes(person.id)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6" :value="person.id" v-model="selectedPeople" />
                  </td>
                  <td :class="['whitespace-nowrap py-4 pr-3 text-md font-medium', selectedPeople.includes(person.id) ? 'text-indigo-600' : 'text-gray-900']">
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
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="person.status === 'active'" class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                    <span v-else-if="person.status === 'reading'" class="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-lightblue-600">Reading Time</span>
                    <span v-else-if="person.status === 'extra'" class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-orange-500">Extra Time</span>
                    <span v-else-if="person.status === 'inactive'" class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Inactive</span>
                  </td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="inline-flex rounded-md shadow-sm">
                      <button type="button" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="startExam(person.id)"  >{{ person.started ? 'Stop Exam' : 'Start Exam' }}</button>
                      <Menu as="div" class="relative -ml-px block">
                        <MenuButton class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="popup(person.id)">
                          <span class="sr-only">Open options</span>
                          <svg v-if="!isOpen.includes(person.id)" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z"/></svg>
                          <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M424 216H24C10.75 216 0 205.3 0 192C0 178.7 10.75 168 24 168H424C437.3 168 448 178.7 448 192C448 205.3 437.3 216 424 216zM424 344H24C10.75 344 0 333.3 0 320C0 306.7 10.75 296 24 296H424C437.3 296 448 306.7 448 320C448 333.3 437.3 344 424 344z"/></svg>
                        </MenuButton>
                        <transition v-if="isOpen.includes(person.id)" enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                          <MenuItems class="fixed right-14 z-10 mt-10 w-42 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1 ">
                              <MenuItem>
                                <a @click="duplicateButton(person.id)" class="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Duplicate</a>
                                <a @click="deleteButton(person.id)" class="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Delete</a>
                                <a @click="editButton(person.id)" class="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Edit</a>
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
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-4">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition enter-active-class="transform ease-out duration-800 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg v-if="this.icon === 'success'" class="h-6 w-6 text-green-400" x-description="Heroicon name: outline/check-circle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-if="this.icon === 'error'" class="h-6 w-6 text-red-400" x-description="Heroicon name: outline/x-circle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{ this.title }}</p>
                <p class="mt-1 text-sm text-gray-500">{{ this.text }}</p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button type="button" @click="show = false" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" x-description="Heroicon name: mini/x-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
</svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
