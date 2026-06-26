export const RECIPES_API_URL =
    'https://raw.githubusercontent.com/EdwardFBDev/Cookly/master/api/recipes/recipes.json';

export type ApiRecipe = {
    id: string;
    name: string;
    description: string;
    category: string;
    cuisine?: string;
    difficulty?: string;
    prepTime?: number;
    cookTime?: number;
    servings?: number;
    image?: string;
    tags?: string[];
    ingredients?: {
        name: string;
        quantity: number;
        unit: string;
    }[];
    steps?: string[];
};

type RecipesApiResponse = {
    version: string;
    recipes: ApiRecipe[];
};

export async function fetchRecipes(): Promise<ApiRecipe[]> {
    let response: Response;

    try {
        response = await fetch(RECIPES_API_URL);
    } catch (error) {
        throw new Error('Unable to connect to the recipes service.');
    }

    if (!response.ok) {
        throw new Error(`Recipes request failed with status ${response.status}.`);
    }

    const data: unknown = await response.json();

    if (!isRecipesApiResponse(data)) {
        throw new Error('Recipes service returned an unexpected response.');
    }

    return data.recipes;
}

function isRecipesApiResponse(value: unknown): value is RecipesApiResponse {
    if (!isRecord(value)) {
        return false;
    }

    return typeof value.version === 'string' && Array.isArray(value.recipes) && value.recipes.every(isApiRecipe);
}

function isApiRecipe(value: unknown): value is ApiRecipe {
    if (!isRecord(value)) {
        return false;
    }

    return (
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        typeof value.description === 'string' &&
        typeof value.category === 'string'
    );
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}