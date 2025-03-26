import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Handle your newsletter logic here
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col
          md:flex-row items-center justify-between gap-6">
        
        <h2 className="text-3xl md:text-5xl font-medium
          tracking-widest uppercase font-display">
          Newsletter Sign Up
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex w-full md:w-auto items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-96 px-4 py-3 rounded border
              border-gray-300 focus:outline-none focus:ring-2 
              focus:ring-lime-500 font-body"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-lime-500 hover:bg-lime-600 
            text-white px-6 py-3 rounded transition font-body"
          >
            Submit
          </button>
        </form>
        </div>
    </section>
    )}