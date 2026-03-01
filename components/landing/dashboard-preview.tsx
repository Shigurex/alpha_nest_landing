import { CreditCard, KeyRound, Sparkles } from "lucide-react";

import KeyManagementPanel from "@/components/landing/key-management-panel";
import SectionReveal from "@/components/landing/section-reveal";
import SectionShell from "@/components/landing/section-shell";
import UsageChart from "@/components/landing/usage-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardMetrics, usageChartData } from "@/lib/landing-content";

export default function DashboardPreview() {
  return (
    <SectionShell
      id="dashboard-preview"
      eyebrow="Dashboard Preview"
      title="ログイン後の収益化導線を、LP内で具体的に見せる。"
      description="API Key管理、Usage監視、Billing導線を1画面で把握できる体験をモック表示します。"
    >
      <SectionReveal>
        <Tabs defaultValue="development">
          <TabsList>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>
          <TabsContent value="development" className="mt-4">
            <DashboardGrid env="development" />
          </TabsContent>
          <TabsContent value="production" className="mt-4">
            <DashboardGrid env="production" />
          </TabsContent>
        </Tabs>
      </SectionReveal>
    </SectionShell>
  );
}

type DashboardGridProps = {
  env: "development" | "production";
};

function DashboardGrid({ env }: DashboardGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-title-light">
            <KeyRound className="size-4 text-text-primary" /> API Key Management
          </CardTitle>
          <CardDescription>新規発行・一度だけ表示・削除</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <KeyManagementPanel env={env} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-title-light">
            <Sparkles className="size-4 text-text-primary" /> Usage Monitor
          </CardTitle>
          <CardDescription>今月の利用状況とリアルタイム予測</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-border-lighter bg-bg-01 p-3">
                <p className="text-xs text-text-light">{metric.label}</p>
                <p className="mt-1 text-lg font-semibold text-title-dark">{metric.value}</p>
                <p className="text-xs text-text-sub">{metric.hint}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <UsageChart data={usageChartData} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-title-light">
            <CreditCard className="size-4 text-text-primary" /> Billing (Stripe Integration)
          </CardTitle>
          <CardDescription>プラン変更・カード更新・請求履歴確認への導線</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href="#">Stripe Customer Portalへ移動</a>
          </Button>
          <Button variant="outline">Proプランへ変更</Button>
          <Button variant="outline">クレジットカード更新</Button>
        </CardContent>
      </Card>
    </div>
  );
}
