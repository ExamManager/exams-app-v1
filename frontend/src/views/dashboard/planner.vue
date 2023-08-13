
<script lang="ts">
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon, ClockIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
// import { ref, onMounted, provide, inject } from 'vue'


// sessions would be in format { 
                              //   start: dateTime, 
                              //   end: dateTime, 
                              //   room: string, 
                              //   invigilators: string[], 
                              //   seatingPlan: string, 
                              //   notes: string, 
                              //   exams: exams[] 
                              // }
// events would be in format { 
                              //   start: dateTime, 
                              //   end: dateTime, 
                              //   title: string, 
                              //   description: string,
                              //   yearGroup: string, 
                              //   subject: string, 
                              //   room: string, 
                              //   invigilator: string, 
                              //   type: string, 
                              //   files: string[...links], 
                              //   notes: string,
                              //   extraTime: number,
                              //   readingTime: number,
                              // }

class Student {
  name: {
    first: string,
    last: string,
  };
  yearGroup: string;
  id: number;
  
  constructor(first: string, last: string, yearGroup: string, id: number) {
    this.name = {
      first: first,
      last: last,
    }
    this.yearGroup = yearGroup;
    this.id = id;
  }
}

class YearGroup {
  name: string;
  students: Student[];
  exams: Exam[];
  sessions: Session[];
  color: string;
  id: number;

  constructor(name: string, students: Student[], exams: Exam[], sessions: Session[], color: string, id: number) {
    this.name = name;
    this.students = students;
    this.exams = exams;
    this.sessions = sessions;
    this.color = color;
    this.id = id;
  }
}

class Exam {
  /*
    extraTime is a percentage
    readingTime is a number of minutes
  */
  start: Date;
  end: Date;
  extraTime: number;
  readingTime: number;
  subject: string;
  yeargroup: string;
  title: string;
  description: string;
  notes: string;
  room: string;
  invigilators: string[];
  files: File[];
  type: string;
  id: number;
  maxOverlap: number;
  overlapIndex: number;
  color: string;

  constructor(
    start: Date, 
    end: Date, 
    extraTime: number, 
    readingTime: number, 
    subject: string, 
    yeargroup: string, 
    title: string, 
    description: string, 
    notes: string, 
    room: string, 
    invigilators: string[], 
    files: File[],
    id: number,
    )
  {
    this.start = start;
    this.end = end;
    this.extraTime = extraTime;
    this.readingTime = readingTime;
    this.subject = subject;
    this.yeargroup = yeargroup;
    this.title = title;
    this.description = description;
    this.notes = notes;
    this.room = room;
    this.invigilators = invigilators;
    this.files = files;
    this.type = "exam";
    this.id = id;
    this.maxOverlap = 0;
    this.overlapIndex = 0;
    this.color = "#f3f4f6";
  }

  // durations are in miliseconds

  get getStart() {
    return this.start;
  }

  get startMinutesRound5() {
    return Math.round((this.start.getHours() * 60 + this.start.getMinutes()) / 5) * 5;
  }

  get minuteDurationRound5() {
    return Math.round(this.duration() / 5) * 5;
  }
  get hours_minutes_start() {
    // return "hh:mm" with extra 0s when required (i.e. return 09:00 instead of 9:0)
    return `${this.start.getHours().toString().padStart(2, '0')}:${this.start.getMinutes().toString().padStart(2, '0')}`
  }
  get hours_minutes_end() {
    // return "hh:mm" with extra 0s when required (i.e. return 09:00 instead of 9:0)
    return `${this.end.getHours().toString().padStart(2, '0')}:${this.end.getMinutes().toString().padStart(2, '0')}`
  }
  get hours_minutes_duration() {
    // return "hh:mm" with extra 0s when required (i.e. return 09:00 instead of 9:0)
    return `${this.duration().toString().padStart(2, '0')}:${this.duration().toString().padStart(2, '0')}`
  }
  

  calcDuration() {
    return this.end.getTime() - this.start.getTime();
  }

  miliToMinutes(mili: number, round = 1) {
    return Math.round(mili / 60000 / round) * round;
  }

  duration(round = 1) {
    return this.miliToMinutes(this.end.getTime() - this.start.getTime(), round)
  }

  durationWithReading(round = 1) {
    return this.miliToMinutes(this.calcDuration() + this.readingTime * 60000, round);
  }

  durationWithExtra(round = 1) {
    return this.miliToMinutes(this.calcDuration() * (1 + this.extraTime / 100), round);
  }

  fullDuration(round = 1) {
    return this.miliToMinutes(this.calcDuration() * (1 + this.extraTime / 100) + this.readingTime * 60000, round);
  }
}

class Session {
  start: Date;
  end: Date;
  room: string;
  invigilators: string[];
  seatingPlan: string;
  notes: string;
  exams: Exam[];
  type: string;
  id: number;

  constructor (
    start: Date,
    end: Date,
    room: string,
    invigilators: string[],
    seatingPlan: string,
    notes: string,
    exams: Exam[],
    id: number,
  )
  {
    this.start = start;
    this.end = end;
    this.room = room;
    this.invigilators = invigilators;
    this.seatingPlan = seatingPlan;
    this.notes = notes;
    this.exams = exams;
    this.type = "session"
    this.id = id;
  }

  // durations are in miliseconds

  calcDuration() {
    return this.end.getTime() - this.start.getTime();
  }

  miliToMinutes(mili: number, round = 1) {
    return Math.round(mili / 60000 / round) * round;
  }

  duration(round = 1) {
    return this.miliToMinutes(this.end.getTime() - this.start.getTime(), round)
  }

  fullDuration(round = 1) {
    return this.miliToMinutes(this.calcDuration(), round);
  }
}

const months = [
  {
    name: 'January',
    days: [
      { date: '2021-12-27' },
      { date: '2021-12-28' },
      { date: '2021-12-29' },
      { date: '2021-12-30' },
      { date: '2021-12-31' },
      { date: '2022-01-01', isCurrentMonth: true },
      { date: '2022-01-02', isCurrentMonth: true },
      { date: '2022-01-03', isCurrentMonth: true },
      { date: '2022-01-04', isCurrentMonth: true },
      { date: '2022-01-05', isCurrentMonth: true },
      { date: '2022-01-06', isCurrentMonth: true },
      { date: '2022-01-07', isCurrentMonth: true },
      { date: '2022-01-08', isCurrentMonth: true },
      { date: '2022-01-09', isCurrentMonth: true },
      { date: '2022-01-10', isCurrentMonth: true },
      { date: '2022-01-11', isCurrentMonth: true },
      { date: '2022-01-12', isCurrentMonth: true, isToday: true },
      { date: '2022-01-13', isCurrentMonth: true },
      { date: '2022-01-14', isCurrentMonth: true },
      { date: '2022-01-15', isCurrentMonth: true },
      { date: '2022-01-16', isCurrentMonth: true },
      { date: '2022-01-17', isCurrentMonth: true },
      { date: '2022-01-18', isCurrentMonth: true },
      { date: '2022-01-19', isCurrentMonth: true },
      { date: '2022-01-20', isCurrentMonth: true },
      { date: '2022-01-21', isCurrentMonth: true },
      { date: '2022-01-22', isCurrentMonth: true },
      { date: '2022-01-23', isCurrentMonth: true },
      { date: '2022-01-24', isCurrentMonth: true },
      { date: '2022-01-25', isCurrentMonth: true },
      { date: '2022-01-26', isCurrentMonth: true },
      { date: '2022-01-27', isCurrentMonth: true },
      { date: '2022-01-28', isCurrentMonth: true },
      { date: '2022-01-29', isCurrentMonth: true },
      { date: '2022-01-30', isCurrentMonth: true },
      { date: '2022-01-31', isCurrentMonth: true },
      { date: '2022-02-01' },
      { date: '2022-02-02' },
      { date: '2022-02-03' },
      { date: '2022-02-04' },
      { date: '2022-02-05' },
      { date: '2022-02-06' },
    ],
  },
]

