"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@ayo.local");
  const [password, setPassword] = useState("password123");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important: send+receive HttpOnly cookie
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return alert("Login failed: " + (err?.error || res.statusText));
    }
    // The server set the cookie. We can optionally read returned user
    const data = await res.json();
    // no localStorage usage for token
    router.push("/admin/posts");
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Admin Login</h3>
      <label className="block mb-2">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
      <label className="block mb-2">Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
      </div>
    </form>
  );
}
