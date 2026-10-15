"use client";

import { Printer } from "lucide-react";
import { secondaryButton } from "@/components/AuthShell";
import { Card, PageHeader, Stat, tableHead, tableRow } from "@/components/portal/ui";
import { CGPA, RESULTS } from "@/lib/data";

export default function ResultsPage() {
  const totalCredits = RESULTS.reduce((s, r) => s + r.credits, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results"
        description="Semester-wise grades and cumulative GPA."
        action={
          <button onClick={() => window.print()} className={secondaryButton + " no-print"}>
            <Printer className="h-4 w-4" /> Print transcript
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="CGPA" value={CGPA.toFixed(2)} hint="Out of 4.00" />
        <Stat label="Credits earned" value={String(totalCredits)} />
        <Stat label="Academic standing" value="Good" />
      </div>

      {RESULTS.map((r) => (
        <Card key={r.term} className="overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 px-5 py-3">
            <h2 className="text-sm font-semibold text-stone-900">{r.term}</h2>
            <p className="text-sm text-stone-600">
              GPA <b className="text-stone-900">{r.gpa.toFixed(2)}</b> · {r.credits} credit hours
            </p>
          </div>
          <table className="w-full min-w-[560px] text-sm">
            <thead className={tableHead}>
              <tr>
                <th className="px-5 py-3">Code</th>
                <th className="px-5 py-3">Course title</th>
                <th className="px-5 py-3">Cr. hrs</th>
                <th className="px-5 py-3">Grade</th>
                <th className="px-5 py-3">Grade points</th>
              </tr>
            </thead>
            <tbody>
              {r.courses.map((c) => (
                <tr key={c.code} className={tableRow}>
                  <td className="px-5 py-3 font-mono text-xs text-stone-600">{c.code}</td>
                  <td className="px-5 py-3 text-stone-900">{c.title}</td>
                  <td className="px-5 py-3 text-stone-600">{c.credits}</td>
                  <td className="px-5 py-3 font-semibold text-stone-900">{c.grade}</td>
                  <td className="px-5 py-3 text-stone-600">{c.points.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ))}
    </div>
  );
}
