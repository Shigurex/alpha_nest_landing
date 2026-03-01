"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import APIConnectionStatus from "@/components/landing/api-connection-status";
import { Button } from "@/components/ui/button";

type IssuedKey = {
  api_key: string;
  subject: string;
  expires_at: string;
};

export default function KeyManagementPanel({ env }: { env: "development" | "production" }) {
  const [subject, setSubject] = useState("trial_user");
  const [ttlHours, setTtlHours] = useState(24 * 30);
  const [issued, setIssued] = useState<IssuedKey | null>(null);
  const [revealed, setRevealed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const masked = useMemo(() => {
    if (!issued) return "未発行";
    if (revealed) return issued.api_key;
    const k = issued.api_key;
    if (k.length <= 12) return "************";
    return `${k.slice(0, 8)}...${k.slice(-4)}`;
  }, [issued, revealed]);

  const issueKey = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/api-keys", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ subject, ttl_hours: ttlHours }),
      });

      const data = (await res.json()) as IssuedKey & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "キー発行に失敗しました");
        return;
      }

      setIssued(data);
      setRevealed(true);
    } catch {
      setError("キー発行に失敗しました（ネットワークエラー）");
    } finally {
      setLoading(false);
    }
  };

  const clearKey = () => {
    setIssued(null);
    setRevealed(true);
  };

  const copyKey = async () => {
    if (!issued?.api_key) return;
    await navigator.clipboard.writeText(issued.api_key);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border-lighter bg-bg-01 p-3">
        <p className="text-xs text-text-light">Current key ({env})</p>
        <p className="mt-1 break-all font-mono text-sm text-title-dark">{masked}</p>
        {issued ? (
          <p className="mt-2 text-xs text-text-sub">
            subject: {issued.subject} / expires: {issued.expires_at}
          </p>
        ) : null}
      </div>

      <APIConnectionStatus apiKey={issued?.api_key} />

      <div className="grid gap-2 md:grid-cols-2">
        <input
          className="h-9 rounded-md border border-border-dark bg-bg-01 px-3 text-xs text-title-light outline-none"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="subject (例: customer_001)"
        />
        <input
          className="h-9 rounded-md border border-border-dark bg-bg-01 px-3 text-xs text-title-light outline-none"
          value={ttlHours}
          onChange={(e) => setTtlHours(Number(e.target.value || 0))}
          type="number"
          min={1}
          step={1}
          placeholder="ttl_hours"
        />
      </div>

      {error ? <p className="text-xs text-rose-300">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={issueKey} disabled={loading || !subject.trim() || ttlHours <= 0}>
          {loading ? "発行中..." : "新規キー発行"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setRevealed((v) => !v)} disabled={!issued}>
          {revealed ? "非表示" : "表示"}
        </Button>
        <Button variant="outline" size="sm" onClick={copyKey} disabled={!issued}>
          コピー
        </Button>
        <Button variant="outline" size="sm" onClick={clearKey} disabled={!issued}>
          <Trash2 className="size-4" />
          クリア
        </Button>
      </div>
    </div>
  );
}
