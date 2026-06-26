export type RecipeCatalogFilter = 'all' | 'available-now' | 'under-30' | 'favorites';

export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export type RecipeTimeFilter = 'under-15' | 'under-30' | 'under-60';

export type RecipeAvailabilityFilter = 'available-now' | 'missing-one';

export type RecipeStructuredFilters = {
    category?: RecipeCategory;
    time?: RecipeTimeFilter;
    availability?: RecipeAvailabilityFilter;
};

export type RecipeIngredientAvailability = 'available' | 'missing';

export type RecipeIngredient = {
    id: string;
    name: string;
    quantityLabel: string;
    availability: RecipeIngredientAvailability;
};

export type RecipeStep = {
    id: string;
    title: string;
    description: string;
};

export type Recipe = {
    id: string;
    title: string;
    description?: string;
    category: RecipeCategory;
    cookTimeMinutes: number;
    servings: number;
    compatibility: number;
    matchLabel: string;
    missingIngredientCount: number;
    imageUrl: string;
    accentColor: string;
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
    isFavorite: boolean;
    isOwned: boolean;
};

export type CreateRecipeInput = {
    title: string;
    category: RecipeCategory;
    cookTimeMinutes: number;
    servings: number;
};
