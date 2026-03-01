import { NextRequest } from "next/server";

type IssueRequest = {
  subject?: string;
  ttl_hours?: number;
  expires_at?: string;
};

export async function POST(req: NextRequest) {
  const apiBaseUrl = process.env.ALPHANEST_API_BASE_URL;
  const adminApiKey = process.env.ALPHANEST_ADMIN_API_KEY;

  if (!apiBaseUrl || !adminApiKey) {
    return Response.json(
      { error: "ALPHANEST_API_BASE_URL and ALPHANEST_ADMIN_API_KEY are required" },
      { status: 500 },
    );
  }

  let body: IssueRequest;
  try {
    body = (await req.json()) as IssueRequest;
  } catch {
    return Response.json({ error: "invalid json body" }, { status: 400 });
  }

  const upstream = await fetch(new URL("/admin/api-keys", apiBaseUrl), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Admin-API-Key": adminApiKey,
      accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const contentType = upstream.headers.get("content-type") ?? "application/json";
  const responseBody = await upstream.text();

  return new Response(responseBody, {
    status: upstream.status,
    headers: {
      "content-type": contentType,
    },
  });
}
