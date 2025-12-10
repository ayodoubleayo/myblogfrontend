// C:\Users\HomePC\myblogfrontend\src\app\blog\[slug]\page.tsx
export const dynamic = "force-dynamic";

import { fetchPost } from "@/lib/fetchPost";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import Comments from "@/components/Comments";
import LikeButtonClient from "@/components/LikeButtonClient";

/* generateMetadata code unchanged (keep your existing) */

type RawPageProps = { params: { slug: string } | Promise<{ slug: string }> };

export default async function PostPage(props: RawPageProps) {
  // (same param normalization + fetchPost code you already have)
  let paramsObj = (props as any).params;
  if (typeof paramsObj?.then === "function") {
    try {
      paramsObj = await paramsObj;
    } catch {
      redirect("/blog");
    }
  }

  const slug = paramsObj?.slug;
  if (!slug) redirect("/blog");

  let post: any = null;
  try {
    post = await fetchPost(slug);
  } catch (err) {
    console.error("fetchPost error:", err);
    redirect("/blog");
  }
  if (!post) redirect("/blog");

  api.post(`/posts/${post.id}/views`).catch(() => {});

  const isVideo = post.image_url && /\.(mp4|webm|ogg|mov)$/i.test(post.image_url);
  const isImage = post.image_url && /\.(jpg|jpeg|png|webp|gif)$/i.test(post.image_url);

  return (
    <article className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="mb-4 text-gray-500">
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
        {" • "}
        <span>{post.views ?? 0} views</span>
        {" • "}
        <span>{post.likes_count ?? 0} likes</span>
      </div>

      {/* Media */}
      {isImage && (
        <div className="mb-6">
          <img src={post.image_url} alt={post.title} className="w-full h-auto rounded object-cover" />
        </div>
      )}

      {isVideo && (
        <div className="mb-6">
          <video src={post.image_url} controls className="w-full h-auto rounded" />
        </div>
      )}

      <div className="prose max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="flex gap-2 mb-6">
        <LikeButtonClient postId={post.id} initialLikes={post.likes_count ?? 0} />
      </div>

      <Comments postId={post.id} />
    </article>
  );
}
