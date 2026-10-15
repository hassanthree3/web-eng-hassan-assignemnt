"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Avatar from "@/components/portal/Avatar";
import { useUser } from "@/components/portal/PortalShell";
import { Card, Panel, ProgressBar, Stat, Status, Tag } from "@/components/portal/ui";
import {
  ASSIGNMENTS,
  CGPA,
  COURSES,
  FEES,
  NOTICES,
  RESULTS,
  SEMESTER,
  SLOTS,
  TIMETABLE,
  courseByCode,
  formatDate,
  formatPKR,
} from "@/lib/data";

// The weekday is read on the client only; prerendering uses Monday.
const noopSubscribe = () => () => {};

const viewAll =(href: string, label = "View all") => (
  <Link href={href} className="text-xs font-medium text-brand-700 hover:underline">
    {label}
  </Link>
);

export default function DashboardPage() {
  const user = useUser();
  const attended = COURSES.reduce((s, c) => s + c.attended, 0);
  const total = COURSES.reduce((s, c) => s + c.total, 0);
  const attendancePct = Math.round((attended / total) * 100);
  const pending = ASSIGNMENTS.filter((a) => a.status === "Pending");
  const unpaid = FEES.find((f) => f.status !== "Paid");
  const credits = COURSES.reduce((s, c) => s + c.credits, 0);

  const todayName = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("en-US", { weekday: "long" }),
    () => "Monday",
  ) as keyof typeof TIMETABLE;
  const today = TIMETABLE[todayName] ?? TIMETABLE.Monday;
  const todayLabel = TIMETABLE[todayName] ? "Today's classes" : "Monday's classes";

  const studentInfo = [
    { label: "Name", value: user.name },
    { label: "Roll no.", value: user.rollNo },
    { label: "Department", value: user.department },
    { label: "Semester", value: `${SEMESTER} (6th)` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-stone-900">Welcome, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-stone-500">Here is your academic summary for {SEMESTER}.</p>
      </div>

      <Card className="flex flex-col sm:flex-row">
        <div className="flex items-center justify-center border-b border-stone-200 p-4 sm:border-b-0 sm:border-r">
          <Avatar user={user} size={76} />
        </div>
        <div className="grid flex-1 divide-y divide-stone-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {studentInfo.map((item) => (
            <div key={item.label} className="flex flex-col justify-center px-5 py-3">
              <p className="text-xs text-stone-500">{item.label}</p>
              <p className="truncate text-sm font-medium text-stone-900">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Stat label="CGPA" value={CGPA.toFixed(2)} hint="Out of 4.00" />
        <Stat label="Courses" value={String(COURSES.length)} hint={`${credits} credit hours`} />
        <Stat label="Attendance" value={`${attendancePct}%`} hint={`${attended} of ${total} lectures`} />
        <Stat
          label="Fee payable"
          value={unpaid ? formatPKR(unpaid.amount) : "Rs 0"}
          hint={unpaid ? `Due ${formatDate(unpaid.due)}` : "Nothing due"}
          warn={!!unpaid}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title={todayLabel} action={viewAll("/portal/timetable", "Full timetable")} className="xl:col-span-2" bodyClassName="">
          <table className="w-full text-sm">
            <tbody>
              {today.map((code, i) => {
                const course = code ? courseByCode(code) : null;
                return (
                  <tr key={SLOTS[i]} className="border-t border-stone-100 first:border-t-0">
                    <td className="w-24 whitespace-nowrap px-5 py-3 align-top text-xs text-stone-500">{SLOTS[i]}</td>
                    {course ? (
                      <td className="py-3 pr-5">
                        <p className="font-medium text-stone-900">
                          <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: course.color }} />
                          {course.title}
                        </p>
                        <p className="mt-0.5 pl-4 text-xs text-stone-500">
                          {course.code} · {course.instructor} · {course.room}
                        </p>
                      </td>
                    ) : (
                      <td className="py-3 pr-5 text-stone-400">No class</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        <Panel title="Notice board" action={viewAll("/portal/notices")}>
          <ul className="space-y-4">
            {NOTICES.slice(0, 4).map((n) => (
              <li key={n.id}>
                <div className="flex items-center gap-2">
                  <Tag>{n.category}</Tag>
                  <span className="text-xs text-stone-400">{formatDate(n.date)}</span>
                </div>
                <p className="mt-1 text-sm text-stone-800">{n.title}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Pending assignments" action={viewAll("/portal/assignments")} className="xl:col-span-2" bodyClassName="">
          <table className="w-full text-sm">
            <tbody>
              {pending.map((a) => (
                <tr key={a.id} className="border-t border-stone-100 first:border-t-0">
                  <td className="px-5 py-3">
                    <p className="text-stone-900">{a.title}</p>
                    <p className="text-xs text-stone-500">{a.course}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right text-xs text-stone-600">Due {formatDate(a.due)}</td>
                  <td className="px-5 py-3 text-right">
                    <Status>{a.status}</Status>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Semester GPA" action={viewAll("/portal/results", "Transcript")}>
          <ul className="space-y-3">
            {RESULTS.map((r) => (
              <li key={r.term}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-stone-600">{r.term}</span>
                  <span className="font-medium text-stone-900">{r.gpa.toFixed(2)}</span>
                </div>
                <ProgressBar value={(r.gpa / 4) * 100} color="#76312c" />
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-stone-500">Attendance</h3>
          <ul className="space-y-2.5">
            {COURSES.map((c) => {
              const pct = Math.round((c.attended / c.total) * 100);
              return (
                <li key={c.code}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-stone-600">{c.code}</span>
                    <span className="font-medium text-stone-800">{pct}%</span>
                  </div>
                  <ProgressBar value={pct} />
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
