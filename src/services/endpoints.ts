export const LIST_INGREDIENTS = '/be/api/json/v1/1/list.php'; // rewrites, for client
export const LIST_INGREDIENTS_SEARCH_PARAMS = new Map([['i', 'list']]);

export const FILTER_INGREDIENTS = '/be/api/json/v1/1/filter.php'; // rewrites, for client
export const FILTER_INGREDIENTS_SERVER =
  'https://www.themealdb.com/api/json/v1/1/filter.php'; // no rewrites, for server API
export const FILTER_INGREDIENTS_SEARCH_PARAMS = new Map([['i', '']]);

export const DETAIL_MEAL_ =
  'https://www.themealdb.com/api/json/v1/1/lookup.php'; // no rewrites, for server props
export const DETAIL_MEAL = '/be/api/json/v1/1/lookup.php'; // rewrites, for client
export const DETAIL_MEAL_SEARCH_PARAMS = new Map([['i', '']]);

export const IMAGE = 'https://www.themealdb.com/images/ingredients/'; // image default is no rewrites
export const BASE_URL = 'https://www.themealdb.com';

export const MEAL_COUNT_BY_CATEGORY = '/api/category-sum'; // /{ingredient} don't forget to add ingredient. for frontend, no rewrites
