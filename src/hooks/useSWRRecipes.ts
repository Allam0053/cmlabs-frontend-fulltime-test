import useSWR from 'swr';

import { fetcherGet } from '@/lib/axios-request';

/**
 * base function usage for useSWR
 * @param url
 * @returns SWRResponse
 */
export default function useSWRRecipes(url: string) {
  const useSWRResponse = useSWR(url, fetcherGet);
  return useSWRResponse;
}
