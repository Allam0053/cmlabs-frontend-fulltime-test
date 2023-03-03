import { BASE_URL, IMAGE } from '@/services/endpoints';

export function urlSearchBuilder(
  url: string,
  searchParams?: Map<string, string>
) {
  let isOmitBaseURL = false;
  const baseURL = BASE_URL;
  if (url.startsWith('/')) {
    isOmitBaseURL = true;
  }

  const URLObject = new URL(url, baseURL);
  if (!searchParams) return URLObject;
  searchParams.forEach((value, key) => {
    URLObject.searchParams.set(key, value);
  });

  if (isOmitBaseURL) {
    return `${URLObject.pathname}${URLObject.search}`;
  }
  return URLObject.toString();
}

export function urlSlugBuilder(url: string, oneSlug: string) {
  if (url.startsWith('/')) {
    return omitBaseURL(
      new URL(
        oneSlug,
        new URL(url, BASE_URL).toString() // add baseURL first, then add oneSlug, then omitBaseURL
      ).toString()
    );
  }
  return new URL(oneSlug, url).toString();
}

export function imageUrlBuilder(oneSlug?: string, ext?: string) {
  const baseURL = IMAGE;
  if (ext) return new URL(`${oneSlug}${ext}`, baseURL);
  return new URL(`${oneSlug}.png`, IMAGE);
}

export function omitBaseURL(url: string) {
  const baseURL = BASE_URL;
  const newURL = new URL(url, baseURL); // construct new URL but exclude protocol and hostname
  return `${newURL.pathname}${newURL.search}`;
}
