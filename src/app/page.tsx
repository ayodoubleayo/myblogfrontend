import BlogList from "../components/BlogList";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mt-10 space-y-16">

      {/* Hero section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome to <span className="text-blue-600">DevJourney</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Explore my experiences, projects, and lessons as I grow as a software developer.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Read Blog
          </Link>

          <Link
            href="/about"
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg shadow hover:bg-gray-300 transition"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Blog posts list */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
        <BlogList />
      </section>

    </div>
  );
}