export default {
  components: { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon, Menu, MenuButton, MenuItem, MenuItems, ClockIcon, Exam, Session },
  data() {
    return {
      months,
      days: new Array(),
      // VIEWS: 
      //  year: 0
      //  month: 1
      //  week: 2
      //  day: 3
      view: 1,
      currentMonth: new Date().getMonth() + 1,
      week: [],
      selectedDay: null,
      exams: [],
      sessions: [],
      examIds: [],
      yeargroupColors: {},
    }
  },
  watch: {
    view: function(val) {
      // // console.log("new view: ", val)
      // // console.log("currentMonth: ", this.currentMonth)
      // // console.log("selectedDay: ", this.selectedDay)
      // // console.log("week: ", this.week)
      // // console.log("days: ", this.days)
      // // console.log("months: ", this.months)

    },
    exams: function(vals) {
      console.log("exams changed to: ", vals)
    }
  },
  setup() {
    // onMounted(() => {

    //   const currentMinute = new Date().getHours() * 60

    //   const container = document.getElementById("container") || 0
    //   const containerNav = document.getElementById("containerNav") || 0
    //   const containerOffset = document.getElementById("containerOffset") || 0

    //   const scrollValue = (container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) * currentMinute / 1440;
    //   // // console.log("scrollValue = ", scrollValue);
      
    //   if (scrollValue) {
    //     container.scrollTop = scrollValue
    //   }
    // })
  },
  // mounted() {
  beforeMount() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    const yyyy = today.getFullYear();

    this.yeargroupColors = {
      ['Year 11']: '#00ff00',
      ['Year 12']: '#ff0000',
      // 'year 11': '#34ff12',
      // 'year 12': '#bbbbb3',
      // 'year 13': '#333333',
    }

    var startMonth = mm - 6;
    var startYear = yyyy;

    if (startMonth < 1) {
      startMonth += 12;
      startYear--;
    }

    this.setExams();

    // default dates
    // this.months = this.genDates(mm, yyyy, mm-1, yyyy+1);
    this.months = this.genDates(1, 2023, 12, 2023);
    // // console.log("beforeMounted genned this.months as: ", this.months)

    // for (let i = 0; i < this.months.length; i++) {
    //   for (let j = 0; j < this.months[i].days.length; j++) {
    //     this.months[i].days[j].isSelected = false;
    //   }
    // }

    this.week = this.genWeek(1, 8, 2023).days;
    this.days = this.genMonth(1, 2023).days;
    // // console.log("beforeMounted genned this.days as: ", this.days)
    
    // // console.log("this.days", this.days)


    const testing = this.getExams(2, 8, 2023);

    // // console.log("testing getExams(2, 8, 2023)", testing);

    // // console.log(this.selectedDay)

    // this.selectedDay = this.week[4];

    // // console.log("this.selectedDay", this.selectedDay)


    // // console.log("weekDebug: ", this.week.flatMap(day => day.events))

    // get the day number of day in week[0]

    

  },
  methods:
  {
    dayOffset(day: dateTime, offset: number) {
      const tmp = new Date(day);
      // // console.log("dayOffset: ", tmp.getDay() + offset)

      return tmp.getDay() + offset;
      // return tmp;
    },
    roundToDecimal(num: number, dec: number) {
      return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    },
    objToExam(obj: { start: Date; end: Date; extraTime: number; readingTime: number; subject: string; yeargroup: string; title: string; description: string; notes: string; room: string; invigilators: string[]; files: File[]; id: number;}) {
      return new Exam(
        obj.start,
        obj.end,
        obj.extraTime,
        obj.readingTime,
        obj.subject,
        obj.yeargroup,
        obj.title,
        obj.description,
        obj.notes,
        obj.room,
        obj.invigilators,
        obj.files,
        obj.id,
      )
    },
    testWeek() {
      const tests = [
        {day: 30, month: 12, year: 2025},
        {day: 2, month: 1, year: 2026},
        {day: 29, month: 1, year: 2023},
        {day: 1, month: 2, year: 2023},
        {day: 27, month: 2, year: 2023},
        {day: 4, month: 3, year: 2023},
        {day: 30, month: 1, year: 2024},
        {day: 3, month: 2, year: 2024},
        {day: 25, month: 2, year: 2024},
        {day: 2, month: 3, year: 2024},
        {day: 29, month: 6, year: 2025},
        {day: 3, month: 7, year: 2025},
        {day: 31, month: 7, year: 2024},
        {day: 1, month: 8, year: 2024},
        {day: 31, month: 8, year: 2025},
        {day: 6, month: 9, year: 2025},
      ]

      tests.forEach((test) => {
        // console.log("test", test.day, "/", test.month, "/", test.year)
        this.genWeek(test.day, test.month, test.year).days.forEach((test) => {
          // console.log(test.date)
        })
      })
    },
    genDates(startMonth: number, startYear: number, endMonth: number, endYear: number) {
      var returnDates = new Array();

      for (let y = startYear; y <= endYear; y++) {
        const monthMax = y === endYear ? endMonth : 12;
        const monthMin = y === startYear ? startMonth : 1;
        for (let m = monthMin; m <= monthMax; m++) {
          returnDates.push(this.genMonth(m, y));
        }
      }

      return returnDates;      
    },
    genMonth(month: number, year: number) {
      month--;

      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      let newMonth = { name: new Date(year, month, 1).toLocaleString('default', { month: 'long' }), days: new Array()};

      const firstDay = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month+1, 0).getDay();
      const daysInMonth = new Date(year, month+1, 0).getDate();

      for (let d = 1 - firstDay; d <= daysInMonth + 6 - lastDay || newMonth.days.length < 42; d++)
      {
        const tmp = new Date(year, month, d);
        
        const tmpExams = this.getExams(tmp.getDate(), tmp.getMonth() + 1, tmp.getFullYear())

        for (let exam of tmpExams) {
          exam.color = this.yeargroupColors[exam.yeargroup] || "#f3f4f6";
        }

        const newDay = { date: `${tmp.getFullYear()}-${tmp.getMonth()+1}-${tmp.getDate()}`, isCurrentMonth: tmp.getMonth() == month, isToday: tmp.getDate() == currentDay && tmp.getMonth() == currentMonth && tmp.getFullYear() == currentYear, events: tmpExams }
        
        // for each exam in newDay, set the maxOverlap. The max overlap is the largest number of times that any exam overlaps with another exam in the same day. Then set the overlapIndex to the number of exams that overlap and start before it. If two exams start at the same time, the one that ends first has the lower overlapIndex. if they also end at the same time, the one with lower id comes first.
        // when exams are rendered, they are simply rendered as they are in the array. Ensure that when exams overlap, the one with the lower overlapIndex is rendered first. i.e. sort them accordingly
        
        newDay.events.forEach((exam: Exam) => {
          let overlap = 0;
          let overlapIndex = 0;
          newDay.events.forEach((otherExam: Exam) => {
            if (exam.id != otherExam.id) {
              if (exam.start.getTime() < otherExam.end.getTime() && exam.end.getTime() > otherExam.start.getTime()) {
                overlap++;
                if (otherExam.start.getTime() < exam.start.getTime()) {
                  overlapIndex++;
                }
                else if (otherExam.start.getTime() == exam.start.getTime()) {
                  if (otherExam.end.getTime() < exam.end.getTime()) {
                    overlapIndex++;
                  }
                  else if (otherExam.end.getTime() == exam.end.getTime()) {
                    if (otherExam.id < exam.id) {
                      overlapIndex++;
                    }
                  }
                }
              }
            }
          })
          exam.maxOverlap = overlap;
          exam.overlapIndex = overlapIndex;
        })

        newDay.events.sort((examA, examB) => examA.overlapIndex - examB.overlapIndex);
        
        newMonth.days.push(newDay)
      }

      let foundToday = false;
      for (let i = 0; i < 42; i++) {
        if (newMonth.days[i].isToday) {
          foundToday = true;
          newMonth.days[i].isSelected = true;
          this.selectedDay = newMonth.days[i];

          // console.log("found today and selected it")
          break;
        }
      }


      if (!foundToday) {
        let firstDay = 0;
        for (let i = 0; i < 8; i++) {
          if (newMonth.days[i].isCurrentMonth) {
            firstDay = i;
            break;
          }
        }

        newMonth.days[firstDay].isSelected = true;
        this.selectedDay = newMonth.days[firstDay];
        // console.log("did not find today so selected first day")
      }

      // console.log("genned new month", newMonth)
      
      return newMonth;
    },
    genWeek(day: number, month: number, year: number) {
      // sessions would be in format { start: dateTime, end: dateTime, room: string, invigilators: string[], seatingPlan: string, notes: string, exams: exams[] }
      // events would be in format { start: dateTime, end: dateTime, title: string, description: string, yearGroup: string, subject: string, room: string, invigilator: string, type: string, files: string[...links], notes: string }

      // console.log("genWeek called with day: ", day, "month: ", month, "year: ", year, "and this.exams: ", this.exams)

      let returnWeek = { days: new Array() };
      const today = new Date();

      month--;

      const providedDay = new Date(year, month, day).getDay();

      for (let d = day - providedDay; d < day - providedDay + 7; d++)
      {
        const tmp = new Date(year, month, d);

        // const tmpExam = this.getExams(d, month, year)
        const tmpExams = this.getExams(tmp.getDate(), tmp.getMonth() + 1, tmp.getFullYear())

        for (let exam of tmpExams) {
          exam.color = this.yeargroupColors[exam.yeargroup] || "#f3f4f6";
        }

        const newDay = { date: `${tmp.getFullYear()}-${tmp.getMonth()+1}-${tmp.getDate()}`, isCurrentMonth: tmp.getMonth() == month, isToday: tmp.getDate() == today.getDate() && tmp.getMonth() == today.getMonth() && tmp.getFullYear() == today.getFullYear(), events: tmpExams }
        newDay.events.forEach((exam: Exam) => {
          let overlap = 0;
          newDay.events.forEach((otherExam: Exam) => {
            if (exam.id != otherExam.id) {
              if (exam.start.getTime() < otherExam.end.getTime() && exam.end.getTime() > otherExam.start.getTime()) {
                overlap++;
              }
            }
          })
          exam.maxOverlap = overlap;
        })
        
        returnWeek.days.push(newDay)
      }

      let foundToday = false;
      for (let i = 0; i < 7; i++) {
        if (returnWeek.days[i].isToday) {
          foundToday = true;
          returnWeek.days[i].isSelected = true;
          this.selectedDay = returnWeek.days[i];

          // console.log("found today and selected it")
          break;
        }
      }

      if (!foundToday) {
        // firstDay has to be the first day of the week that is part of the month provided as "month"
        let firstDay = 0;
        for (let i = 0; i < 7; i++) {
          if (returnWeek.days[i].isCurrentMonth) {
            firstDay = i;
            break;
          }
        }
        
        returnWeek.days[firstDay].isSelected = true;
        this.selectedDay = returnWeek.days[firstDay];
        // console.log("did not find today so selected first day")
      }


      // given the string "2023-11-11" get the number of the day (in this case 11)
      // const day = parseInt(dateString.split("-")[2]);

      console.log("genned week: ", returnWeek)

      return returnWeek;
    },
    genDay(day: number, month: number, year: number) {
      // sessions would be in format { start: dateTime, end: dateTime, room: string, invigilators: string[], seatingPlan: string, notes: string, exams: exams[] }
      // events would be in format { start: dateTime, end: dateTime, title: string, description: string, yearGroup: string, subject: string, room: string, invigilator: string, type: string, files: string[...links], notes: string }
      
      // return a new day
      const today = new Date();
      const tmp = new Date(year, month-1, day);
      const newDay = { date: `${tmp.getFullYear()}-${tmp.getMonth()+1}-${tmp.getDate()}`, isCurrentMonth: tmp.getMonth() == month-1, isToday: tmp.getDate() == today.getDate() && tmp.getMonth() == today.getMonth() && tmp.getFullYear() == today.getFullYear(), events: this.getExams(day, month, year) }
      newDay.events.forEach((exam: Exam) => {
        let overlap = 0;
        newDay.events.forEach((otherExam: Exam) => {
          if (exam.id != otherExam.id) {
            if (exam.start.getTime() < otherExam.end.getTime() && exam.end.getTime() > otherExam.start.getTime()) {
              overlap++;
            }
          }
        })
        exam.maxOverlap = overlap;
      })

      let foundToday = false;
      if (newDay.isToday) {
        foundToday = true;
        newDay.isSelected = true;
        this.selectedDay = newDay;

        // console.log("found today and selected it")
      }

      if (!foundToday) {
        newDay.isSelected = true;
        this.selectedDay = newDay;
        // console.log("did not find today so selected first day")
      }

      // console.log("genned day: ", newDay)

      return newDay;
    }, 
    setExams() {
      // get Sessions and Exams from db
      let sessions = new Array()
      // let exams = new Array()

      // create 3 fake exams on the day July 27th, 2023

      const Exam1 = {
        start: new Date(2023, 7, 2, 9, 0),
        end: new Date(2023, 7, 2, 10, 0),
        extraTime: 25,
        readingTime: 10,
        subject: "Maths",
        yeargroup: "Year 11",
        title: "Maths Paper 1",
        description: "Maths Paper 1",
        notes: "Maths Paper 1",
        room: "Room 1",
        invigilators: ["Mr. Smith", "Mr. Jones"],
        files: [],
        type: "exam",
        id: 0,
      }

      const Exam2 = {
        start: new Date(2023, 7, 2, 9, 0),
        end: new Date(2023, 7, 2, 11, 30),
        extraTime: 25,
        readingTime: 10,
        subject: "Maths",
        yeargroup: "Year 11",
        title: "Maths Paper 2",
        description: "Maths Paper 2",
        notes: "Maths Paper 2",
        room: "Room 1",
        invigilators: ["Mr. Smith", "Mr. Jones"],
        files: [],
        type: "exam",
        id: 1,
      }

      const Exam3 = {
        start: new Date(2023, 7, 2, 12, 0),
        end: new Date(2023, 7, 2, 13, 0),
        extraTime: 25,
        readingTime: 10,
        subject: "Maths",
        yeargroup: "Year 12",
        title: "Maths Paper 3",
        description: "Maths Paper 3",
        notes: "Maths Paper 3",
        room: "Room 1",
        invigilators: ["Mr. Smith", "Mr. Jones"],
        files: [],
        type: "exam",
        id: 2,
      }

      const Exam4 = {
        start: new Date(2023, 7, 2, 9, 0),
        end: new Date(2023, 7, 2, 11, 30),
        extraTime: 25,
        readingTime: 10,
        subject: "Maths",
        yeargroup: "Year 11",
        title: "Exam4",
        description: "Maths Paper 2",
        notes: "Maths Paper 2",
        room: "Room 1",
        invigilators: ["Mr. Smith", "Mr. Jones"],
        files: [],
        type: "exam",
        id: 3,
      }

      const Exam5 = {
        start: new Date(2023, 7, 2, 9, 0),
        end: new Date(2023, 7, 2, 11, 30),
        extraTime: 25,
        readingTime: 10,
        subject: "Maths",
        yeargroup: "Year 11",
        title: "Exam5",
        description: "Maths Paper 2",
        notes: "Maths Paper 2",
        room: "Room 1",
        invigilators: ["Mr. Smith", "Mr. Jones"],
        files: [],
        type: "exam",
        id: 4,
      }

      const Exam6 = {
        start: new Date(2023, 7, 2, 9, 0),
        end: new Date(2023, 7, 2, 11, 30),
        extraTime: 25,
        readingTime: 10,
        subject: "Maths",
        yeargroup: "Year 11",
        title: "Exam6",
        description: "Maths Paper 2",
        notes: "Maths Paper 2",
        room: "Room 1",
        invigilators: ["Mr. Smith", "Mr. Jones"],
        files: [],
        type: "exam",
        id: 5,
      }

      const Exam7 = {
        start: new Date(2023, 7, 2, 9, 0),
        end: new Date(2023, 7, 2, 11, 30),
        extraTime: 25,
        readingTime: 10,
        subject: "Maths",
        yeargroup: "Year 11",
        title: "Exam7",
        description: "Maths Paper 2",
        notes: "Maths Paper 2",
        room: "Room 1",
        invigilators: ["Mr. Smith", "Mr. Jones"],
        files: [],
        type: "exam",
        id: 6,
      }

      const exam1 = new Exam(
        Exam1.start,
        Exam1.end,
        Exam1.extraTime,
        Exam1.readingTime,
        Exam1.subject,
        Exam1.yeargroup,
        Exam1.title,
        Exam1.description,
        Exam1.notes,
        Exam1.room,
        Exam1.invigilators,
        Exam1.files,
        Exam1.id,
      )

      const exam2 = new Exam(
        Exam2.start,
        Exam2.end,
        Exam2.extraTime,
        Exam2.readingTime,
        Exam2.subject,
        Exam2.yeargroup,
        Exam2.title,
        Exam2.description,
        Exam2.notes,
        Exam2.room,
        Exam2.invigilators,
        Exam2.files,
        Exam2.id,
      )

      const exam3 = new Exam(
        Exam3.start,
        Exam3.end,
        Exam3.extraTime,
        Exam3.readingTime,
        Exam3.subject,
        Exam3.yeargroup,
        Exam3.title,
        Exam3.description,
        Exam3.notes,
        Exam3.room,
        Exam3.invigilators,
        Exam3.files,
        Exam3.id,
      )

      const exam4 = new Exam(
        Exam4.start,
        Exam4.end,
        Exam4.extraTime,
        Exam4.readingTime,
        Exam4.subject,
        Exam4.yeargroup,
        Exam4.title,
        Exam4.description,
        Exam4.notes,
        Exam4.room,
        Exam4.invigilators,
        Exam4.files,
        Exam4.id,
      )

      const exam5 = new Exam(
        Exam5.start,
        Exam5.end,
        Exam5.extraTime,
        Exam5.readingTime,
        Exam5.subject,
        Exam5.yeargroup,
        Exam5.title,
        Exam5.description,
        Exam5.notes,
        Exam5.room,
        Exam5.invigilators,
        Exam5.files,
        Exam5.id,
      )

      const exam6 = new Exam(
        Exam6.start,
        Exam6.end,
        Exam6.extraTime,
        Exam6.readingTime,
        Exam6.subject,
        Exam6.yeargroup,
        Exam6.title,
        Exam6.description,
        Exam6.notes,
        Exam6.room,
        Exam6.invigilators,
        Exam6.files,
        Exam6.id,
      )

      const exam7 = new Exam(
        Exam7.start,
        Exam7.end,
        Exam7.extraTime,
        Exam7.readingTime,
        Exam7.subject,
        Exam7.yeargroup,
        Exam7.title,
        Exam7.description,
        Exam7.notes,
        Exam7.room,
        Exam7.invigilators,
        Exam7.files,
        Exam7.id,
      )


      let exams = [exam1, exam2, exam3, exam7, exam4, exam5, exam6]

      // let exams = [exam1, exam2, exam5, exam3]

      let examIds = new Array();

      sessions.forEach((session, index) => {
        const newSession = new Session(
          session.start,
          session.end,
          session.room,
          session.invigilators,
          session.seatingPlan,
          session.notes,
          session.exams,
          index,
        )


        session.exams.forEach((exam: Exam) => {
          examIds.push(exam.id)
        })

        this.sessions.push(newSession)
      })

      // console.log("final exams in setExams: ", exams)

      this.examIds = examIds;
      this.exams = exams;
    },
    getExams(day: number, month: number, year: number) {
      // console.log("getExams called with day, month, year: ", day, month, year)
      
      const result = this.exams.filter(exam => 
        exam.start.getDate() == day && exam.start.getMonth() == month - 1 && exam.start.getFullYear() == year
      )
      // console.log("current exams: ", this.exams)
      // console.log("getExams result", result)

      // console.log("this.exams in getExams: ", this.exams)

      // console.log("getExams result", result)
      return result;
    },
    getSessions(day: number, month: number, year: number) {
      let sessions = [];

      this.sessions.forEach((session) => {
        if (session.start.getDate() == day && session.start.getMonth() == month - 1 && session.start.getFullYear() == year) {
          sessions.push(session);
        }
      })
    },
    setSelected(day: any) {
      for (let i = 0; i < 7; i++) {
        this.week[i].isSelected = false;
      }
      for (let i = 0; i < 42; i++) {
        this.days[i].isSelected = false;
      }
      for (let i = 0; i < this.months.length; i++) {
        for (let j = 0; j < this.months[i].days.length; j++) {
          this.months[i].days[j].isSelected = false;
        }
      }


      this.selectedDay ? this.selectedDay.isSelected = false : void(0);
      day.isSelected = true;
      this.selectedDay = day;

      // if this.months does not include the selected day, generate this.months with the year specified in the day. Check if the day is included by making sure this.months starts before the selected day and ends afterwards
      // if (new Date(this.months[0].days[0].date).getTime() > new Date(day.date).getTime() || new Date(this.months[this.months.length - 1].days[41].date).getTime() < new Date(day.date).getTime()) {
      //   this.months = this.genDates(day.date.split("-")[1], day.date.split("-")[0], day.date.split("-")[1], day.date.split("-")[0]);
      // }

      // // if this.week does not include the selected day, generate this.week with the year and month specified in the day. Check if the day is included by making sure this.week starts before the selected day and ends afterwards
      // if (new Date(this.week[0].date).getTime() > new Date(day.date).getTime() || new Date(this.week[6].date).getTime() < new Date(day.date).getTime()) {
      //   this.week = this.genWeek(day.date.split("-")[2], day.date.split("-")[1], day.date.split("-")[0]).days;
      // }

      // // if this.days does not include the selected day, generate this.days with the year and month specified in the day. Check if the day is included by making sure this.days starts before the selected day and ends afterwards
      // if (new Date(this.days[0].date).getTime() > new Date(day.date).getTime() || new Date(this.days[41].date).getTime() < new Date(day.date).getTime()) {
      //   this.days = this.genMonth(day.date.split("-")[1], day.date.split("-")[0]).days;
      // }
      

      // given a day such as "2023-11-11" get the number of the day of the week (sunday is 0)
      // const day = new Date(dateString).getDay();


      // console.log("setSelected day", day)


    },
    specDay(day: any) {
      // console.log("specDay day", day)
      this.setSelected(day);
      this.days = this.genMonth(day.date.split("-")[1], day.date.split("-")[0]).days;
      this.week = this.genWeek(day.date.split("-")[2], day.date.split("-")[1], day.date.split("-")[0]).days;
      this.selectedDay = day;

      // go through this.days and find the day that matches the day provided as an arg. set that day to be selected
      
      let selected = false
      for (let i = 0; i < this.days.length; i++) {
        this.days[i].isSelected = false
        if (this.days[i].date == day.date) {
          this.days[i].isSelected = true;
          selected = true;
          // this.selectedDay = this.days[i];
        }
      }
      if (!selected) {
        for (let i = 0; i < this.days.length; i++) {
          if (this.days[i].isToday) {
            this.days[i].isSelected = true;
            this.selectedDay = this.days[i];
            selected = true;
          }
        }
        if (!selected) {
          this.days[0].isSelected = true;
          this.selectedDay = this.days[0];
        }
      }

      // same thing for week
      selected = false
      for (let i = 0; i < this.week.length; i++) {
        this.week[i].isSelected = false
        if (this.week[i].date == day.date) {
          this.week[i].isSelected = true;
          selected = true;
          // this.selectedDay = this.week[i];
        }
      }


      // console.log("specDay genned this.days as: ", this.days)
      this.view = 3;
      // console.log("specDay this.days", this.days)
    },
    specWeek(day: any) {
      // console.log("specWeek day", day)
      this.setSelected(day);
      this.week = this.genWeek(day.date.split("-")[2], day.date.split("-")[1], day.date.split("-")[0]).days;
      this.view = 2;
      // console.log("specWeek this.week", this.week)
    },
    specMonth(day: any) {
      // console.log("specMonth day", day)
      this.setSelected(day);
      this.days = this.genMonth(day.date.split("-")[1], day.date.split("-")[0]).days;
      
      // // console.log("specMonth genned this.days as: ", this.days, "using: ", day.date.split("-")[1], day.date.split("-")[0], day.date.split("-")[1], day.date.split("-")[0], "as args")
      // console.log("specMonth genned this.days as: ", this.days)
      this.view = 1;
      // console.log("specMonth this.months", this.months)
    },
    specYear(day: any) {
      // console.log("specYear day", day)
      this.setSelected(day);
      this.months = this.genDates(day.date.split("-")[1], day.date.split("-")[0], day.date.split("-")[1], day.date.split("-")[0]).days;
      // console.log("specYear genned this.months as: ", this.months)
      
      this.view = 0;
      // console.log("specYear this.months", this.months)
    },
    nextYear() {
      const lastMonth = parseInt(this.months[this.months.length - 1].days[7].date.split("-")[1]);
      const lastYear = parseInt(this.months[this.months.length - 1].days[7].date.split("-")[0]);
      this.months = this.genDates(lastMonth + 1, lastYear, lastMonth, lastYear + 1);
    },
    prevYear() {
      const firstMonth = parseInt(this.months[0].days[7].date.split("-")[1]);
      const firstYear = parseInt(this.months[0].days[7].date.split("-")[0]);
      this.months = this.genDates(firstMonth, firstYear - 1, firstMonth - 1, firstYear);
    },
    thisYear() {
      // const today = new Date();
      // const mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
      // const yyyy = today.getFullYear();
      const yyyy = new Date().getFullYear();
      this.months = this.genDates(1, yyyy, 12, yyyy+1);
    },
    nextMonth() {
      let lastMonth = parseInt(this.days[7].date.split("-")[1]);
      let lastYear = parseInt(this.days[7].date.split("-")[0]);

      // console.log("lastMonth", lastMonth, "lastYear", lastYear)

      if (lastMonth == 12) {
        lastMonth = 1;
        lastYear++;
      }
      else {
        lastMonth++;
      }

      this.days = this.genMonth(lastMonth, lastYear).days;
    },
    prevMonth() {
      let firstMonth = parseInt(this.days[7].date.split("-")[1]);
      let firstYear = parseInt(this.days[7].date.split("-")[0]);


      // turn month number to full month name 
      // const monthName = new Date(2020, monthNumber, 10).toLocaleString('default', { month: 'long' })


      // console.log("firstMonth", firstMonth, "firstYear", firstYear)

      if (firstMonth == 1) {
        firstMonth = 12;
        firstYear--;
      }
      else {
        firstMonth--;
      }

      this.days = this.genMonth(firstMonth, firstYear).days;
    },
    thisMonth() {
      const today = new Date();
      const mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
      const yyyy = today.getFullYear();
      this.days = this.genMonth(mm, yyyy).days;
    },
    nextWeek() {
      let lastDay = parseInt(this.week[6].date.split("-")[2]);
      let lastMonth = parseInt(this.week[6].date.split("-")[1]);
      let lastYear = parseInt(this.week[6].date.split("-")[0]);

      // console.log("lastDay", lastDay, "lastMonth", lastMonth, "lastYear", lastYear)

      if (lastDay >= new Date(lastYear, lastMonth, 0).getDate() - 7) {
        if (lastMonth == 12) {
          lastMonth = 1;
          lastYear++;
        }
        else {
          lastMonth++;
        }
        lastDay = 7 - (new Date(lastYear, lastMonth, 0).getDate() - lastDay);
      }
      else {
        lastDay += 7;
      }

      this.week = this.genWeek(lastDay, lastMonth, lastYear).days;
    },
    prevWeek() {
      let firstDay = parseInt(this.week[0].date.split("-")[2]);
      let firstMonth = parseInt(this.week[0].date.split("-")[1]);
      let firstYear = parseInt(this.week[0].date.split("-")[0]);
      
      // console.log("prevWeekCalled - ", "firstDay", firstDay, "firstMonth", firstMonth, "firstYear", firstYear)

      if (firstDay <= 7) {
        if (firstMonth == 1) {
          firstMonth = 12;
          firstYear--;
        }
        else {
          firstMonth--;
        }
        firstDay = new Date(firstYear, firstMonth, 0).getDate() - (7 - firstDay);
      }
      else {
        firstDay -= 7;
      }

      this.week = this.genWeek(firstDay, firstMonth, firstYear).days;

      // for (let i = 0; i < 7; i++) {
      //   // set the events for the day 


      //   this.week[i].events = this.getExams()
      // }

      // console.log("new this.week from prevWeek: ", this.week)
    },
    thisWeek() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
      const yyyy = today.getFullYear();
      this.week = this.genWeek(dd, mm, yyyy).days;
    },
    // rewrite nextDay as newNextDay but make it actually work 
    nextDay() {
      let currentDay = parseInt(this.selectedDay.date.split("-")[2]);
      let currentMonth = parseInt(this.selectedDay.date.split("-")[1]);
      let currentYear = parseInt(this.selectedDay.date.split("-")[0]);

      // console.log("currentDay", currentDay, "currentMonth", currentMonth, "currentYear", currentYear)

      if (currentDay >= new Date(currentYear, currentMonth, 0).getDate()) {
        if (currentMonth == 12) {
          currentMonth = 1;
          currentYear++;
        }
        else {
          currentMonth++;
        }
        currentDay = 1;
      }
      else {
        currentDay++;
      }

      this.days = this.genMonth(currentMonth, currentYear).days;

      this.selectedDay = this.genDay(currentDay, currentMonth, currentYear);

      let selected = false

      for (let i = 0; i < this.days.length; i++) {
        this.days[i].isSelected = false;

        if (this.days[i].date.split("-")[2] == currentDay && this.days[i].date.split("-")[1] == currentMonth && this.days[i].date.split("-")[0] == currentYear) {
          this.days[i].isSelected = true;
          selected = true;
          this.selectedDay = this.days[i];
        }
      }
      if (!selected) {
        for (let i = 0; i < this.days.length; i++) {
          if (this.days[i].isToday) {
            this.days[i].isSelected = true;
            this.selectedDay = this.days[i];
            selected = true;
          }
        }
        if (!selected) {
          this.days[0].isSelected = true;
          this.selectedDay = this.days[0];
        }
      }
    },
    prevDay() {
      let currentDay = parseInt(this.selectedDay.date.split("-")[2]);
      let currentMonth = parseInt(this.selectedDay.date.split("-")[1]);
      let currentYear = parseInt(this.selectedDay.date.split("-")[0]);

      // console.log("currentDay", currentDay, "currentMonth", currentMonth, "currentYear", currentYear)

      // currentMonth--;

      if (currentDay <= 1) {
        if (currentMonth == 1) {
          currentMonth = 12;
          currentYear--;
        }
        else {
          currentMonth--;
        }
        currentDay = new Date(currentYear, currentMonth, 0).getDate();
      }
      else {
        currentDay--;
      }

      this.days = this.genMonth(currentMonth, currentYear).days;

      this.selectedDay = this.genDay(currentDay, currentMonth, currentYear);

      let selected = false

      for (let i = 0; i < this.days.length; i++) {
        this.days[i].isSelected = false;

        if (this.days[i].date.split("-")[2] == currentDay && this.days[i].date.split("-")[1] == currentMonth && this.days[i].date.split("-")[0] == currentYear) {
          this.days[i].isSelected = true;
          selected = true;
          this.selectedDay = this.days[i];
        }
      }
      if (!selected) {
        for (let i = 0; i < this.days.length; i++) {
          if (this.days[i].isToday) {
            this.days[i].isSelected = true;
            this.selectedDay = this.days[i];
            selected = true;
          }
        }
        if (!selected) {
          this.days[0].isSelected = true;
          this.selectedDay = this.days[0];
        }
      }
    },
    thisDay() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
      const yyyy = today.getFullYear();
      this.days = this.genMonth(mm, yyyy).days;
      this.week = this.genWeek(dd, mm, yyyy).days;
      this.months = this.genDates(1, yyyy, 1, yyyy+1);
      

      this.selectedDay = this.genDay(dd, mm, yyyy);
    },


    

  }
}
</script>
<style>
  .noscrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Add styles for the scrollable list */
  .scrollable-list {
    display: grid;
    grid-template-rows: repeat(4, 1fr); /* Set the container to have 4 rows of equal height */
    max-height: calc(3 * 4rem); /* Set a maximum height for the container (4 elements * 2.5rem each) */
    overflow-y: auto; /* Enable vertical scrolling when content overflows */
  }
