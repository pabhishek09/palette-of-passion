"use client";

import { Button } from "@/components/ui/button";

export function NewsletterSubscription() {
  const handleSubscribe = () => {
    const subject = encodeURIComponent("Newsletter Subscription Request");
    const body = encodeURIComponent("Hello,\n\nI would like to subscribe to your newsletter to receive updates about new artworks, upcoming workshops, and exclusive content from Palette of Passion.\n\nPlease add me to your mailing list.\n\nBest regards,");
    const mailtoLink = `mailto:eventinlondontoattend@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to receive updates about new artworks, upcoming workshops, and exclusive content from Palette of Passion.
        </p>

        <div className="flex justify-center">
          <Button onClick={handleSubscribe} size="lg">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
