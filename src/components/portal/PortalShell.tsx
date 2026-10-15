"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  Megaphone,
  Menu,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";
import Avatar from "@/components/portal/Avatar";
import { getSession, logout, type User } from "@/lib/auth";
import { SEMESTER } from "@/lib/data";

const NAV_GROUPS = [
  {
    title: "General",
    items: [
      { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
      { href: "/portal/notices", label: "Notices", icon: Megaphone },
      { href: "/portal/profile", label: "Profile", icon: UserRound },
    ],
  },
  {
    title: "Academics",
    items: [
      { href: "/portal/courses", label: "Courses", icon: BookOpen },
      { href: "/portal/timetable", label: "Timetable", icon: CalendarDays },
      { href: "/portal/attendance", label: "Attendance", icon: ClipboardCheck },
      { href: "/portal/assignments", label: "Assignments", icon: FileText },
      { href: "/portal/results", label: "Results", icon: GraduationCap },
    ],
  },
  {
    title: "Services",
    items: [
      { href: "/portal/fee", label: "Fee", icon: Wallet },
      { href: "/portal/library", label: "Library", icon: Library },
    ],
  },
];

const ALL_NAV = NAV_GROUPS.flatMap((g) => g.items);

// Stand-in while the session is read from localStorage. Pages still render
// (hidden) during that moment so Next.js can prerender the portal.
const PLACEHOLDER_USER: User = {
  name: "",
  email: "",
  password: "",
  role: "student",
  department: "",
  rollNo: "",
  phone: "",
};

const UserContext = createContext<User>(PLACEHOLDER_USER);

export function useUser() {
  return useContext(UserContext);
}

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- session only exists in localStorage, read after mount
    setUser(session);
  }, [router]);

  // Close the mobile menu when the portal is hidden by a navigation.
  useLayoutEffect(() => () => setMenuOpen(false), []);

  function handleLogout() {
    logout();
    setUser(null);
    router.replace("/login");
  }

  const isActive = (href: string) => (href === "/portal" ? pathname === href : pathname.startsWith(href));
  const current = ALL_NAV.find((n) => isActive(n.href));

  return (
    <UserContext.Provider value={user ?? PLACEHOLDER_USER}>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-stone-200 bg-white">
          <div className="h-1 bg-brand-700" />
          <div className="flex items-center gap-3 px-4 py-2 sm:px-6">
            <button
              className="rounded p-1.5 text-stone-700 hover:bg-stone-100 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/portal" className="flex items-center gap-3">
              <Logo size={52} priority />
              <div className="hidden leading-tight sm:block">
                <p className="font-serif text-base font-semibold text-stone-900">Sindh Madressatul Islam University</p>
                <p className="text-xs text-stone-500">Student Management Portal</p>
              </div>
            </Link>

            <div className="ml-auto flex items-center gap-4">
              {user && (
                <Link href="/portal/profile" className="flex items-center gap-3">
                  <div className="hidden text-right leading-tight md:block">
                    <p className="text-sm font-medium text-stone-900">{user.name}</p>
                    <p className="text-xs text-stone-500">{user.rollNo}</p>
                  </div>
                  <Avatar user={user} size={38} className="ring-1 ring-stone-200" />
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded border border-stone-300 px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {menuOpen && (
            <button
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <aside
            className={`fixed inset-y-0 left-0 z-50 w-60 shrink-0 overflow-y-auto border-r border-stone-200 bg-white transition-transform lg:sticky lg:top-[73px] lg:z-0 lg:h-[calc(100vh-73px)] lg:translate-x-0 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 lg:hidden">
              <span className="text-sm font-semibold text-stone-900">Menu</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-stone-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="py-4">
              {NAV_GROUPS.map((group) => (
                <div key={group.title} className="mb-4">
                  <p className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    {group.title}
                  </p>
                  {group.items.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onNavigate={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 border-l-[3px] px-5 py-2 text-sm transition ${
                        isActive(href)
                          ? "border-brand-700 bg-brand-50 font-medium text-brand-800"
                          : "border-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="border-b border-stone-200 bg-white px-4 py-3 text-sm sm:px-6 lg:px-8">
              <span className="text-stone-500">Portal</span>
              <span className="mx-2 text-stone-300">/</span>
              <span className="font-medium text-stone-800">{current?.label ?? "Dashboard"}</span>
              <span className="float-right hidden text-stone-500 sm:inline">{SEMESTER}</span>
            </div>
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              {!user && <p className="py-20 text-center text-sm text-stone-500">Loading…</p>}
              <div hidden={!user}>{children}</div>
            </main>
            <footer className="border-t border-stone-200 px-4 py-4 text-xs text-stone-500 sm:px-6 lg:px-8">
              © SMIU Portal mockup · Web Engineering assignment · Not an official Sindh Madressatul Islam University system
            </footer>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}
