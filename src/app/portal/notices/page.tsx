"use client";

import { useState } from "react";
import { Card, PageHeader, Tabs, Tag } from "@/components/portal/ui";
import { NOTICES, formatDate, type Notice } from "@/lib/data";

const CATEGORIES = ["All", "Academic", "Exams", "Events", "Admin"] as const satisfies readonly ("All" | Notice["category"])[];

export default function NoticesPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const visible = category === "All" ? NOTICES : NOTICES.filter((n) => n.category === category);

  return (
    <div>
      <PageHeader title="Notices" description="Announcements from departments and the administration." />
      <Tabs options={CATEGORIES} value={category} onChange={setCategory} />

      <Card>
        <ul className="divide-y divide-stone-200">
          {visible.map((n) => (
            <li key={n.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <Tag>{n.category}</Tag>
                {n.pinned && <span className="text-xs font-medium text-brand-700">Important</span>}
                <span className="ml-auto text-xs text-stone-500">{formatDate(n.date)}</span>
              </div>
              <h2 className="mt-2 font-medium text-stone-900">{n.title}</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-stone-600">{n.body}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
