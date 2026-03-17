"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate API call - replace with actual newsletter service
    try {
      // Here you would integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setMessage("Thank you for subscribing! You'll receive updates soon.");
      setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to receive updates about new artworks, upcoming workshops, and exclusive behind-the-scenes content from Palette of Passion.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" disabled={isSubmitting} className="sm:w-auto">
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${message.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
}