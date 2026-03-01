import { NextRequest } from "next/server";

const DEFAULT_TIMEOUT_MS = 8000;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const apiBaseUrl = process.env.ALPHANEST_API_BASE_URL;
  const fallbackApiKey = process.env.ALPHANEST_API_KEY;
  const overrideApiKey = req.headers.get("X-Landing-Api-Key");
  const apiKey = overrideApiKey || fallbackApiKey;

  if (!apiBaseUrl) {
    return Response.json(
      { error: "ALPHANEST_API_BASE_URL is required" },
      { status: 500 },
    );
  }

  if (!apiKey) {
    return Response.json(
      { error: "ALPHANEST_API_KEY is required (or pass X-Landing-Api-Key)" },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  if (!path || path.length === 0) {
    return Response.json({ error: "missing API path" }, { status: 400 });
  }

  const target = new URL(`/v1/${path.join("/")}`, apiBaseUrl);
  target.search = req.nextUrl.search;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const upstream = await fetch(target.toString(), {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: req.headers.get("accept") ?? "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") ?? "application/json";
    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    return Response.json({ error: "failed to reach upstream API" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
