import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAndHandleMealDetail } from '@/lib/axios-request';

const TEST_ID = '52846';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // const id = lodashGet(context, 'params.id', '').toString();

  const response = await fetchAndHandleMealDetail(TEST_ID);
  // const mealRes = response.data.meal[0];
  res.status(200).json(response.data);
}
