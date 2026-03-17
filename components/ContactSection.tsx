import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about my artwork, interested in commissions, or want to collaborate?
            I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">hello@paletteofpassion.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Mumbai, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Social Media</p>
                  <p className="text-muted-foreground">@paletteofpassion</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow My Journey</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://instagram.com/paletteofpassion" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://twitter.com/paletteofpassion" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form or Additional Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Let&apos;s Create Together</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Whether you&apos;re looking to commission a custom piece, collaborate on a project,
                or simply want to discuss art, I&apos;m always open to new connections and creative opportunities.
              </p>
              <p>
                For workshop inquiries, please check the workshops page for upcoming sessions and booking information.
              </p>
              <p>
                Response time is typically 1-2 business days. I look forward to connecting with you!
              </p>
            </div>

            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">Commission Availability</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Currently accepting commissions for custom artwork. Timeline: 4-6 weeks.
              </p>
              <Button asChild>
                <a href="mailto:hello@paletteofpassion.com?subject=Commission Inquiry">
                  Inquire About Commissions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}