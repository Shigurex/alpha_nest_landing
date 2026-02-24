import { ArrowRight, Bot, Database, LineChart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/landing/section-reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 md:pb-24 md:pt-28">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <SectionReveal>
          <div className="space-y-6">
            <Badge variant="default">Financial Intelligence Layer for Japan</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-title-dark md:text-6xl md:leading-[1.1]">
              日本の金融・不動産データを、
              <span className="text-title-primary">AIの力で解き放つ。</span>
            </h1>
            <p className="max-w-2xl text-sm text-text-sub md:text-lg">
              EDINET、TDnet、不動産統計を統合。エンジニアにはMCP/APIを、投資家にはデータに基づいた対話を。
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#dashboard-preview">
                  今すぐ無料でAPIキーを発行
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#use-cases">AIチャットを試す</a>
              </Button>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-border-light bg-bg-02/60 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-text-light">Signal</p>
              <p className="text-xl font-semibold text-title-dark">MCP + API + BigQuery</p>
              <p className="mt-2 text-sm text-text-sub">単一データレイヤーで、LLM利用とクオンツ分析を同時に加速。</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border-lighter bg-bg-03/70 p-4">
                <Database className="mb-3 size-4 text-text-primary" />
                <p className="text-sm font-semibold text-title-light">正規化済み</p>
              </div>
              <div className="rounded-xl border border-border-lighter bg-bg-03/70 p-4">
                <LineChart className="mb-3 size-4 text-text-primary" />
                <p className="text-sm font-semibold text-title-light">分析高速化</p>
              </div>
              <div className="rounded-xl border border-border-lighter bg-bg-03/70 p-4">
                <Bot className="mb-3 size-4 text-text-primary" />
                <p className="text-sm font-semibold text-title-light">AI対話対応</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
