"use client";

import { useLayoutEffect, useState } from "react";
import { X } from "lucide-react";
import { primaryButton } from "@/components/AuthShell";
import { Card, PageHeader, Panel, Status, tableHead, tableRow } from "@/components/portal/ui";
import { FEE_BREAKDOWN, FEES, formatDate, formatPKR, type FeeVoucher } from "@/lib/data";

const METHODS = ["Debit / credit card", "JazzCash", "Easypaisa", "Bank challan (HBL)"];

export default function FeePage() {
  const [vouchers, setVouchers] = useState<FeeVoucher[]>(FEES);
  const [paying, setPaying] = useState<FeeVoucher | null>(null);
  const [method, setMethod] = useState(METHODS[0]);
  const [paid, setPaid] = useState(false);

  useLayoutEffect(
    () => () => {
      setPaying(null);
      setPaid(false);
    },
    [],
  );

  const current = vouchers[0];
  const total = FEE_BREAKDOWN.reduce((s, f) => s + f.amount, 0);

  function pay() {
    if (!paying) return;
    const today = new Date().toISOString().slice(0, 10);
    setVouchers((v) => v.map((f) => (f.id === paying.id ? { ...f, status: "Paid", paidOn: today } : f)));
    setPaid(true);
  }

  function closeDialog() {
    setPaying(null);
    setPaid(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Fee" description="Fee vouchers and payment history." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title={`Current voucher · ${current.term}`} action={<Status>{current.status}</Status>} className="lg:col-span-2">
          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-stone-500">Voucher no.</dt>
              <dd className="font-mono text-stone-900">{current.id}</dd>
            </div>
            <div>
              <dt className="text-xs text-stone-500">Due date</dt>
              <dd className="text-stone-900">{formatDate(current.due)}</dd>
            </div>
            <div>
              <dt className="text-xs text-stone-500">Amount</dt>
              <dd className="font-semibold text-stone-900">{formatPKR(current.amount)}</dd>
            </div>
          </dl>
          {current.status !== "Paid" ? (
            <button onClick={() => setPaying(current)} className={primaryButton + " mt-6"}>
              Pay online
            </button>
          ) : (
            <p className="mt-6 text-sm text-accent-700">Paid on {formatDate(current.paidOn!)}. Thank you.</p>
          )}
        </Panel>

        <Panel title="Fee breakdown">
          <table className="w-full text-sm">
            <tbody>
              {FEE_BREAKDOWN.map((f) => (
                <tr key={f.label}>
                  <td className="py-1.5 text-stone-600">{f.label}</td>
                  <td className="py-1.5 text-right text-stone-800">{formatPKR(f.amount)}</td>
                </tr>
              ))}
              <tr className="border-t border-stone-300">
                <td className="pt-2 font-semibold text-stone-900">Total</td>
                <td className="pt-2 text-right font-semibold text-stone-900">{formatPKR(total)}</td>
              </tr>
            </tbody>
          </table>
        </Panel>
      </div>

      <Card className="overflow-x-auto">
        <div className="border-b border-stone-200 px-5 py-3">
          <h2 className="text-sm font-semibold text-stone-900">Payment history</h2>
        </div>
        <table className="w-full min-w-[600px] text-sm">
          <thead className={tableHead}>
            <tr>
              <th className="px-5 py-3">Voucher</th>
              <th className="px-5 py-3">Semester</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Due</th>
              <th className="px-5 py-3">Paid on</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((f) => (
              <tr key={f.id} className={tableRow}>
                <td className="px-5 py-3 font-mono text-xs text-stone-700">{f.id}</td>
                <td className="px-5 py-3 text-stone-800">{f.term}</td>
                <td className="px-5 py-3 text-stone-800">{formatPKR(f.amount)}</td>
                <td className="px-5 py-3 text-stone-600">{formatDate(f.due)}</td>
                <td className="px-5 py-3 text-stone-600">{f.paidOn ? formatDate(f.paidOn) : "–"}</td>
                <td className="px-5 py-3">
                  <Status>{f.status}</Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {paying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-md border border-stone-200 bg-white">
            <div className="flex items-start justify-between border-b border-stone-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-stone-900">{paid ? "Payment received" : "Pay fee voucher"}</h2>
                <p className="mt-0.5 text-sm text-stone-500">
                  {paying.id} · {formatPKR(paying.amount)}
                </p>
              </div>
              <button onClick={closeDialog} aria-label="Close" className="text-stone-400 hover:text-stone-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {paid ? (
              <div className="px-5 py-5 text-sm text-stone-700">
                <p>
                  {formatPKR(paying.amount)} was paid via {method}. Your voucher is now marked as paid.
                </p>
                <p className="mt-2 text-xs text-stone-500">Demo only, no money was charged.</p>
                <div className="mt-5 flex justify-end">
                  <button onClick={closeDialog} className={primaryButton}>
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 py-5">
                <fieldset className="space-y-2 text-sm">
                  <legend className="mb-2 font-medium text-stone-700">Payment method</legend>
                  {METHODS.map((m) => (
                    <label key={m} className="flex items-center gap-3 rounded border border-stone-200 px-3 py-2.5 text-stone-700 has-checked:border-brand-700 has-checked:bg-brand-50">
                      <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} className="accent-brand-700" />
                      {m}
                    </label>
                  ))}
                </fieldset>
                <button onClick={pay} className={primaryButton + " mt-5 w-full py-2.5"}>
                  Pay {formatPKR(paying.amount)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
