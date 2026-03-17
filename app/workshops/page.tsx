import Image from "next/image";
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

export default async function WorkshopsPage() {
  // Fetch all workshops from Contentful, ordered by date (upcoming first)
  const entries = await getEntries({
    content_type: 'workshop',
    order: 'fields.date',
  });

  const workshops = entries.items as unknown as WorkshopEntry[];

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <h1 className="font-rethink-bold text-4xl text-center mb-12">Workshops</h1>
        {workshops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No workshops scheduled at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => {
              const { title: rawTitle, description: rawDescription, date, eventbriteUrl, image } = workshop.fields;
              const title = typeof rawTitle === "string" ? rawTitle : rawTitle?.["en-US"] ?? "";
              const description = typeof rawDescription === "string" ? rawDescription : rawDescription?.["en-US"] ?? "";
              const workshopDate = new Date(date);
              const imageUrl = getImageUrl(image);
              const isUpcoming = workshopDate > new Date();

              return (
                <div key={workshop.sys.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {imageUrl && (
                    <div className="relative aspect-video">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-rethink-bold text-xl mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                        {description}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <a href={eventbriteUrl} target="_blank" rel="noopener noreferrer">
                          {isUpcoming ? 'Book Now' : 'View Details'}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
