import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getEntries } from "@/lib/contentful";
import { getImageUrl } from "@/lib/image-utils";

// Define a type for the fields we expect on workshops
interface WorkshopFields {
  title: string;
  description?: string;
  date: string;
  eventbriteUrl: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

interface WorkshopEntry {
  sys: {
    id: string;
  };
  fields: WorkshopFields;
}

export async function FeaturedWorkshops() {
  // Fetch workshops from Contentful, ordered by date (upcoming first)
  const entries = await getEntries({
    content_type: 'workshop',
    order: 'fields.date',
    limit: 1, // Get the next upcoming workshop
  });

  const workshops = entries.items as unknown as WorkshopEntry[];

  if (workshops.length === 0) {
    return null; // Don't show section if no workshops
  }

  const workshop = workshops[0];
  const { title: rawTitle, description: rawDescription, date, eventbriteUrl, image } = workshop.fields;
  const title = typeof rawTitle === "string" ? rawTitle : rawTitle?.["en-US"] ?? "";
  const description = typeof rawDescription === "string" ? rawDescription : rawDescription?.["en-US"] ?? "";
  const workshopDate = new Date(date);
  const imageUrl = getImageUrl(image);

  return (
    <section className="py-12 px-4 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-rethink-bold text-3xl md:text-4xl text-center mb-8">
          Upcoming Workshop
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {imageUrl && (
                <div className="md:w-1/2">
                  <div className="relative aspect-video md:aspect-square">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div className={`${imageUrl ? 'md:w-1/2' : 'w-full'} p-8`}>
                <div className="mb-4">
                  <h3 className="font-rethink-bold text-2xl mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {workshopDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="flex-1">
                    <a href={eventbriteUrl} target="_blank" rel="noopener noreferrer">
                      Book Now
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href="/workshops">
                      View All Workshops
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}