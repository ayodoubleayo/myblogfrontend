export default function AboutPage() {
  return (
    <div className="prose max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-4xl font-bold mb-4">About Me</h1>

      <p className="text-gray-700 leading-relaxed">
        Welcome to <strong>DevJourney by Ayo</strong> — a place where I document
        my learning, share my progress, and break down tech concepts in the
        simplest way possible.
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        This blog is my personal space to grow as a developer. I build,
        experiment, fail, learn, and keep moving. Every post here reflects my
        journey — from debugging backend errors to building beautiful frontend
        experiences.
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        My goal is simple: improve every day, help others learn, and create a
        community of people who enjoy building things with code.
      </p>

      <h2 className="text-2xl font-semibold mt-8">What You’ll Find Here</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Beginner-friendly explanations</li>
        <li>Real coding challenges and solutions</li>
        <li>Backend & frontend tutorials</li>
        <li>My journey as a self-taught developer</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Let’s Connect</h2>
      <p className="text-gray-700">
        I’m always open to connecting with other developers, designers, and
        learners. If you ever want to chat, collaborate, or share ideas, feel
        free to reach out through the contact page.
      </p>

      <p className="mt-8 font-semibold text-gray-800">
        — Ayo 🚀
      </p>
    </div>
  );
}
