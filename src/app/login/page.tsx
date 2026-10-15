"use client";

import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell, { Field, inputClass, primaryButton } from "@/components/AuthShell";
import { DEMO_USER, login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Next.js keeps this page alive after navigating away; reset it so a later
  // visit (e.g. after sign out) shows a fresh form.
  useLayoutEffect(
    () => () => {
      setLoading(false);
      setPassword("");
      setError("");
    },
    [],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Small delay so the mockup feels like a real request.
    setTimeout(() => {
      const user = login(email, password);
      if (!user) {
        setError("The email or password you entered is incorrect.");
        setLoading(false);
        return;
      }
      router.replace("/portal");
    }, 600);
  }

  return (
    <AuthShell title="Sign in" subtitle="Use your university email and password.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@smiu.edu.pk"
            className={inputClass}
            autoComplete="email"
          />
        </Field>

        <Field label="Password">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            autoComplete="current-password"
          />
        </Field>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-stone-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 accent-brand-700"
            />
            Show password
          </label>
          <button type="button" className="text-brand-700 hover:underline">
            Forgot password?
          </button>
        </div>

        {error && <p className="border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={loading} className={primaryButton + " w-full py-2.5"}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="mt-6 border-t border-stone-200 pt-5 text-sm text-stone-600">
        <p>
          Demo account: <span className="font-mono text-stone-800">{DEMO_USER.email}</span> /{" "}
          <span className="font-mono text-stone-800">{DEMO_USER.password}</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setEmail(DEMO_USER.email);
            setPassword(DEMO_USER.password);
          }}
          className="mt-1 text-brand-700 hover:underline"
        >
          Fill in demo details
        </button>
      </div>

      <p className="mt-6 text-sm text-stone-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-brand-700 hover:underline">
          Register here
        </Link>
      </p>
    </AuthShell>
  );
}
