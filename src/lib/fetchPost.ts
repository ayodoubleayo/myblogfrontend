export async function fetchPost(slug: string) {
  const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const res = await fetch(`${BASE}/api/posts/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
