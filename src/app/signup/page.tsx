"use client";

import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell, { Field, inputClass, primaryButton } from "@/components/AuthShell";
import { registerUser, type Role } from "@/lib/auth";
import { DEPARTMENTS } from "@/lib/data";

const ROLES: { value: Role; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "faculty", label: "Faculty" },
  { value: "admin", label: "Admin" },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    department: DEPARTMENTS[3],
    role: "student" as Role,
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Reset the success screen if the page is revisited later.
  useLayoutEffect(() => () => setDone(false), []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    const result = registerUser({
      name: form.name.trim(),
      email: form.email,
      phone: form.phone,
      rollNo: form.rollNo || "N/A",
      department: form.department,
      role: form.role,
      password: form.password,
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  if (done) {
    return (
      <AuthShell title="Registration complete" subtitle="Taking you to the sign in page…">
        <p className="border-l-2 border-accent-700 bg-accent-50 px-3 py-3 text-sm text-accent-800">
          Your account for <b>{form.email}</b> has been created. You can now sign in.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Register" subtitle="Create your portal account.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-stone-700">I am a</legend>
          <div className="flex gap-5 text-sm text-stone-700">
            {ROLES.map((r) => (
              <label key={r.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  checked={form.role === r.value}
                  onChange={() => update("role", r.value)}
                  className="accent-brand-700"
                />
                {r.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Full name">
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email">
            <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@smiu.edu.pk" className={inputClass} />
          </Field>
          <Field label="Phone">
            <input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="03XX-XXXXXXX" className={inputClass} />
          </Field>
        </div>

        <Field label={form.role === "student" ? "Roll number" : "Employee ID"}>
          <input value={form.rollNo} onChange={(e) => update("rollNo", e.target.value)} placeholder={form.role === "student" ? "BSE-24S-001" : "EMP-1024"} className={inputClass} />
        </Field>

        <Field label="Department">
          <select value={form.department} onChange={(e) => update("department", e.target.value)} className={inputClass}>
            {DEPARTMENTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Password">
            <input type="password" required value={form.password} onChange={(e) => update("password", e.target.value)} className={inputClass} autoComplete="new-password" />
          </Field>
          <Field label="Confirm password">
            <input type="password" required value={form.confirm} onChange={(e) => update("confirm", e.target.value)} className={inputClass} autoComplete="new-password" />
          </Field>
        </div>
        <p className="text-xs text-stone-500">At least 6 characters.</p>

        <label className="flex items-start gap-2 text-sm text-stone-600">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-brand-700" />
          I agree to the university&apos;s rules and code of conduct.
        </label>

        {error && <p className="border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button type="submit" className={primaryButton + " w-full py-2.5"}>
          Create account
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-600">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-brand-700 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
