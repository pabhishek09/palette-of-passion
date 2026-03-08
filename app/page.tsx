import { Banner } from "@/components/Banner";
import { getEntry } from "@/lib/contentful";

// define a type for the fields we expect on the banner
interface BannerFields {
  title: string;
  content: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

const ENTRY_ID = "5dcLAE8Odkg3BgaSANVN1r";

export default async function Home() {
  // fetch the entry from Contentful on the server
  const entry = await getEntry<BannerFields>(ENTRY_ID);
  console.log('Fetched entry from Contentful:', entry);
  const { title: rawTitle, content: rawContent, image } =
    entry.fields as unknown as BannerFields;

  const title =
    typeof rawTitle === "string" ? rawTitle : rawTitle?.["en-US"] ?? "";
  const description =
    typeof rawContent === "string"
      ? rawContent
      : rawContent?.["en-US"] ?? "";
  const bannerUrl = `https:${image?.fields.file.url ?? ""}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Banner
        title={title}
        description={description}
        mediaSrc={bannerUrl}
      />
    </div>
  );
}
