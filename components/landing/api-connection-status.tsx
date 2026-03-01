"use client";

import { useEffect, useState } from "react";

type ConnectionResult = {
  key: string;
  status: "ok" | "error";
  message: string;
};

export default function APIConnectionStatus({ apiKey }: { apiKey?: string }) {
  const [result, setResult] = useState<ConnectionResult | null>(null);

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    let active = true;

    const run = async () => {
      try {
        const res = await fetch("/api/v1/auth/check", {
          cache: "no-store",
          headers: { "X-Landing-Api-Key": apiKey },
        });
        if (!active) return;

        if (res.ok) {
          setResult({ key: apiKey, status: "ok", message: "API接続OK: /v1/auth/check" });
          return;
        }

        const text = await res.text();
        const reason = text.slice(0, 120);
        setResult({
          key: apiKey,
          status: "error",
          message: `API接続失敗 (${res.status}): ${reason}`,
        });
      } catch {
        if (!active) return;
        setResult({ key: apiKey, status: "error", message: "API接続失敗: ネットワークエラー" });
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [apiKey]);

  if (!apiKey) {
    return <p className="text-xs text-text-sub">キー未発行です。『新規キー発行』で接続チェックを開始します。</p>;
  }

  if (!result || result.key !== apiKey) {
    return <p className="text-xs text-text-light">API接続チェック中...</p>;
  }

  if (result.status === "ok") {
    return <p className="text-xs text-emerald-300">{result.message}</p>;
  }

  return <p className="text-xs text-rose-300">{result.message}</p>;
}
