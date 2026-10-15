import { Card, PageHeader, ProgressBar, Stat, tableHead, tableRow } from "@/components/portal/ui";
import { COURSES } from "@/lib/data";

export default function AttendancePage() {
  const attended = COURSES.reduce((s, c) => s + c.attended, 0);
  const total = COURSES.reduce((s, c) => s + c.total, 0);
  const overall = Math.round((attended / total) * 100);
  const atRisk = COURSES.filter((c) => (c.attended / c.total) * 100 < 80);

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="At least 75% attendance is required to sit the final exam in a course." />

      {atRisk.length > 0 && (
        <p className="border-l-[3px] border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <b>Low attendance:</b> {atRisk.map((c) => `${c.title} (${Math.round((c.attended / c.total) * 100)}%)`).join(", ")}.
          Missing more classes could stop you from sitting the final exam.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Overall" value={`${overall}%`} hint={`${attended} of ${total} lectures`} />
        <Stat label="Present" value={String(attended)} />
        <Stat label="Absent" value={String(total - attended)} warn />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className={tableHead}>
            <tr>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Instructor</th>
              <th className="px-5 py-3">Lectures</th>
              <th className="px-5 py-3">Present</th>
              <th className="px-5 py-3">Absent</th>
              <th className="w-56 px-5 py-3">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {COURSES.map((c) => {
              const pct = Math.round((c.attended / c.total) * 100);
              return (
                <tr key={c.code} className={tableRow}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-stone-900">{c.title}</p>
                    <p className="font-mono text-xs text-stone-500">{c.code}</p>
                  </td>
                  <td className="px-5 py-3 text-stone-600">{c.instructor}</td>
                  <td className="px-5 py-3 text-stone-600">{c.total}</td>
                  <td className="px-5 py-3 text-stone-600">{c.attended}</td>
                  <td className="px-5 py-3 text-stone-600">{c.total - c.attended}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <ProgressBar value={pct} />
                      <span className={`w-10 text-right font-medium ${pct < 80 ? "text-amber-700" : "text-stone-800"}`}>{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
