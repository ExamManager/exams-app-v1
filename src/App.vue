<!-- This example requires Tailwind CSS v2.0+ -->
<script lang="ts">
// Make a method that finds the current time and writes it into the varaibale "timestamp" that updates itself every second
export default ({
  data () {
    return {
      timestamp: '',
      selectedPeople: [],
      indeterminate: false,
      checked: false,
      isOpen: [],
      people : [
        { id: "swrfdsfdf",name: 'Physics Paper 2', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
        { id: "112dferfw31", name: 'Maths Paper 1', start: '9:36', end: '10:36', duration: '2:00', timeleft: '0:30', started: false },
        { id: "2qdfswer", name: 'English Paper 2', start: '9:36', end: '10:36', duration: '2:15', timeleft: '0:30', started: false },
        { id: "3wsdfeqr", name: 'Physics', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
        { id: "4fsdfdferf", name: 'Physics', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
        { id: "5edsfwtgw", name: 'Physics', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
        { id: "6esdfwrgwe", name: 'Physics', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
        { id: "7wsdfergwe", name: 'Physics', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
        { id: "8esdwrg", name: 'Physics', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
        { id: "9ssddswdf", name: 'Physics', start: '9:36', end: '10:36', duration: '1:00', timeleft: '0:30', started: false },
      ],
      test: 'test',
    }
  },
  mounted() {
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
    setInterval(this.updateTime, 100);
  },
  watch: {
    indeterminate () {
      this.selectedPeople.value.length > 0 && this.selectedPeople.value.length < this.people.length
    },
  },
  methods: {
    updateTime() {
      var d = new Date();
      var n = d.toLocaleTimeString();
      this.timestamp = n;
    },
    selectAllPeople() {
      // select or deselect all people by storing all id's in the selectedPeople array
      if (this.selectedPeople.length == this.people.length) {
        // if all people are selected, deselect them all
        this.selectedPeople = [];
      } else {
        // if not all people are selected, select them all
        this.selectedPeople = [];
        for (var i = 0; i < this.people.length; i++) {
          this.selectedPeople.push(this.people[i].id);
        }
      }
      
      
    },
    popup(id: string) {
      // check if id is in the array if not add id, if it is remove it
      if (this.isOpen.includes(id)) {
        // remove id from array
        this.isOpen.splice(this.isOpen.indexOf(id), 1);
      } else {
        // add id to array
        this.isOpen.push(id);
      }
      
    },
    deleteButton(personid: string) {
      // delete the person with the id personid
      // find the index of the person in the people array
      var personIdx = this.people.findIndex(person => person.id == personid);
      // delete the person
      this.people.splice(personIdx, 1);
      // also save it to local storage
      localStorage.setItem('people', JSON.stringify(this.people));
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
      // also save it to local storage
      localStorage.setItem('people', JSON.stringify(this.people));
    },    // Method that is called when the delete button is pressed and then deletes the according person from the list
    deletePerson(personIdx: number) {
      this.people.splice(personIdx, 1);
      // also save it to local storage
      localStorage.setItem('people', JSON.stringify(this.people));
    },
    stopExam(personIdx: string) {
      console.log('stop exam')

    },
    // When the button is pressed the exam starts, which should start a timer and set the start time for an exam and calculate the end time using the duration
    startExam(personIdx: string) {
      console.log(personIdx)
      const newpersonid = personIdx;
      // find id of array based on its id
      var personIdx = this.people.findIndex(person => person.id == personIdx);
      this.people[personIdx].started = true;
      console.log(this.people[personIdx].started)
      // set the start time
      this.people[personIdx].start = this.timestamp;
      // calculate the end time of the exam by adding the duration to the start time (you cant just add the duration because it is a string)
      // get the current time
      var start = new Date();
      var end = new Date();
      // calculate the end time by adding the duration to the start time and also calculate the start time without the seconds
      var duration = this.people[personIdx].duration.split(':');
      end.setHours(end.getHours() + parseInt(duration[0]));
      end.setMinutes(end.getMinutes() + parseInt(duration[1]));
      // set the end time
      this.people[personIdx].end = end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      // remove the seconds at the end
      this.people[personIdx].end = this.people[personIdx].end.slice(0, -3);
      // remove the seconds at the end
      this.people[personIdx].start = start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      // remove the seconds at the end
      this.people[personIdx].start = this.people[personIdx].start.slice(0, -3);


      // call the function that calculates the time left and send the needed variables
      this.calculateTimeLeft(newpersonid, start, end);
      // also save it to local storage
      localStorage.setItem('people', JSON.stringify(this.people));
    },
    async calculateTimeLeft(personIdx: string, start: Date, end: Date) {
      setInterval(() => {
        console.log(this.people)
        // make sure this updates for each persons id, as when one get deleted, the timer stays locked on the previous list position
        const newpersonid = this.people.findIndex(person => person.id == personIdx);
        console.log(newpersonid)
        // get the current time
        var now = new Date();
        // calculate the time left by subtracting the current time from the end time
        var timeLeft = end.getTime() - now.getTime();
        // if the time left is less than 0, then the exam is over
        if (timeLeft < 0) {
          // set the time left to 0
          this.people[personIdx].timeleft = '00:00';
          // set the exam to finished
          this.people[personIdx].finished = true;
          // also save it to local storage
          localStorage.setItem('people', JSON.stringify(this.people));
        } else {
          // if the exam is not over, then calculate the time left
          // calculate the hours left
          var hoursLeft = Math.floor(timeLeft / 1000 / 60 / 60);
          // calculate the minutes left
          var minutesLeft = Math.floor(timeLeft / 1000 / 60) - (hoursLeft * 60);
          // calculate the seconds left
          var secondsLeft = Math.floor(timeLeft / 1000) - (hoursLeft * 60 * 60) - (minutesLeft * 60);
          // format the time left
          var timeLeftFormatted = hoursLeft.toString().padStart(2, '0') + ':' + minutesLeft.toString().padStart(2, '0') + ':' + secondsLeft.toString().padStart(2, '0');
          // remove the seconds at the end
          timeLeftFormatted = timeLeftFormatted.slice(0, -3);
          // set the time left
          this.people[newpersonid].timeleft = timeLeftFormatted;
          // also save it to local storage
          localStorage.setItem('people', JSON.stringify(this.people));
        }
      
      
        
        
      }, 1000);
    },
  },
})
</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8 lg:pt-8">
    <div class="text-4xl font-bold flex justify-start">Online Exam Timer</div>
    <div class="flex justify-end">
      <div class="flex flex-col items-end">
        <div class="flex flex-row">
          <div class="text-7xl font-bold text-gray-900">{{ timestamp }}</div>
        </div>
        <div class="flex flex-row">
          <div class="text-2xl font-bold text-gray-900">Monday, 1st March</div>
        </div>
      </div>
    </div>
    
    <!-- <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, start, end and duration.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button>
      </div>
    </div> -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div v-if="selectedPeople.length > 0" class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
              <button type="button" class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">Start Exams</button>
              <button type="button" class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30" @click="deleteSelected" >Delete</button>
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
                    <span v-if="person.started" class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                    <span v-else class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Inactive</span>
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
                          <MenuItems class="absolute right-0 z-10 mt-10 w-42 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">
                              <MenuItem>
                                <a @click="item.click" class="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Change Colour</a>
                                <a @click="item.click" class="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Duplicate</a>
                                <a @click="deleteButton(person.id)" class="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Delete</a>
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
</template>
