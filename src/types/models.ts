export type NullableStringIntersect = string | undefined | null;

export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type NullableString = Prettify<NullableStringIntersect>;

export type Ingredient = {
  idIngredient: string;
  strIngredient: NullableString;
  strDescription: NullableString;
  strType: NullableString;
};
export type IngredientsWithImage = {
  ingredient: Ingredient;
  image: string;
}[];

export type Meal = {
  idMeal: string;
  strMeal: NullableString;
  strDrinkAlternate: NullableString;
  strCategory: NullableString;
  strArea: NullableString;
  strInstructions: NullableString;
  strMealThumb: NullableString;
  strTags: NullableString;
  strYoutube: NullableString;
  strIngredient1: NullableString;
  strIngredient2: NullableString;
  strIngredient3: NullableString;
  strIngredient4: NullableString;
  strIngredient5: NullableString;
  strIngredient6: NullableString;
  strIngredient7: NullableString;
  strIngredient8: NullableString;
  strIngredient9: NullableString;
  strIngredient10: NullableString;
  strIngredient11: NullableString;
  strIngredient12: NullableString;
  strIngredient13: NullableString;
  strIngredient14: NullableString;
  strIngredient15: NullableString;
  strIngredient16: NullableString;
  strIngredient17: NullableString;
  strIngredient18: NullableString;
  strIngredient19: NullableString;
  strIngredient20: NullableString;
  strMeasure1: NullableString;
  strMeasure2: NullableString;
  strMeasure3: NullableString;
  strMeasure4: NullableString;
  strMeasure5: NullableString;
  strMeasure6: NullableString;
  strMeasure7: NullableString;
  strMeasure8: NullableString;
  strMeasure9: NullableString;
  strMeasure10: NullableString;
  strMeasure11: NullableString;
  strMeasure12: NullableString;
  strMeasure13: NullableString;
  strMeasure14: NullableString;
  strMeasure15: NullableString;
  strMeasure16: NullableString;
  strMeasure17: NullableString;
  strMeasure18: NullableString;
  strMeasure19: NullableString;
  strMeasure20: NullableString;
  strSource: NullableString;
  strImageSource: NullableString;
  strCreativeCommonsConfirmed: NullableString;
  dateModified: NullableString;
};
