"use client";

import { useState } from "react";
import { useUser } from "@/components/portal/PortalShell";
import { PageHeader, Panel } from "@/components/portal/ui";
import { inputClass, primaryButton } from "@/components/AuthShell";
import Avatar from "@/components/portal/Avatar";
import { CGPA, SEMESTER } from "@/lib/data";

export default function ProfilePage() {
  const user = useUser();
  const [saved, setSaved] = useState(false);

  const info = [
    { label: user.role === "student" ? "Roll number" : "Employee ID", value: user.rollNo },
    { label: "Department", value: user.department },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Semester", value: `${SEMESTER} (6th)` },
    { label: "CGPA", value: CGPA.toFixed(2) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your personal and academic record." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Student record">
          <div className="flex items-center gap-4">
            <Avatar user={user} size={88} className="ring-2 ring-brand-100" />
            <div>
              <p className="text-lg font-semibold text-stone-900">{user.name}</p>
              <p className="text-sm capitalize text-stone-500">{user.role}</p>
            </div>
          </div>
          <dl className="mt-5 divide-y divide-stone-200 border-t border-stone-200 text-sm">
            {info.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-stone-500">{label}</dt>
                <dd className="break-all text-right text-stone-900">{value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="Edit contact details" className="lg:col-span-2">
          <form
            key={user.email}
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
          >
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">Full name</span>
              <input defaultValue={user.name} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">Phone</span>
              <input defaultValue={user.phone} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">Date of birth</span>
              <input type="date" defaultValue="2005-05-14" className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">CNIC</span>
              <input defaultValue="42101-XXXXXXX-X" className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">Emergency contact</span>
              <input defaultValue="0321-7654321" className={inputClass} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">Address</span>
              <textarea rows={3} defaultValue="Block 7, Gulshan-e-Iqbal, Karachi" className={inputClass} />
            </label>
            <div className="flex items-center gap-4 sm:col-span-2">
              <button type="submit" className={primaryButton}>
                Save changes
              </button>
              {saved && <span className="text-sm text-accent-700">Saved (demo only).</span>}
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
}
