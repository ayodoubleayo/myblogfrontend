import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="font-bold text-lg">
          devjourney by ayo
        </Link>

        {/* Menu */}
        <div className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin" className="font-semibold">Admin</Link>
        </div>

      </div>
    </nav>
  );
}
