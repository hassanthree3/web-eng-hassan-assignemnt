// Mock data for the portal UI. Nothing here comes from a real backend.

export const DEPARTMENTS = [
  "Business Administration",
  "Accounting, Banking & Finance",
  "Computer Science",
  "Software Engineering",
  "Artificial Intelligence & Mathematical Sciences",
  "Media & Communication Studies",
  "English",
  "Social and Development Studies",
  "Education",
  "Environmental Sciences",
];

export const SEMESTER = "Fall 2026";

export type Course = {
  code: string;
  title: string;
  credits: number;
  instructor: string;
  room: string;
  progress: number;
  attended: number;
  total: number;
  color: string;
};

export const COURSES: Course[] = [
  { code: "CS-301", title: "Web Engineering", credits: 3, instructor: "Dr. Sana Qureshi", room: "CS Lab 2", progress: 62, attended: 22, total: 24, color: "#76312c" },
  { code: "CS-305", title: "Database Systems", credits: 3, instructor: "Prof. Imran Shaikh", room: "Room 204", progress: 55, attended: 19, total: 23, color: "#1b4a31" },
  { code: "CS-311", title: "Operating Systems", credits: 3, instructor: "Dr. Faraz Ahmed", room: "Room 110", progress: 48, attended: 16, total: 22, color: "#3d5a80" },
  { code: "CS-320", title: "Software Design & Architecture", credits: 3, instructor: "Ms. Ayesha Khan", room: "Room 302", progress: 58, attended: 20, total: 22, color: "#9a6b1f" },
  { code: "MT-210", title: "Probability & Statistics", credits: 3, instructor: "Dr. Kamran Ali", room: "Room 115", progress: 51, attended: 18, total: 24, color: "#5b4a6b" },
  { code: "HU-201", title: "Professional Ethics", credits: 2, instructor: "Mr. Usman Memon", room: "Seminar Hall", progress: 66, attended: 13, total: 14, color: "#2f6b6b" },
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
export const SLOTS = ["8:30 am", "10:00 am", "11:30 am", "1:30 pm", "3:00 pm"] as const;

// day index -> slot index -> course code
export const TIMETABLE: Record<(typeof DAYS)[number], (string | null)[]> = {
  Monday: ["CS-301", "CS-305", null, "MT-210", null],
  Tuesday: ["CS-311", null, "CS-320", null, "HU-201"],
  Wednesday: ["CS-301", "MT-210", null, "CS-305", null],
  Thursday: [null, "CS-311", "CS-320", null, "CS-301"],
  Friday: ["CS-305", null, "CS-311", null, null],
};

export type Assignment = {
  id: number;
  course: string;
  title: string;
  due: string;
  status: "Pending" | "Submitted" | "Graded" | "Late";
  marks?: string;
};

export const ASSIGNMENTS: Assignment[] = [
  { id: 1, course: "CS-301", title: "Build a responsive portfolio with Next.js", due: "2026-10-22", status: "Pending" },
  { id: 2, course: "CS-305", title: "ER diagram for library system", due: "2026-10-19", status: "Pending" },
  { id: 3, course: "CS-311", title: "Process scheduling simulation (C)", due: "2026-10-12", status: "Submitted" },
  { id: 4, course: "CS-320", title: "UML class & sequence diagrams", due: "2026-10-05", status: "Graded", marks: "18/20" },
  { id: 5, course: "MT-210", title: "Problem set 3: random variables", due: "2026-10-02", status: "Graded", marks: "9/10" },
  { id: 6, course: "HU-201", title: "Case study: data privacy", due: "2026-09-28", status: "Late" },
  { id: 7, course: "CS-301", title: "HTML/CSS landing page", due: "2026-09-20", status: "Graded", marks: "19/20" },
];

export type SemesterResult = {
  term: string;
  gpa: number;
  credits: number;
  courses: { code: string; title: string; credits: number; grade: string; points: number }[];
};

export const RESULTS: SemesterResult[] = [
  {
    term: "Spring 2026",
    gpa: 3.52,
    credits: 17,
    courses: [
      { code: "CS-201", title: "Data Structures & Algorithms", credits: 4, grade: "A-", points: 3.67 },
      { code: "CS-210", title: "Computer Organization", credits: 3, grade: "B+", points: 3.33 },
      { code: "CS-215", title: "Object Oriented Programming", credits: 4, grade: "A", points: 4.0 },
      { code: "MT-205", title: "Linear Algebra", credits: 3, grade: "B", points: 3.0 },
      { code: "EN-202", title: "Technical Writing", credits: 3, grade: "A-", points: 3.67 },
    ],
  },
  {
    term: "Fall 2025",
    gpa: 3.41,
    credits: 18,
    courses: [
      { code: "CS-110", title: "Programming Fundamentals", credits: 4, grade: "A", points: 4.0 },
      { code: "CS-120", title: "Discrete Structures", credits: 3, grade: "B+", points: 3.33 },
      { code: "MT-110", title: "Calculus & Analytical Geometry", credits: 3, grade: "B", points: 3.0 },
      { code: "PH-101", title: "Applied Physics", credits: 3, grade: "B-", points: 2.67 },
      { code: "IS-101", title: "Islamic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "EN-101", title: "Functional English", credits: 3, grade: "A-", points: 3.67 },
    ],
  },
];

export const CGPA = 3.46;

export type FeeVoucher = {
  id: string;
  term: string;
  amount: number;
  due: string;
  status: "Paid" | "Unpaid" | "Overdue";
  paidOn?: string;
};

export const FEES: FeeVoucher[] = [
  { id: "CH-26F-10421", term: "Fall 2026", amount: 68500, due: "2026-10-30", status: "Unpaid" },
  { id: "CH-26S-08877", term: "Spring 2026", amount: 66000, due: "2026-03-15", status: "Paid", paidOn: "2026-03-10" },
  { id: "CH-25F-07112", term: "Fall 2025", amount: 64500, due: "2025-10-15", status: "Paid", paidOn: "2025-10-11" },
];

export const FEE_BREAKDOWN = [
  { label: "Tuition fee", amount: 55000 },
  { label: "Lab & IT charges", amount: 6000 },
  { label: "Library fee", amount: 2500 },
  { label: "Exam fee", amount: 3500 },
  { label: "Student activities", amount: 1500 },
];

export type Notice = {
  id: number;
  title: string;
  body: string;
  date: string;
  category: "Academic" | "Exams" | "Events" | "Admin";
  pinned?: boolean;
};

export const NOTICES: Notice[] = [
  { id: 1, title: "Mid-term examinations schedule announced", body: "Mid-term exams for Fall 2026 will be held from 3rd to 10th November. Detailed date sheets are available with the Examination Department.", date: "2026-10-14", category: "Exams", pinned: true },
  { id: 2, title: "Fee submission deadline: 30 October", body: "Students are advised to pay their Fall 2026 fee vouchers before 30 October to avoid late charges.", date: "2026-10-12", category: "Admin", pinned: true },
  { id: 3, title: "SMIU Tech Week 2026: registrations open", body: "Hackathon, coding contest and project exhibition. Register your team through the student affairs office.", date: "2026-10-10", category: "Events" },
  { id: 4, title: "Library extended hours during exams", body: "The central library will remain open until 9:00 PM from 1st to 12th November.", date: "2026-10-08", category: "Academic" },
  { id: 5, title: "Course withdrawal window closes 25 October", body: "Students wishing to withdraw from a course must submit the form to their department by 25 October.", date: "2026-10-05", category: "Academic" },
  { id: 6, title: "Quaid Day seminar at Seminar Hall", body: "A seminar on the vision of Quaid-e-Azam, an alumnus of SMIU, will be held on 25 December.", date: "2026-10-01", category: "Events" },
];

export type Book = {
  title: string;
  author: string;
  category: string;
  available: boolean;
};

export const BOOKS: Book[] = [
  { title: "Clean Code", author: "Robert C. Martin", category: "Software Engineering", available: true },
  { title: "Database System Concepts", author: "Silberschatz, Korth & Sudarshan", category: "Databases", available: false },
  { title: "Operating System Concepts", author: "Silberschatz, Galvin & Gagne", category: "Operating Systems", available: true },
  { title: "Introduction to Algorithms", author: "Cormen et al.", category: "Algorithms", available: true },
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Web", available: true },
  { title: "Design Patterns", author: "Gamma, Helm, Johnson & Vlissides", category: "Software Engineering", available: false },
  { title: "Computer Networking: A Top-Down Approach", author: "Kurose & Ross", category: "Networks", available: true },
  { title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", category: "AI", available: true },
];

export const ISSUED_BOOKS = [
  { title: "Database System Concepts", issued: "2026-10-01", due: "2026-10-21" },
  { title: "Design Patterns", issued: "2026-09-25", due: "2026-10-15" },
];

export function courseByCode(code: string) {
  return COURSES.find((c) => c.code === code);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatPKR(amount: number) {
  return "Rs " + amount.toLocaleString("en-PK");
}
