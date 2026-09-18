import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!apiKey) {
    console.error("Space image: UNSPLASH_ACCESS_KEY is missing from the server environment.");
    return NextResponse.json({ error: "Image service is not configured." }, { status: 503 });
  }

  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/random?query=purple%20nebula%20night%20sky&content_filter=high",
      {
        headers: { Authorization: `Client-ID ${apiKey}` },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!response.ok) {
      console.error(`Space image: Unsplash returned HTTP ${response.status}.`);
      return NextResponse.json({ error: "Image provider is unavailable." }, { status: 502 });
    }
    const data = await response.json();
    if (!data?.urls?.regular || !data?.user?.name || !data?.user?.links?.html || !data?.created_at) {
      throw new Error("Invalid image response");
    }
    return NextResponse.json({
      urls: { regular: data.urls.regular },
      user: { name: data.user.name, profile: data.user.links.html },
      created_at: data.created_at,
      alt_description: data.alt_description || "Night sky photography",
    });
  } catch {
    console.error("Space image: upstream request timed out or returned an invalid response.");
    return NextResponse.json({ error: "Image provider is unavailable." }, { status: 502 });
  }
}
