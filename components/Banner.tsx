import Image from "next/image"

export function Banner({
    title,
    description,
    mediaSrc,
}: Readonly<{
    title: string;
    description: string;
    mediaSrc: string;
}>) {
  return (
    <section className="pb-4">
      {/* Designer Dream Banner */}
      <div className="relative px-4 lg:px-8">
        <div className="relative w-full aspect-[3/1] rounded-sm overflow-hidden">
          <Image
            src={mediaSrc}
            alt={title}
            fill
            className="object-cover"
          />
          {/* desktop/tablet overlay */}
          <div className="absolute inset-10 bg-primary/30 flex items-end justify-center hidden md:flex text-white pb-8 rounded-lg">
            <div className="text-center w-full md:w-1/2">
              <h2 className="font-rethink-regular text-3xl md:text-5xl lg:text-6xl text-primary-foreground italic">
                {title}
              </h2>
              <p className="text-primary-foreground/90 text-sm md:text-lg mt-3 mx-auto md:mx-0">
                {description}
              </p>
            </div>
          </div>
        </div>
        {/* mobile stacked content (below image) */}
        <div className="md:hidden mt-3 px-4">
          <div className="text-center">
            <h2 className="font-rethink-regular text-2xl italic">
              {title}
            </h2>
            <p className="text-xs mt-2 max-w-md md:max-w-none mx-auto md:mx-0 md:w-1/2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
