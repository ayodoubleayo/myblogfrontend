import Link from "next/link";

export default function AdminHome() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Admin</h2>
      <p className="mt-2 text-gray-600">Log in and manage posts.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/admin/login" className="px-4 py-2 bg-indigo-600 text-white rounded">Login</Link>
        <Link href="/admin/posts" className="px-4 py-2 bg-gray-200 rounded">Manage Posts</Link>
      </div>
    </div>
  );
}
