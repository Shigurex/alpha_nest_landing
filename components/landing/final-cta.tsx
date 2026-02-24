import { ArrowRight } from "lucide-react";

import SectionReveal from "@/components/landing/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FinalCta() {
  return (
    <section className="pb-20 pt-12 md:pb-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionReveal>
          <Card className="border-border-primary/40 bg-gradient-to-r from-bg-03 to-bg-04">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-text-primary">AlphaNest</p>
                <h2 className="mt-2 text-2xl font-semibold text-title-dark md:text-3xl">
                  データに根拠を持たせるAI開発へ、今すぐ移行。
                </h2>
                <p className="mt-3 text-sm text-text-sub md:text-base">
                  無料で始めて、必要なときにAPI・MCP・分析基盤へ拡張できます。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#dashboard-preview">
                    無料で始める
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#developer-docs">ドキュメントを見る</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </SectionReveal>
      </div>
    </section>
  );
}
