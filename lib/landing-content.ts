export type DataSourceItem = {
  name: string;
  category: string;
  description: string;
};

export type UseCaseItem = {
  title: string;
  summary: string;
  points: string[];
};

export type DashboardMetric = {
  label: string;
  value: string;
  hint: string;
};

export type ChartPoint = {
  day: string;
  requests: number;
  cost: number;
};

export const dataSources: DataSourceItem[] = [
  {
    name: "EDINET",
    category: "財務開示",
    description: "有価証券報告書・四半期報告書をAI利用向けに正規化",
  },
  {
    name: "TDnet",
    category: "適時開示",
    description: "決算短信・適時開示情報を時系列で統合",
  },
  {
    name: "日本銀行",
    category: "マクロ統計",
    description: "主要金利・経済指標をクエリしやすい単位に統一",
  },
  {
    name: "e-Stat",
    category: "官公庁統計",
    description: "人口・地域統計を地理軸で結合し分析しやすく整理",
  },
  {
    name: "不動産情報ライブラリ",
    category: "地価・取引",
    description: "地価公示・取引情報を企業データと横断可能に整形",
  },
];

export const useCases: UseCaseItem[] = [
  {
    title: "MCP連携で対話分析",
    summary:
      "Claude DesktopにMCPとして追加し、企業財務と周辺地価を横断して会話で深掘り。",
    points: [
      "MCP接続後すぐに財務・不動産データへアクセス",
      "要約だけでなく根拠レコードまで遡って確認",
      "社内アナリスト向けの初期調査を短時間で実施",
    ],
  },
  {
    title: "APIで独自モデル構築",
    summary:
      "Python/GoからAPIを叩き、スコアリングモデルやスクリーニング基盤を内製。",
    points: [
      "正規化済みJSONで前処理コストを削減",
      "BigQuery連携を前提にした列設計で集計が高速",
      "開発環境から本番環境まで同一スキーマで運用",
    ],
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "今月のリクエスト",
    value: "1,284,220",
    hint: "前月比 +18.4%",
  },
  {
    label: "現在の利用料金",
    value: "¥148,320",
    hint: "予測着地: ¥176,000",
  },
  {
    label: "BigQuery Scan予測",
    value: "2.4 TB",
    hint: "予算上限まで 31%",
  },
];

export const usageChartData: ChartPoint[] = [
  { day: "02/01", requests: 38000, cost: 4200 },
  { day: "02/05", requests: 52000, cost: 5600 },
  { day: "02/09", requests: 61000, cost: 6900 },
  { day: "02/13", requests: 74000, cost: 8400 },
  { day: "02/17", requests: 68000, cost: 7900 },
  { day: "02/21", requests: 86000, cost: 9900 },
  { day: "02/24", requests: 93000, cost: 11000 },
];

export const pythonSnippet = `import requests

resp = requests.get(
  "https://api.alphanest.jp/v1/company/7203/insights",
  headers={"X-API-Key": "YOUR_API_KEY"},
  params={"include": "financials,real-estate"},
)

print(resp.json()["summary"])`;

export const goSnippet = `client := &http.Client{Timeout: 10 * time.Second}
req, _ := http.NewRequest(
  "GET",
  "https://api.alphanest.jp/v1/screening",
  nil,
)
req.Header.Set("X-API-Key", "YOUR_API_KEY")
q := req.URL.Query()
q.Set("market", "TSE")
q.Set("score_gt", "72")
req.URL.RawQuery = q.Encode()

res, _ := client.Do(req)`;

export const mcpSnippet = `{
  "mcpServers": {
    "alphanest": {
      "command": "npx",
      "args": ["-y", "@alphanest/mcp"],
      "env": {
        "ALPHANEST_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}`;
