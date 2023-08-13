export class Student {
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
  
export class YearGroup {
    name: string;
    students: Student[];
    exams: Exam[];
    sessions: Session[];
    id: number;
  
    constructor(name: string, students: Student[], exams: Exam[], sessions: Session[], id: number) {
      this.name = name;
      this.students = students;
      this.exams = exams;
      this.sessions = sessions;
      this.id = id;
    }
  }

export class Exam {
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
      color: string,
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
      this.color = color;
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
  
export class Session {
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

export default {
    Student,
    YearGroup,
    Exam,
    Session,
}