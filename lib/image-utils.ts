/**
 * Utility function to get the proper image URL from a Contentful image field
 * Handles different URL formats (absolute, protocol-relative, relative)
 */
export function getImageUrl(imageField: { fields?: { file?: { url?: string } } } | undefined): string | null {
  if (!imageField?.fields?.file?.url) {
    return null;
  }

  const url = imageField.fields.file.url;

  // If URL already starts with http/https, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If URL starts with //, it's protocol-relative, add https:
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  // Otherwise, assume it's a relative path and add https:
  return `https:${url}`;
}