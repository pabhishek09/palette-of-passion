import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getEntry, getEntries } from "@/lib/contentful";
import { getImageUrl } from "@/lib/image-utils";

// Define a type for the featured artworks content model
interface FeaturedArtworksFields {
  name: string;
  artworks: Array<{
    sys: {
      id: string;
    };
  }>;
}

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

const FEATURED_ARTWORKS_ENTRY_ID = "6xlwdtsABMtC1sm2ePNQcj";

export async function FeaturedArtworks() {
  try {
    // Fetch the featured artworks entry
    const featuredEntry = await getEntry(FEATURED_ARTWORKS_ENTRY_ID);
    const featuredFields = featuredEntry.fields as unknown as FeaturedArtworksFields;


    // Get the referenced artwork IDs
    const artworkIds = featuredFields.artworks?.map((ref: { sys: { id: string } }) => ref.sys.id) || [];

    if (artworkIds.length === 0) {
      return null; // No artworks to display
    }

    // Fetch all artworks and filter by the referenced IDs
    const allArtworkEntries = await getEntries({
      content_type: 'artwork'
    });

    // Filter to only include the referenced artworks
    const artworks = allArtworkEntries.items
      .filter(item => artworkIds.includes(item.sys.id))
      .slice(0, 5) as unknown as ArtworkEntry[]; // Limit to 4 for display

    return (
      <section className="py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-rethink-bold text-3xl md:text-4xl text-center mb-8">
            Fresh From the Easel 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {artworks.map((artwork) => {
              const fields = artwork.fields;
              // Use 'name' field for title, fallback to title
              const title = (typeof fields.name === "string" ? fields.name : fields.name?.["en-US"] ?? "") ||
                           (typeof fields.title === "string" ? fields.title : fields.title?.["en-US"] ?? "");
              // Try different possible image field names
              const image = fields.source || fields.image || fields.photo || fields.media || fields.picture;
              const imageUrl = getImageUrl(image);

              return (
                <div key={artwork.sys.id} className="group cursor-pointer">
                  {imageUrl && (
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-md group-hover:shadow-2xl group-hover:shadow-black/20 transition-all duration-500 ease-out transform group-hover:scale-[1.02]">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      {/* Overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  {/* <h3 className="font-medium text-lg mt-3 mb-1">{title}</h3>
                  {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {description}
                    </p>
                  )} */}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/artworks">
                View All Artworks
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching featured artworks:', error);
    return null; // Don't show the section if there's an error
  }
}