import Link from "next/link";

export default function BlogCard({ post }: any) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition"
    >
      {/* Show image only (backend only supports image uploads) */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}

      <h3 className="text-xl font-semibold tracking-tight">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.excerpt}</p>
    </Link>
  );
}
