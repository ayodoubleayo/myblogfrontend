export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        I’d love to hear from you! Whether it's collaboration, questions, ideas,
        or feedback — feel free to reach out.
      </p>

      <form className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Your Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black/30"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black/80 transition"
        >
          Send Message
        </button>
      </form>

      <p className="text-gray-600 text-sm mt-6 text-center">
        I usually respond within 24–48 hours.
      </p>
    </div>
  );
}
