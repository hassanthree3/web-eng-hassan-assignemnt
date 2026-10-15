"use client";

import { useLayoutEffect, useState } from "react";
import { X } from "lucide-react";
import { primaryButton, secondaryButton } from "@/components/AuthShell";
import { Card, PageHeader, Status, Tabs, tableHead, tableRow } from "@/components/portal/ui";
import { ASSIGNMENTS, courseByCode, formatDate, type Assignment } from "@/lib/data";

const FILTERS = ["All", "Pending", "Submitted", "Graded", "Late"] as const;

export default function AssignmentsPage() {
  const [items, setItems] = useState<Assignment[]>(ASSIGNMENTS);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [submitting, setSubmitting] = useState<Assignment | null>(null);
  const [fileName, setFileName] = useState("");

  // Don't leave the upload dialog open when navigating away and back.
  useLayoutEffect(() => () => setSubmitting(null), []);

  const visible = filter === "All" ? items : items.filter((a) => a.status === filter);

  function submit() {
    if (!submitting) return;
    setItems((list) => list.map((a) => (a.id === submitting.id ? { ...a, status: "Submitted" } : a)));
    setSubmitting(null);
    setFileName("");
  }

  return (
    <div>
      <PageHeader title="Assignments" description="Coursework for the current semester." />
      <Tabs options={FILTERS} value={filter} onChange={setFilter} />

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className={tableHead}>
            <tr>
              <th className="px-5 py-3">Assignment</th>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Due date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Marks</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {visible.map((a) => (
              <tr key={a.id} className={tableRow}>
                <td className="px-5 py-3 text-stone-900">{a.title}</td>
                <td className="px-5 py-3">
                  <p className="font-mono text-xs text-stone-700">{a.course}</p>
                  <p className="text-xs text-stone-500">{courseByCode(a.course)?.title}</p>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-stone-600">{formatDate(a.due)}</td>
                <td className="px-5 py-3">
                  <Status>{a.status}</Status>
                </td>
                <td className="px-5 py-3 text-stone-700">{a.marks ?? "–"}</td>
                <td className="px-5 py-3 text-right">
                  {a.status === "Pending" && (
                    <button onClick={() => setSubmitting(a)} className={primaryButton + " px-3 py-1.5 text-xs"}>
                      Submit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-stone-400">
                  No assignments in this list.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {submitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-md border border-stone-200 bg-white">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-stone-900">Submit assignment</h2>
                <p className="mt-0.5 text-sm text-stone-500">{submitting.title}</p>
              </div>
              <button onClick={() => setSubmitting(null)} aria-label="Close" className="text-stone-400 hover:text-stone-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 py-5">
              <label className="block text-sm font-medium text-stone-700" htmlFor="assignment-file">
                Attach file (PDF, DOCX or ZIP)
              </label>
              <input
                id="assignment-file"
                type="file"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                className="mt-2 block w-full text-sm text-stone-600 file:mr-3 file:rounded file:border file:border-stone-300 file:bg-stone-50 file:px-3 file:py-1.5 file:text-sm file:text-stone-700"
              />
            </div>
            <div className="flex justify-end gap-2 border-t border-stone-200 px-5 py-3">
              <button onClick={() => setSubmitting(null)} className={secondaryButton}>
                Cancel
              </button>
              <button onClick={submit} disabled={!fileName} className={primaryButton}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
