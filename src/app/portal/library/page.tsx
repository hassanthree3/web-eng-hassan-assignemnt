"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { inputClass, secondaryButton } from "@/components/AuthShell";
import { Card, PageHeader, Panel, Status, tableHead, tableRow } from "@/components/portal/ui";
import { BOOKS, ISSUED_BOOKS, formatDate } from "@/lib/data";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [reserved, setReserved] = useState<string[]>([]);
  const q = query.trim().toLowerCase();
  const results = BOOKS.filter(
    (b) => !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q),
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Library" description="Central library catalogue and the books issued to you." />

      <Panel title="Books issued to you" bodyClassName="">
        <table className="w-full text-sm">
          <thead className={tableHead}>
            <tr>
              <th className="px-5 py-2.5">Title</th>
              <th className="px-5 py-2.5">Issued on</th>
              <th className="px-5 py-2.5">Return by</th>
            </tr>
          </thead>
          <tbody>
            {ISSUED_BOOKS.map((b) => (
              <tr key={b.title} className={tableRow}>
                <td className="px-5 py-3 text-stone-900">{b.title}</td>
                <td className="px-5 py-3 text-stone-600">{formatDate(b.issued)}</td>
                <td className="px-5 py-3 text-stone-600">{formatDate(b.due)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-stone-900">Search catalogue</h2>
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title, author or subject"
            className={inputClass + " pl-9"}
          />
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className={tableHead}>
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Subject</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {results.map((b) => {
              const isReserved = reserved.includes(b.title);
              return (
                <tr key={b.title} className={tableRow}>
                  <td className="px-5 py-3 font-medium text-stone-900">{b.title}</td>
                  <td className="px-5 py-3 text-stone-600">{b.author}</td>
                  <td className="px-5 py-3 text-stone-600">{b.category}</td>
                  <td className="px-5 py-3">
                    <Status>{b.available ? "Available" : "Issued"}</Status>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {b.available &&
                      (isReserved ? (
                        <button
                          onClick={() => setReserved((r) => r.filter((t) => t !== b.title))}
                          className="text-xs text-stone-500 hover:underline"
                        >
                          Reserved · cancel
                        </button>
                      ) : (
                        <button onClick={() => setReserved((r) => [...r, b.title])} className={secondaryButton + " px-3 py-1 text-xs"}>
                          Reserve
                        </button>
                      ))}
                  </td>
                </tr>
              );
            })}
            {results.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-stone-400">
                  No books match &ldquo;{query}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
