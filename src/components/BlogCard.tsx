// C:\Users\HomePC\myblogfrontend\src\components\BlogCard.tsx
import Link from "next/link";

export default function BlogCard({ post }: any) {
  const isVideo = post.image_url && /\.(mp4|webm|ogg|mov)$/i.test(post.image_url);
  const isImage = post.image_url && /\.(jpg|jpeg|png|webp|gif)$/i.test(post.image_url);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition"
    >
      {isImage && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}

      {isVideo && (
        <video src={post.image_url} className="w-full h-48 object-cover rounded mb-4" controls />
      )}

      <h3 className="text-xl font-semibold tracking-tight">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.excerpt}</p>
    </Link>
  );
}
