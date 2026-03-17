import Image from "next/image";
import { getEntries } from "@/lib/contentful";
import { getImageUrl } from "@/lib/image-utils";

// Define a type for the fields we expect on artworks
interface ArtworkFields {
  title?: string | { [key: string]: string };
  name?: string | { [key: string]: string };
  description?: string | { [key: string]: string };
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  source?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  photo?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  media?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  picture?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  [key: string]: unknown; // Allow additional fields
}

interface ArtworkEntry {
  sys: {
    id: string;
  };
  fields: ArtworkFields;
}

export default async function ArtworksPage() {
  let artworks: ArtworkEntry[] = [];
  let foundContentType = '';

  try {
    // First try the expected content type
    const entries = await getEntries({
      content_type: 'artwork',
    });

    if (entries.items.length > 0) {
      artworks = entries.items as unknown as ArtworkEntry[];
      foundContentType = 'artwork';
    } else {
      // If no artworks found, try fetching all entries and filter
      console.log('No artworks found with content_type "artwork", trying all entries...');
      const allEntries = await getEntries({});

      // Filter entries that have image or title fields (likely artworks)
      artworks = allEntries.items.filter(item => {
        const fields = item.fields;
        return fields.title || fields.image || fields.photo || fields.media;
      }) as unknown as ArtworkEntry[];

      foundContentType = `filtered from ${allEntries.items.length} total entries`;
    }
  } catch (error) {
    console.error('Error fetching artworks:', error);
    // Try fetching all entries as fallback
    const allEntries = await getEntries({});
    artworks = allEntries.items.slice(0, 10) as unknown as ArtworkEntry[]; // Limit to 10 for safety
    foundContentType = 'fallback - all entries';
  }

  console.log(`Found ${artworks.length} artworks using: ${foundContentType}`);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <div className="px-4 lg:px-8 py-8">
        <h1 className="font-rethink-bold text-4xl text-center mb-12">Heartbeat on Canvas</h1>
        {artworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No artworks found. Check Contentful content type and entries.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {artworks.map((artwork, index) => {
              const fields = artwork.fields;
              // Use 'name' field for title, fallback to title
              const title = (typeof fields.name === "string" ? fields.name : fields.name?.["en-US"] ?? "") ||
                           (typeof fields.title === "string" ? fields.title : fields.title?.["en-US"] ?? "");
              const description = typeof fields.description === "string" ? fields.description : fields.description?.["en-US"] ?? "";
              // Try different possible image field names
              const image = fields.source || fields.image || fields.photo || fields.media || fields.picture;
              const imageUrl = getImageUrl(image);

              return (
                <div key={artwork.sys.id} className="cursor-pointer">
                  {imageUrl && (
                    <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-gray-100 max-w-md mx-auto">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover scale-100 hover:scale-110 transition-transform duration-300 ease-out"
                      />
                    </div>
                  )}
                  {/* <h3 className="font-medium text-lg mt-3 mb-1">{title || `Artwork ${index + 1}`}</h3> */}
                  {/* {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  )} */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
