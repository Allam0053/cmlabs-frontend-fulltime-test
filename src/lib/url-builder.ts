import { IMAGE } from '@/services/endpoints';

export function urlSearchBuilder(
  url: string,
  searchParams?: Map<string, string>
) {
  const URLObject = new URL(url);
  if (!searchParams) return URLObject;
  searchParams.forEach((value, key) => {
    URLObject.searchParams.set(key, value);
  });
  return URLObject;
}

export function urlSlugBuilder(url: string, oneSlug: string) {
  return new URL(oneSlug, url);
}

export function imageUrlBuilder(oneSlug?: string, ext?: string) {
  if (ext) return new URL(`${oneSlug}${ext}`, IMAGE);
  return new URL(`${oneSlug}.png`, IMAGE);
}
