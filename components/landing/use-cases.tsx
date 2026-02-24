import { Check } from "lucide-react";

import SectionReveal from "@/components/landing/section-reveal";
import SectionShell from "@/components/landing/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCases } from "@/lib/landing-content";

export default function UseCases() {
  return (
    <SectionShell
      id="use-cases"
      eyebrow="Use Cases"
      title="利用者ごとの価値を、そのまま実装可能な形で提供。"
      description="AIエンジニア、クオンツ、個人投資家まで、同じデータ基盤を異なる価値に変換します。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {useCases.map((item, index) => (
          <SectionReveal key={item.title} delay={index * 0.06}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-sm text-text-sub">{item.summary}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-text-main">
                      <Check className="mt-0.5 size-4 shrink-0 text-text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </SectionReveal>
        ))}
      </div>
    </SectionShell>
  );
}
