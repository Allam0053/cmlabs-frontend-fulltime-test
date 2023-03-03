import useSWR from 'swr';

import { fetcherGet } from '@/lib/axios-request';
// import React from 'react';

/**
 * base function usage for useSWR
 * @param url
 * @returns SWRResponse
 */
export default function useSWRRecipes(url: string) {
  const useSWRResponse = useSWR(url, fetcherGet);
  return useSWRResponse;
}

// export function useRevalidateMealDetail(mealId: string) {
//   const [data, setData] = React.useState({});
//   const [loading, setLoading] = React.useState(false);
//   const res = fetchAndHandleMealDetail(mealId);
// }
