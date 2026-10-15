"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { getSession } from "@/lib/auth";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(getSession() ? "/portal" : "/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-white">
      <div className="h-1.5 bg-brand-700" />
      <div className="h-0.5 bg-accent-800" />

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in">
          <Logo size={200} priority />
        </div>

        <div className="animate-fade-in mt-6" style={{ animationDelay: "0.25s" }}>
          <p className="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl">
            Sindh Madressatul Islam University
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-stone-500">Student Management Portal</p>
        </div>

        <div className="mt-10 h-0.5 w-48 overflow-hidden bg-stone-200">
          <div className="animate-load-bar h-full bg-brand-700" />
        </div>
      </div>

      <footer className="border-t border-stone-200 px-6 py-4 text-center text-xs text-stone-500">
        Hasrat Mohani Road, Karachi · Academic project, not an official SMIU system
      </footer>
    </main>
  );
}
