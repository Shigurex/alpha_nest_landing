import { ExternalLink, FileJson } from "lucide-react";

import SectionReveal from "@/components/landing/section-reveal";
import SectionShell from "@/components/landing/section-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { goSnippet, mcpSnippet, pythonSnippet } from "@/lib/landing-content";

export default function DeveloperDocs() {
  return (
    <SectionShell
      id="developer-docs"
      eyebrow="Developers"
      title="MCPとAPIをすぐに試せる実装導線。"
      description="モック段階でも、実運用を想定したコード断片とドキュメント動線を明示します。"
    >
      <SectionReveal>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="size-4 text-text-primary" />
              Quickstart Snippets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="python">
              <TabsList>
                <TabsTrigger value="python">Python API</TabsTrigger>
                <TabsTrigger value="go">Go API</TabsTrigger>
                <TabsTrigger value="mcp">MCP Config</TabsTrigger>
              </TabsList>
              <TabsContent value="python" className="mt-4">
                <CodeBlock code={pythonSnippet} language="python" />
              </TabsContent>
              <TabsContent value="go" className="mt-4">
                <CodeBlock code={goSnippet} language="go" />
              </TabsContent>
              <TabsContent value="mcp" className="mt-4">
                <CodeBlock code={mcpSnippet} language="json" />
              </TabsContent>
            </Tabs>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href="/docs/openapi">
                  OpenAPI (Swagger)
                  <ExternalLink className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/docs/mcp">
                  MCP Guide
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </SectionReveal>
    </SectionShell>
  );
}

type CodeBlockProps = {
  code: string;
  language: string;
};

function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="rounded-xl border border-border-lighter bg-bg-01 p-4">
      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-text-light">{language}</p>
      <pre className="overflow-x-auto text-xs leading-relaxed text-text-main md:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
