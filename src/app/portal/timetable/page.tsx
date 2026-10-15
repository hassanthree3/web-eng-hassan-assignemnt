import { Card, PageHeader } from "@/components/portal/ui";
import { COURSES, DAYS, SEMESTER, SLOTS, TIMETABLE, courseByCode } from "@/lib/data";

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Class Timetable" description={`${SEMESTER} · each class is 1 hour 20 minutes`} />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-stone-50 text-left text-xs font-medium uppercase tracking-wide text-stone-500">
              <th className="w-28 border-r border-stone-200 px-4 py-3">Day</th>
              {SLOTS.map((s) => (
                <th key={s} className="border-r border-stone-200 px-3 py-3 normal-case last:border-r-0">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day} className="border-t border-stone-200">
                <td className="border-r border-stone-200 px-4 py-3 font-medium text-stone-800">{day}</td>
                {TIMETABLE[day].map((code, i) => {
                  const course = code ? courseByCode(code) : null;
                  return (
                    <td key={i} className="border-r border-stone-200 p-1.5 align-top last:border-r-0">
                      {course ? (
                        <div
                          className="h-full border-l-[3px] px-2.5 py-2"
                          style={{ borderColor: course.color, background: course.color + "12" }}
                        >
                          <p className="font-mono text-[11px] text-stone-500">{course.code}</p>
                          <p className="text-sm font-medium leading-snug text-stone-900">{course.title}</p>
                          <p className="mt-0.5 text-xs text-stone-500">{course.room}</p>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-600">
        {COURSES.map((c) => (
          <span key={c.code} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5" style={{ background: c.color }} />
            {c.code} · {c.instructor}
          </span>
        ))}
      </div>
    </div>
  );
}