</style>
<template>
    <!-- YEAR VIEW -->
    <div v-if="!view">
      <header class="flex items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 class="text-lg font-semibold text-gray-900">
          <!-- <time datetime="{{ year currently in view as taken from this.months }}">{{ year currently in view }}</time> -->
          <time>{{ months[0].days[7].date.split("-")[0] }}</time>
        </h1>
        <div class="flex items-center">
          <div class="flex items-center rounded-md shadow-sm md:items-stretch">
            <button @click="prevYear()" type="button" class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button @click="thisYear()" type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block">Today</button>
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button @click="nextYear()" type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" class="relative">
              <MenuButton type="button" class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Year view
                <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
  
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }" @click="view = 3">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 2">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 1">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 0">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <div class="ml-6 h-6 w-px bg-gray-300" />
            <button type="button" class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add event</button>
          </div>
          <Menu as="div" class="relative ml-6 md:hidden">
            <MenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open menu</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
  
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Create event</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Go to today</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="view = 3">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 2">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 1">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 0">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </header>
      <div class="bg-white">
        <div class="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
          <section v-for="month in months" :key="month.name" class="text-center">
            <!-- <button @click="specMonth(month.days[7])"><h2 class="font-semibold text-gray-900">{{ month.name }}</h2></button> -->
            <h2 @click="specMonth(month.days[7])" class="font-semibold text-gray-900 hover:cursor-pointer">{{ month.name }}</h2>
            
            <div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              <button v-for="(day, dayIdx) in month.days" :key="day.date" type="button" :class="[day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400', dayIdx === 0 && 'rounded-tl-lg', dayIdx === 6 && 'rounded-tr-lg', dayIdx === month.days.length - 7 && 'rounded-bl-lg', dayIdx === month.days.length - 1 && 'rounded-br-lg', 'py-1.5 hover:bg-gray-100 focus:z-10']">
                <time  @click="specDay(day)" :datetime="day.date" :class="[day.isToday && 'bg-indigo-600 font-semibold text-white', 'mx-auto flex h-7 w-7 items-center justify-center rounded-full']">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- MONTH VIEW  -->
    <!-- <div class="h-screen overflow-y-scroll sm:hidden" v-if="view == 1">
      <header class="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 class="text-lg font-semibold text-gray-900">
          <time datetime="2022-01">{{new Date(selectedDay?.date).toLocaleString('default', { month: 'long', year: 'numeric' })}}</time>
        </h1>
        <div class="flex items-center">
          <div class="flex items-center rounded-md shadow-sm md:items-stretch">
            <button type="button" class="flex items-centerz justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block">Today</button>
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" class="relative">
              <MenuButton type="button" class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Month view
                <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }" @click="view = 3">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 2">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 1">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 0">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <div class="ml-6 h-6 w-px bg-gray-300" />
            <button type="button" class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add event</button>
          </div>
          <Menu as="div" class="relative ml-6 md:hidden">
            <MenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open menu</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Create event</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Go to today</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="view = 3">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 2">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 1">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 0">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </header>
      <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col mr-12 ml-12">
        <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div class="bg-white py-2">M<span class="sr-only sm:not-sr-only">on</span></div>
          <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">ue</span></div>
          <div class="bg-white py-2">W<span class="sr-only sm:not-sr-only">ed</span></div>
          <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">hu</span></div>
          <div class="bg-white py-2">F<span class="sr-only sm:not-sr-only">ri</span></div>
          <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">at</span></div>
          <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">un</span></div>
        </div>
        <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            <div v-for="day in days" :key="day.date" :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative py-2 pt-0 px-3']" >
              <time :datetime="day.date" :class="day.isToday ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
              <ol v-if="day.events.length > 0" class="mt-2">
                <li v-for="event in day.events.slice(0, 2)" :key="event.id">
                  <a :href="event.href" class="group flex">
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                      {{ event.name }}
                    </p>
                    <time :datetime="event.datetime" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">{{ event.time }}</time>
                  </a>
                </li>
                <li v-if="day.events.length > 2" class="text-gray-500">+ {{ day.events.length - 2 }} more</li>
              </ol>
              <ol v-else class="first-of-type:mt-0 mt-2 select-none">
                <li>
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"><br/></p>                    
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"><br/></p>
                </li>
                <li class="text-gray-500"><br/></li>
              </ol>
            </div>
          </div>
          <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            <button v-for="day in days" :key="day.date" type="button" @click="setSelected(day)" :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50', (day.isSelected || day.isToday) && 'font-semibold', day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-indigo-600', !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900', !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500', 'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10']">
              <time :datetime="day.date" :class="[day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900', 'ml-auto']">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
              <span class="sr-only">{{ day.events.length }} events</span>
              <span v-if="day.events.length > 0" class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span v-for="event in day.events" :key="event.id" class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="selectedDay?.events.length > 0" class="py-10 px-4 sm:px-6 lg:hidden">
        <ol class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
          <li v-for="event in selectedDay?.events" :key="event.id" class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
            <div class="flex-auto">
              <p class="font-semibold text-gray-900">{{event.yeargroup}}: {{ event.title }}</p>
              <time :datetime="event.start" class="mt-2 flex items-center text-gray-700">
                <ClockIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                {{ event.hours_minutes_start}} - {{ event.hours_minutes_end }}
              </time>
            </div>
            <a :href="event.href" class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
              >Edit<span class="sr-only">, {{ event.name }}</span></a
            >
          </li>
        </ol>
      </div>
    </div> -->
    
    <div class="h-screen overflow-y-scroll" v-if="view == 1">
      <header class="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 class="text-lg font-semibold text-gray-900">
          <time>{{ new Date(days[7].date).toLocaleString('default', { month: 'long', year: 'numeric' }) }}</time>
        </h1>
        <div class="flex items-center">
          <div class="flex items-center rounded-md shadow-sm md:items-stretch">
            <button @click="prevMonth()" type="button" class="flex items-centerz justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button @click="thisMonth()" type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block">Today</button>
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button @click="nextMonth()" type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" class="relative">
              <MenuButton type="button" class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Month view
                <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }" @click="view = 3">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 2">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 1">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 0">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <div class="ml-6 h-6 w-px bg-gray-300" />
            <button type="button" class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add event</button>
          </div>
          <Menu as="div" class="relative ml-6 md:hidden">
            <MenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open menu</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Create event</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Go to today</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="view = 3">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 2">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 1">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 0">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </header>
      <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col mr-12 ml-12">
        <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div class="bg-white py-2">M<span class="sr-only sm:not-sr-only">on</span></div>
          <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">ue</span></div>
          <div class="bg-white py-2">W<span class="sr-only sm:not-sr-only">ed</span></div>
          <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">hu</span></div>
          <div class="bg-white py-2">F<span class="sr-only sm:not-sr-only">ri</span></div>
          <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">at</span></div>
          <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">un</span></div>
        </div>
        <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            <div v-for="day in days" :key="day.date" :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative py-2 pt-0 px-3']" @click="specDay(day)">
            <!-- :class="[day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900', 'ml-auto']" -->
              <!-- <time :datetime="day.date" :class="day.isToday ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">{{ day.date.split('-').pop().replace(/^0/, '') }}</time> -->
              <time :datetime="day.date" :class="[day.isSelected ? day.isToday ? 'flex h-6 w-6 items-center justify-center rounded-full font-semibold bg-indigo-600 text-white' : 'flex h-6 w-6 items-center justify-center rounded-full font-semibold bg-gray-900 text-white' : day.isToday ? 'font-semibold text-indigo-600' : undefined]">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
              <ol v-if="day.events.length > 0" class="mt-0">
                <li v-for="event in day.events.slice(0, 2)" :key="event.id">
                  <a :href="event.href" class="group flex">
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                      {{ event.title }}
                    </p>
                    <time :datetime="event.datetime" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">{{ event.time }}</time>
                  </a>
                </li>
                <li v-if="day.events.length > 2" class="text-gray-500">+ {{ day.events.length - 2 }} more</li>
              </ol>
              <ol v-else class="first-of-type:mt-0 mt-2 select-none">
                <li>
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"><br/></p>                    
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"><br/></p>
                </li>
                <li class="text-gray-500"><br/></li>
              </ol>
            </div>
          </div>
          <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            <button v-for="day in days" :key="day.date" type="button" @click="setSelected(day)" :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50', (day.isSelected || day.isToday) && 'font-semibold', day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-indigo-600', !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900', !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500', 'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10']">
              <time :datetime="day.date" :class="[day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900', 'ml-auto']">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
              <span class="sr-only">{{ day.events.length }} events</span>
              <!-- <div class="h-0 width-[20%] pb-[20%] bg-red-600">
                  <div>
                    <p class="bg-gray-400 rounded-full">4</p>
                  </div>
              </div> -->
              <span v-if="day.events.length > 0" class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <!-- <span v-for="event in day.events" :key="event.id" class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" /> -->
                <!-- h-1.5 w-1.5 -->
                
                <div class="flex h-4 w-4 items-center justify-center rounded-full text-white text-[0.6rem] bg-gray-400">
                  <p>4</p>
                </div>
                <!-- <div class="hidden md:flex h-4 px-1 items-center justify-center rounded-full text-white text-[0.6rem] bg-gray-400">
                  <p>4 events</p>
                </div> -->
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="w-screen flex items-center justify-center py-4 lg:hidden">
        <button @click="specDay(selectedDay)" type="button" class="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-3 py-1 text-[0.8rem] font-medium leading-4 text-white shadow-sm hover:bg-gray-600 focus:outline-none ">
          See in day view
        </button>
      </div>
      <div v-if="selectedDay?.events.length > 0" class="py-10 px-4 sm:px-6 lg:hidden">
        <ol class=" scrollable-list divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
          <li v-for="event in selectedDay?.events" :key="event.id" class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
            <div class="flex-auto">
              <p class="font-semibold text-gray-900">{{event.yeargroup}}: {{ event.title }}</p>
              <time :datetime="event.start" class="mt-2 flex items-center text-gray-700">
                <ClockIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                {{ event.hours_minutes_start}} - {{ event.hours_minutes_end }}
              </time>
            </div>
            <a :href="event.href" class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
              >Edit<span class="sr-only">, {{ event.name }}</span></a
            >
          </li>
        </ol>
      </div>
    </div>

    

    <!-- WEEK VIEW -->
    <div class="flex flex-col h-screen" v-if="view == 2">
      <header class="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 class="text-lg font-semibold text-gray-900">
          <!-- <time>{{new Date(selectedDay?.date).toLocaleString('default', { month: 'long', year: 'numeric' })}}</time> -->
          <time>{{ new Date(week[0].date).toLocaleString('default', {month: 'short', year: 'numeric', day: 'numeric'}) }} - {{ new Date(week[6].date).toLocaleString('default', {month: 'short', year: 'numeric', day: 'numeric'}) }}</time>
          
        </h1>
        <div class="flex items-center">
          <div class="flex items-center rounded-md shadow-sm md:items-stretch">
            <button @click="prevWeek()" type="button" class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button @click="thisWeek()" type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block">Today</button>
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button @click="nextWeek()" type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" class="relative">
              <MenuButton type="button" class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Week view
                <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }" @click="view = 3">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 2">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 1">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 0">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <div class="ml-6 h-6 w-px bg-gray-300" />
            <button type="button" class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add event</button>
          </div>
          <Menu as="div" class="relative ml-6 md:hidden">
            <MenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open menu</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Create event</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="thisDay()">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Go to today</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="view = 3">
                  <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 2">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 1">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 ', 'block px-4 py-2 text-sm']">Month view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 0">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                  </MenuItem>
                </div>  
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </header>
      <div id="container" class="isolate flex flex-auto flex-col bg-white overflow-y-scroll h-screen">
        <div style="width: 165%" class=" flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div id="containerNav" class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
            
            <!-- small screen days -->
            <div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <button @click="setSelected(week[0]); console.log('called setselected in week')" type="button" class="flex flex-col items-center pt-2 pb-3">
                S
                <span :class="`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${week[0].isSelected ? week[0].isToday ? 'rounded-full bg-indigo-600 text-gray-200' : 'rounded-full bg-gray-900 text-white' : week[0].isToday ? 'text-indigo-600' : 'text-gray-900'}`">{{ (week[0].date.split("-")[2]) }}</span>
              </button>
              <button @click="setSelected(week[1]); console.log('called setselected in week')" type="button" class="flex flex-col items-center pt-2 pb-3">
                M
                <span :class="`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${week[1].isSelected ? week[1].isToday ? 'rounded-full bg-indigo-600 text-gray-200' : 'rounded-full bg-gray-900 text-white' : week[1].isToday ? 'text-indigo-600' : 'text-gray-900'}`">{{ (week[1].date.split("-")[2]) }}</span>
              </button>
              <button @click="setSelected(week[2]); console.log('called setselected in week')" type="button" class="flex flex-col items-center pt-2 pb-3">
                T
                <span :class="`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${week[2].isSelected ? week[2].isToday ? 'rounded-full bg-indigo-600 text-gray-200' : 'rounded-full bg-gray-900 text-white' : week[2].isToday ? 'text-indigo-600' : 'text-gray-900'}`">{{ (week[2].date.split("-")[2]) }}</span>
              </button>
              <button @click="setSelected(week[3]); console.log('called setselected in week')" type="button" class="flex flex-col items-center pt-2 pb-3">
                W
                <span :class="`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${week[3].isSelected ? week[3].isToday ? 'rounded-full bg-indigo-600 text-gray-200' : 'rounded-full bg-gray-900 text-white' : week[3].isToday ? 'text-indigo-600' : 'text-gray-900'}`">{{ (week[3].date.split("-")[2]) }}</span>
              </button>
              <button @click="setSelected(week[4]); console.log('called setselected in week')" type="button" class="flex flex-col items-center pt-2 pb-3">
                T
                <span :class="`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${week[4].isSelected ? week[4].isToday ? 'rounded-full bg-indigo-600 text-gray-200' : 'rounded-full bg-gray-900 text-white' : week[4].isToday ? 'text-indigo-600' : 'text-gray-900'}`">{{ (week[4].date.split("-")[2]) }}</span>
              </button>
              <button @click="setSelected(week[5]); console.log('called setselected in week')" type="button" class="flex flex-col items-center pt-2 pb-3">
                F
                <span :class="`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${week[5].isSelected ? week[5].isToday ? 'rounded-full bg-indigo-600 text-gray-200' : 'rounded-full bg-gray-900 text-white' : week[5].isToday ? 'text-indigo-600' : 'text-gray-900'}`">{{ (week[5].date.split("-")[2]) }}</span>
              </button>
              <button @click="setSelected(week[6]); console.log('called setselected in week')" type="button" class="flex flex-col items-center pt-2 pb-3">
                S
                <span :class="`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${week[6].isSelected ? week[6].isToday ? 'rounded-full bg-indigo-600 text-gray-200' : 'rounded-full bg-gray-900 text-white' : week[6].isToday ? 'text-indigo-600' : 'text-gray-900'}`">{{ (week[6].date.split("-")[2]) }}</span>
              </button>
            </div>

            <!-- medium and large screen days -->
            <div class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div class="col-end-1 w-14" />
              <div @click="specDay(week[0]); console.log('called setselected in week second set')" class="flex items-center justify-center py-3">
                <div><span>Sun <span :class="`items-center justify-center font-semibold ${week[0].isToday ? 'font-semibold text-indigo-600' : 'text-gray-900'}`">{{ (week[0].date.split("-")[2]) }}</span></span></div>
              </div>
              <div @click="specDay(week[1]); console.log('called setselected in week second set')" class="flex items-center justify-center py-3">
                <div><span>Mon <span :class="`items-center justify-center font-semibold ${week[1].isToday ? 'font-semibold text-indigo-600' : 'text-gray-900'}`">{{ (week[1].date.split("-")[2]) }}</span></span></div>
              </div>
              <div @click="specDay(week[2]); console.log('called setselected in week second set')" class="flex items-center justify-center py-3">
                <div><span>Tue <span :class="`items-center justify-center font-semibold ${week[2].isToday ? 'font-semibold text-indigo-600' : 'text-gray-900'}`">{{ (week[2].date.split("-")[2]) }}</span></span></div>
              </div>
              <div @click="specDay(week[3]); console.log('called setselected in week second set')" class="flex items-center justify-center py-3">
                <div><span>Wed <span :class="`items-center justify-center font-semibold ${week[3].isToday ? 'font-semibold text-indigo-600' : 'text-gray-900'}`">{{ (week[3].date.split("-")[2]) }}</span></span></div>
              </div>
              <div @click="specDay(week[4]); console.log('called setselected in week second set')" class="flex items-center justify-center py-3">
                <div><span>Thu <span :class="`items-center justify-center font-semibold ${week[4].isToday ? 'font-semibold text-indigo-600' : 'text-gray-900'}`">{{ (week[4].date.split("-")[2]) }}</span></span></div>
              </div>
              <div @click="specDay(week[5]); console.log('called setselected in week second set')" class="flex items-center justify-center py-3">
                <div><span>Fri <span :class="`items-center justify-center font-semibold ${week[5].isToday ? 'font-semibold text-indigo-600' : 'text-gray-900'}`">{{ (week[5].date.split("-")[2]) }}</span></span></div>
              </div>
              <div @click="specDay(week[6]); console.log('called setselected in week second set')" class="flex flex-row w-full items-center justify-center py-3">
                <div><span>Sat <span :class="`items-center justify-center font-semibold ${week[6].isToday ? 'font-semibold text-indigo-600' : 'text-gray-900'}`">{{ (week[6].date.split("-")[2]) }}</span></span></div>
              </div>
            </div>
          </div>
          <div class="flex flex-auto">
            <div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div class="grid flex-auto grid-cols-1 grid-rows-1">
              <!-- Horizontal lines -->
              <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100" style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))">
                <div id="containerOffset" class="row-end-1 h-7" />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11PM</div>
                </div>
                <div />
              </div>

              <!-- Vertical lines -->
              <div class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div class="col-start-1 row-span-full" />
                <div class="col-start-2 row-span-full" />
                <div class="col-start-3 row-span-full" />
                <div class="col-start-4 row-span-full" />
                <div class="col-start-5 row-span-full" />
                <div class="col-start-6 row-span-full" />
                <div class="col-start-7 row-span-full" />
                <div class="col-start-8 row-span-full w-8" />
              </div>

              <!-- Events -->
              <!-- ${yeargroupColors[event.yeargroup] || "#f3f4f6" } -->
              <!-- ${yeargroupColors[event.yeargroup] || '#f3f4f6'} -->
              <!-- bg-[${yeargroupColors[event.yeargroup] || '#f3f4f6'}]  -->
              <!-- #${yeargroupColors[event.yeargroup]} -->
              <ol v-for="event in week.flatMap(day => day.events)" :class="[`hidden col-start-1 col-end-2 row-start-1 sm:grid grid-cols-1 sm:grid-cols-7 sm:pr-8`]" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
                <li :class="['relative mt-px hidden sm:flex', `col-start-${event.start.getDay() + 1}`, `hover:z-[${event.maxOverlap + 1}] hover:w-screen`]" :style="{'grid-row': `${event.startMinutesRound5 / 5 + 2} / span ${event.minuteDurationRound5/5}`, 'width': `${!event.maxOverlap ? 100 : 100 / (event.maxOverlap + 1)}%`, 'margin-left': `${!event.maxOverlap ? 0 : (100 * event.overlapIndex) / (event.maxOverlap + 1)}%`}">
                  <a href="#" :class="`noscrollbar group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 hover:brightness-[0.95]`" :style="{backgroundColor: `${event.color}`}">
                    <p class="order-1 font-semibold text-gray-700">{{ event.title }}</p>
                    <p class="text-gray-500 group-hover:text-gray-700">
                      <time :datetime="`${event.start}`">{{ event.hours_minutes_start}}</time>
                    </p>
                  </a>
                </li>
              </ol>
              <ol v-if="selectedDay" v-for="(event, index) in selectedDay?.events" :class="`sm:hidden col-start-1 col-end-2 row-start-1 grid grid-cols-1`" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
                <!-- <li :class="`relative mt-px flex hover:z-[500]`" :style="{'grid-row': `${event.startMinutesRound5 / 5 + 2} / span ${event.minuteDurationRound5/5}`, 'width': `${!event.maxOverlap ? 100 : 100 / (event.maxOverlap - 1)}%`, 'margin-left': `${!event.maxOverlap ? 0 : (90 * event.overlapIndex) / (event.maxOverlap + 1)}%`}"> -->
                <li :class="`relative mt-px flex hover:z-[500]`" :style="{'grid-row': `${event.startMinutesRound5 / 5 + 2} / span ${event.minuteDurationRound5/5}`, 'width': `${!event.maxOverlap ? 100 : 100 / (event.maxOverlap + 1)}%`, 'margin-left': `${!event.maxOverlap ? 0 : (100 * event.overlapIndex) / (event.maxOverlap + 1)}%`}">
                  <a href="#" :class="`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:brightness-[.9625] overflow-x-hidden`" :style="{backgroundColor: event.color}">
                    <p class="order-1 font-semibold text-gray-700">{{event.title}}</p>
                    <p class="text-gray-500 group-hover:text-gray-700">
                      <time >{{event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}} - {{event.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}}</time>
                    </p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DAY VIEW -->

    <div class="h-screen flex-col flex"  v-if="view == 3">
      <header class="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <div class="flex flex-col">
          <h1 class="text-lg font-semibold leading-6 text-gray-900">
            <time class="sm:hidden">
              <span @click="specMonth(genDay(selectedDay.date.split('-')[2], selectedDay.date.split('-')[1], selectedDay.date.split('-')[0]))">{{ new Date(selectedDay?.date).toLocaleString('default', { month: 'long', day: 'numeric' })}}</span>
              <span>{{new Date(selectedDay?.date).toLocaleString('default', { year: 'numeric' })}}</span>
            </time>
            <time class="hidden sm:inline">
              <span @click="specMonth(genDay(selectedDay.date.split('-')[2], selectedDay.date.split('-')[1], selectedDay.date.split('-'])[0]))">{{new Date(selectedDay?.date).toLocaleString('default', { month: 'long', day: 'numeric' })}}</span>
              <span>{{new Date(selectedDay?.date).toLocaleString('default', { year: 'numeric' })}}</span>
            </time>
          </h1>
          <!-- add the full name of the day in selectedDay -->
          <p class="mt-1 text-sm text-gray-500">{{new Date(selectedDay?.date).toLocaleString('default', { weekday: 'long' })}}</p>
        </div>
        <div class="flex items-center">
          <!-- <div class="sm:hidden md:hidden flex items-center rounded-md shadow-sm">
            <button @click="prevDay(); console.log('PREVDAY IN DAY VIEW CLICKED')" type="button" class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative">
              <span class="sr-only">Previous day</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button @click="thisDay()" type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block">Today</button>
            <span class="relative -mx-px h-5 w-px bg-gray-300" />
            <button @click="nextDay(); console.log('NEXTDAY IN DAY VIEW CLICKED')" type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative">
              <span class="sr-only">Next day</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div> -->
        
          <div class="xl:hidden lg:hidden sm:flex flex flex-row md:flex items-center rounded-md shadow-sm md:items-stretch">
            <button @click="prevWeek(); console.log('PREVWEEK IN DAY VIEW CLICKED')" type="button" class="flex md:hidden items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Previous week</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button @click="thisDay()" type="button" class="hidden md:flex items-center justify-center rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white py-2 pl-4 pr-3 hover:text-gray-500 focus:relative px-2 md:hover:bg-gray-50">Today</button>
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button @click="nextWeek(); console.log('NEXTWEEK IN DAY VIEW CLICKED')" type="button" class="flex md:hidden items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
              <span class="sr-only">Next week</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div class="hidden xl:flex lg:flex md:hidden flex-row items-center rounded-md shadow-sm">
            <button @click="thisDay()" type="button" class="flex items-center justify-center rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white py-2 pl-4 pr-3 hover:text-gray-500 focus:relative px-2 md:hover:bg-gray-50">Today</button>
          </div>
          
          <!-- </div> -->

          <div class="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" class="relative">
              <MenuButton type="button" class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Day view
                <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }" @click="view = 3">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 2">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 1">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }" @click="view = 0">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <div class="ml-6 h-6 w-px bg-gray-300" />
            <button type="button" class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add event</button>
          </div>
          <Menu as="div" class="relative ml-6 md:hidden">
            <MenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open menu</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Create event</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" @click="thisDay()" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Go to today</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="view = 3">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 2">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 1">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" @click="view = 0">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </header>
      <div class="isolate flex flex-auto h-full overflow-hidden bg-white">
        <div ref="container" class="flex flex-auto flex-col overflow-auto">
          <div ref="containerNav" class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden">
            
            <button @click="setSelected(week[0])" type="button" class="flex flex-col items-center pt-3 pb-1.5">
              <span>S</span>
              <span :class="['mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold',  week[0].isSelected ? week[0].isToday ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-white' : week[0].isToday ? 'text-indigo-600' : 'text-gray-900']">{{ week[0].date.split('-')[2] }}</span>
            </button>
            <button @click="setSelected(week[1])" type="button" class="flex flex-col items-center pt-3 pb-1.5">
              <span>M</span>
              <span :class="['mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold',  week[1].isSelected ? week[1].isToday ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-white' : week[1].isToday ? 'text-indigo-600' : 'text-gray-900']">{{ week[1].date.split('-')[2] }}</span>
            </button>
            <button @click="setSelected(week[2])" type="button" class="flex flex-col items-center pt-3 pb-1.5">
              <span>T</span>
              <span :class="['mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold',  week[2].isSelected ? week[2].isToday ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-white' : week[2].isToday ? 'text-indigo-600' : 'text-gray-900']">{{ week[2].date.split('-')[2] }}</span>
            </button>
            <button @click="setSelected(week[3])" type="button" class="flex flex-col items-center pt-3 pb-1.5">
              <span>W</span>
              <!-- Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" -->
              <span :class="['mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold',  week[3].isSelected ? week[3].isToday ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-white' : week[3].isToday ? 'text-indigo-600' : 'text-gray-900']">{{ week[3].date.split('-')[2] }}</span>
            </button>
            <button @click="setSelected(week[4])" type="button" class="flex flex-col items-center pt-3 pb-1.5">
              <span>T</span>
              <span :class="['mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold',  week[4].isSelected ? week[4].isToday ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-white' : week[4].isToday ? 'text-indigo-600' : 'text-gray-900']">{{ week[4].date.split('-')[2] }}</span>
            </button>
            <button  @click="setSelected(week[5])" type="button" class="flex flex-col items-center pt-3 pb-1.5">
              <span>F</span>
              <span :class="['mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold',  week[5].isSelected ? week[5].isToday ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-white' : week[5].isToday ? 'text-indigo-600' : 'text-gray-900']">{{ week[5].date.split('-')[2] }}</span>
            </button>
            <button @click="setSelected(week[6])" type="button" class="flex flex-col items-center pt-3 pb-1.5">
              <span>S</span>
              <span :class="['mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold',  week[6].isSelected ? week[6].isToday ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-white' : week[6].isToday ? 'text-indigo-600' : 'text-gray-900']">{{ week[6].date.split('-')[2] }}</span>
            </button>
          </div>
          <div class="flex w-full flex-auto">
            <div class="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div class="grid flex-auto grid-cols-1 grid-rows-1">
              <!-- Horizontal lines -->
              <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100" style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))">
                <div ref="containerOffset" class="row-end-1 h-7"></div>
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11AM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10PM</div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11PM</div>
                </div>
                <div />
              </div>

              <!-- Events -->
              <!-- <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
                <li class="relative mt-px flex" :style="{'grid-row': `74 / span ${6*1}`}">
                  <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                    <p class="order-1 font-semibold text-blue-700">Breakfast</p>
                    <p class="text-blue-500 group-hover:text-blue-700">
                      <time datetime="2022-01-22T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                <li class="relative mt-px flex" style="grid-row: 92 / span 30">
                  <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
                    <p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
                    <p class="order-1 text-pink-500 group-hover:text-pink-700">John F. Kennedy International Airport</p>
                    <p class="text-pink-500 group-hover:text-pink-700">
                      <time datetime="2022-01-22T07:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li class="relative mt-px flex" style="grid-row: 134 / span 18">
                  <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100">
                    <p class="order-1 font-semibold text-indigo-700">Sightseeing</p>
                    <p class="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
                    <p class="text-indigo-500 group-hover:text-indigo-700">
                      <time datetime="2022-01-22T11:00">11:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol> -->

              <!-- w-[${!event.maxOverlap ? 100 : 100 / (event.maxOverlap + 1)}%] -->
              <!-- ml-[${!event.maxOverlap ? 0 : (100 * event.overlapIndex) / (event.maxOverlap + 1)}%] -->
              <!-- mr-[${!event.maxOverlap ? 0 : (100 * (event.maxOverlap - event.overlapIndex)) / (event.maxOverlap + 1)}%] -->

              <!--  ml-[${!event.maxOverlap ? 0 : (100 * event.overlapIndex) / (event.maxOverlap + 1)}%] w-[${!event.maxOverlap ? 100 : 100 / (event.maxOverlap + 1)}%] -->

              <!-- <ol v-if="selectedDay" v-for="event in selectedDay?.events" :class="`z-${Math.abs(event.maxOverlap - event.overlapIndex)} col-start-1 col-end-2 row-start-1 grid grid-cols-1 ml-[${!event.maxOverlap ? 0 : (100 * event.overlapIndex) / (event.maxOverlap + 1)}%] w-[${!event.maxOverlap ? 100 : 100 / (event.maxOverlap + 1)}%]`" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"> -->

              <!-- , 'z-index': `${event.overlapIndex}` -->
              <ol v-if="selectedDay" v-for="(event, index) in selectedDay?.events" :class="`col-start-1 col-end-2 row-start-1 grid grid-cols-1`" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
                <!-- <li :class="`relative mt-px flex hover:z-[500]`" :style="{'grid-row': `${event.startMinutesRound5 / 5 + 2} / span ${event.minuteDurationRound5/5}`, 'width': `${!event.maxOverlap ? 100 : 100 / (event.maxOverlap - 1)}%`, 'margin-left': `${!event.maxOverlap ? 0 : (90 * event.overlapIndex) / (event.maxOverlap + 1)}%`}"> -->
                <li :class="`relative mt-px flex hover:z-[500]`" :style="{'grid-row': `${event.startMinutesRound5 / 5 + 2} / span ${event.minuteDurationRound5/5}`, 'width': `${!event.maxOverlap ? 100 : 100 / (event.maxOverlap + 1)}%`, 'margin-left': `${!event.maxOverlap ? 0 : (100 * event.overlapIndex) / (event.maxOverlap + 1)}%`}">
                
                  <!-- <div class="w-full"> -->
                  <!-- ml-[${!event.maxOverlap ? 0 : roundToDecimal((100 * event.overlapIndex) / (event.maxOverlap + 1), 4)}%] w-[${!event.maxOverlap ? 100 : roundToDecimal(100 / (event.maxOverlap + 1), 3)}%] -->
                    <a href="#" :class="`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:brightness-[.9625] overflow-x-hidden`" :style="{backgroundColor: event.color}">
                      <p class="order-1 font-semibold text-gray-700">{{event.title}}</p>
                      <p class="text-gray-500 group-hover:text-gray-700">
                        <time >{{event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}} - {{event.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}}</time>
                      </p>
                    </a>
                  <!-- </div> -->
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
          <div class="flex items-center text-center text-gray-900">
            <button @click="prevMonth()" type="button" class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <div class="flex-auto font-semibold">{{new Date(selectedDay?.date).toLocaleString('default', { month: 'long', year: 'numeric' })}}</div>
            <button @click="nextMonth()" type="button" class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            <button @click="day.isSelected = false; setSelected(day)" v-for="(day, dayIdx) in days" :key="day.date" type="button" :class="['py-1.5 hover:bg-gray-100 focus:z-10', day.isCurrentMonth ? 'bg-white' : 'bg-gray-50', (day.isSelected || day.isToday) && 'font-semibold', day.isSelected && 'text-white', !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900', !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400', day.isToday && !day.isSelected && 'text-indigo-600', dayIdx === 0 && 'rounded-tl-lg', dayIdx === 6 && 'rounded-tr-lg', dayIdx === days.length - 7 && 'rounded-bl-lg', dayIdx === days.length - 1 && 'rounded-br-lg']">
              <time :datetime="day.date" :class="['mx-auto flex h-7 w-7 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900']">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
            </button>
          </div>
        </div>
      </div>
    </div>
    
</template> 