import { Card, PageHeader, ProgressBar, tableHead, tableRow } from "@/components/portal/ui";
import { COURSES, SEMESTER } from "@/lib/data";

export default function CoursesPage() {
  const credits = COURSES.reduce((s, c) => s + c.credits, 0);

  return (
    <div>
      <PageHeader
        title="Registered Courses"
        description={`${SEMESTER} · ${COURSES.length} courses · ${credits} credit hours`}
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className={tableHead}>
            <tr>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Course title</th>
              <th className="px-5 py-3">Cr. hrs</th>
              <th className="px-5 py-3">Instructor</th>
              <th className="px-5 py-3">Room</th>
              <th className="w-48 px-5 py-3">Syllabus covered</th>
            </tr>
          </thead>
          <tbody>
            {COURSES.map((c) => (
              <tr key={c.code} className={tableRow}>
                <td className="px-5 py-3">
                  <span className="border-l-[3px] pl-2 font-mono text-xs font-medium text-stone-700" style={{ borderColor: c.color }}>
                    {c.code}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-stone-900">{c.title}</td>
                <td className="px-5 py-3 text-stone-600">{c.credits}</td>
                <td className="px-5 py-3 text-stone-600">{c.instructor}</td>
                <td className="px-5 py-3 text-stone-600">{c.room}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <ProgressBar value={c.progress} color={c.color} />
                    <span className="w-9 text-right text-xs text-stone-600">{c.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-stone-300 bg-stone-50 text-sm">
              <td className="px-5 py-3" />
              <td className="px-5 py-3 font-medium text-stone-700">Total</td>
              <td className="px-5 py-3 font-medium text-stone-900">{credits}</td>
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </Card>
    </div>
  );
}
