import Link from "next/link";
import Logo from "@/components/Logo";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const QUICK_INFO = [
  { label: "Help desk", value: "(021) 111-11-1885" },
  { label: "Email", value: "info@smiu.edu.pk" },
  { label: "Office hours", value: "Mon–Fri, 9:00 am – 4:00 pm" },
];

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="border-b border-stone-200 bg-white">
        <div className="h-1 bg-brand-700" />
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={52} priority />
            <div className="leading-tight">
              <p className="font-serif text-lg font-semibold text-stone-900">Sindh Madressatul Islam University</p>
              <p className="text-xs text-stone-500">Student Management Portal</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_440px] lg:items-start lg:py-16">
        <section className="hidden lg:block">
          <p className="text-sm font-medium text-brand-700">Est. 1885 · Karachi</p>
          <h2 className="mt-3 max-w-lg font-serif text-4xl font-semibold leading-tight text-stone-900">
            One portal for your courses, results, fee and attendance.
          </h2>
          <p className="mt-4 max-w-lg text-stone-600">
            Students use their university email to sign in. If you are new, register first and your account
            will be ready right away.
          </p>

          <dl className="mt-10 max-w-lg divide-y divide-stone-200 border-y border-stone-200 text-sm">
            {QUICK_INFO.map((item) => (
              <div key={item.label} className="flex justify-between py-3">
                <dt className="text-stone-500">{item.label}</dt>
                <dd className="font-medium text-stone-800">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-md border border-stone-200 bg-white">
          <div className="border-b border-stone-200 px-6 py-5">
            <h1 className="text-xl font-semibold text-stone-900">{title}</h1>
            <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
          </div>
          <div className="px-6 py-6">{children}</div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white px-4 py-4 text-center text-xs text-stone-500">
        Web Engineering assignment · Mockup only, not affiliated with or operated by SMIU
      </footer>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded bg-brand-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-800 disabled:opacity-60";

export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50";
