export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-md border border-stone-200 bg-white ${className}`}>{children}</div>;
}

/** Card with a titled header row, like a panel in a classic university ERP. */
export function Panel({
  title,
  action,
  children,
  className = "",
  bodyClassName = "p-5",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-5 py-3">
        <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
        {action}
      </div>
      <div className={bodyClassName}>{children}</div>
    </Card>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-stone-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-stone-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stat({ label, value, hint, warn }: { label: string; value: string; hint?: string; warn?: boolean }) {
  return (
    <Card className="px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${warn ? "text-brand-700" : "text-stone-900"}`}>{value}</p>
      {hint && <p className="mt-0.5 text-xs text-stone-500">{hint}</p>}
    </Card>
  );
}

const STATUS_TONES: Record<string, string> = {
  Pending: "text-amber-700",
  Submitted: "text-sky-700",
  Graded: "text-accent-700",
  Late: "text-red-700",
  Paid: "text-accent-700",
  Unpaid: "text-amber-700",
  Overdue: "text-red-700",
  Available: "text-accent-700",
  Issued: "text-stone-500",
};

const DOT_TONES: Record<string, string> = {
  Pending: "bg-amber-500",
  Submitted: "bg-sky-600",
  Graded: "bg-accent-700",
  Late: "bg-red-600",
  Paid: "bg-accent-700",
  Unpaid: "bg-amber-500",
  Overdue: "bg-red-600",
  Available: "bg-accent-700",
  Issued: "bg-stone-400",
};

/** Small status label: coloured dot + text. */
export function Status({ children }: { children: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${STATUS_TONES[children] ?? "text-stone-600"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_TONES[children] ?? "bg-stone-400"}`} />
      {children}
    </span>
  );
}

/** Category tag for notices. */
export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-sm border border-stone-300 px-1.5 py-px text-[11px] font-medium uppercase tracking-wide text-stone-600">
      {children}
    </span>
  );
}

export function ProgressBar({ value, color }: { value: number; color?: string }) {
  const fill = color ?? (value >= 85 ? "#1b4a31" : value >= 75 ? "#b7791f" : "#b91c1c");
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, value)}%`, background: fill }} />
    </div>
  );
}

export function Tabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mb-5 flex gap-6 overflow-x-auto border-b border-stone-200">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`-mb-px whitespace-nowrap border-b-2 pb-2 text-sm transition ${
            value === o
              ? "border-brand-700 font-medium text-brand-800"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export const tableHead = "bg-stone-50 text-left text-xs font-medium uppercase tracking-wide text-stone-500";
export const tableRow = "border-t border-stone-200";
