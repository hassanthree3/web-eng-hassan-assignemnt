// Frontend-only mock auth. Users and the session live in localStorage.

export type Role = "student" | "faculty" | "admin";

export type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
  department: string;
  rollNo: string;
  phone: string;
};

const USERS_KEY = "smiu.users";
const SESSION_KEY = "smiu.session";

export const DEMO_USER: User = {
  name: "Ahmed Hassan",
  email: "ahhhassan678@gmail.com",
  password: "123456",
  role: "student",
  department: "Software Engineering",
  rollNo: "BSE-24S-073",
  phone: "0306-2461423",
};

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

export function registerUser(user: User): { ok: true } | { ok: false; error: string } {
  const email = user.email.trim().toLowerCase();
  const users = readUsers();
  if (email === DEMO_USER.email || users.some((u) => u.email === email)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, { ...user, email }]));
  } catch {
    return { ok: false, error: "Could not save account in this browser." };
  }
  return { ok: true };
}

export function login(email: string, password: string): User | null {
  const normalized = email.trim().toLowerCase();
  const match = [DEMO_USER, ...readUsers()].find(
    (u) => u.email === normalized && u.password === password,
  );
  if (!match) return null;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(match));
  } catch {
    // Session just won't persist across reloads.
  }
  return match;
}

export function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as User;
    // Always show the latest demo details, even for an older saved session.
    return session.email === DEMO_USER.email ? DEMO_USER : session;
  } catch {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}
