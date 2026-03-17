"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export interface ArtworkEntry {
  sys: {
    id: string;
  };
  fields: ArtworkFields;
}

interface CarouselProps {
  artworks: ArtworkEntry[];
}

export function Carousel({ artworks }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [artworks.length, isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artworks.length) % artworks.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length);
  };

  if (artworks.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {artworks.map((artwork) => {
          const fields = artwork.fields;
          const title = (typeof fields.name === "string" ? fields.name : fields.name?.["en-US"] ?? "") ||
                       (typeof fields.title === "string" ? fields.title : fields.title?.["en-US"] ?? "");
          const description = typeof fields.description === "string" ? fields.description : fields.description?.["en-US"] ?? "";
          const image = fields.source || fields.image || fields.photo || fields.media || fields.picture;
          const imageUrl = getImageUrl(image);

          return (
            <div key={artwork.sys.id} className="flex-shrink-0 w-full">
              <div className="group cursor-pointer">
                {imageUrl && (
                  <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                      src={imageUrl}
                      alt={title}
                      width={800}
                      height={600}
                      className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="font-medium text-lg mt-3 mb-1 text-center">{title}</h3>
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 text-center">
                    {description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous artwork"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next artwork"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}