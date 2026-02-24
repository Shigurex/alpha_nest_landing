import { Building2, Database, Landmark, LibraryBig, ScrollText } from "lucide-react";

import SectionReveal from "@/components/landing/section-reveal";
import SectionShell from "@/components/landing/section-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dataSources } from "@/lib/landing-content";

const sourceIcons = [ScrollText, Landmark, Database, LibraryBig, Building2];

export default function DataCoverage() {
  return (
    <SectionShell
      id="data-coverage"
      eyebrow="Data Coverage"
      title="分散した公開データを、AIが読みやすい単一スキーマへ。"
      description="財務・適時開示・マクロ統計・不動産データを横断接続。モデル入力までの変換処理を最小化します。"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((source, index) => {
          const Icon = sourceIcons[index] ?? Database;

          return (
            <SectionReveal key={source.name} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-border-dark bg-bg-03 px-3 py-1 text-xs text-text-light">
                    <Icon className="size-3.5 text-text-primary" />
                    {source.category}
                  </div>
                  <CardTitle>{source.name}</CardTitle>
                  <CardDescription>{source.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-text-light">AlphaNest Coreで共通カラムへ正規化済み</p>
                </CardContent>
              </Card>
            </SectionReveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
