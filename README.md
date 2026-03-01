# alpha_nest_landing

Next.js で構築した Alpha Nest ランディングページです。

## セットアップ

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## API 接続

この LP は、ブラウザから直接バックエンドを叩かず、Next.js サーバー経由で API を呼び出します。

必要な環境変数:

- `ALPHANEST_API_BASE_URL` 例: `http://localhost:8080` または `https://api.alphanest.jp`
- `ALPHANEST_API_KEY` 既存キーでの閲覧用（任意）
- `ALPHANEST_ADMIN_API_KEY` ダッシュボードの「新規キー発行」用

実装済みプロキシ:

- `GET /api/v1/*` -> `${ALPHANEST_API_BASE_URL}/v1/*`
  - `X-Landing-Api-Key` ヘッダーがあればそれを優先し、なければ `ALPHANEST_API_KEY` を使用
- `POST /api/admin/api-keys` -> `${ALPHANEST_API_BASE_URL}/admin/api-keys`
  - 上流呼び出し時に `X-Admin-API-Key: ${ALPHANEST_ADMIN_API_KEY}` を自動付与

確認方法:

- LP の Dashboard Preview で「新規キー発行」を押し、キーが表示されることを確認
- 同画面の接続表示が `API接続OK` になることを確認
