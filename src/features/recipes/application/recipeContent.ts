import {
    CreateRecipeInput,
    Recipe,
    RecipeAvailabilityFilter,
    RecipeCatalogFilter,
    RecipeCategory,
    RecipeStructuredFilters,
    RecipeTimeFilter,
} from '@/features/recipes/domain/RecipeModels';

export const RECIPE_FILTERS: { key: RecipeCatalogFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'available-now', label: 'Available Now' },
    { key: 'under-30', label: 'Under 30 min' },
    { key: 'favorites', label: 'Favorites' },
];

export const RECIPE_CATEGORIES: { key: RecipeCategory; label: string }[] = [
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'dinner', label: 'Dinner' },
    { key: 'snacks', label: 'Snacks' },
];

export const RECIPE_TIME_FILTERS: { key: RecipeTimeFilter; label: string }[] = [
    { key: 'under-15', label: 'Under 15 min' },
    { key: 'under-30', label: '30 min' },
    { key: 'under-60', label: '60 min' },
];

export const RECIPE_AVAILABILITY_FILTERS: {
    key: RecipeAvailabilityFilter;
    label: string;
    description: string;
}[] = [
    {
        key: 'available-now',
        label: 'Available Now',
        description: 'Uses only items in your pantry',
    },
    {
        key: 'missing-one',
        label: 'Missing 1 ingredient',
        description: 'Quick shop or easy substitute',
    },
];

const INITIAL_RECIPES: Recipe[] = [
    {
        id: 'creamy-mushroom-pasta',
        title: 'Creamy Mushroom Pasta',
        category: 'dinner',
        cookTimeMinutes: 20,
        servings: 2,
        compatibility: 100,
        matchLabel: '100% Match',
        missingIngredientCount: 0,
        imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
        accentColor: '#3D3325',
        isFavorite: true,
        isOwned: false,
        ingredients: [
            { id: 'pasta', name: 'Pasta (Pappardelle)', quantityLabel: '250g', availability: 'available' },
            { id: 'garlic', name: 'Garlic Cloves', quantityLabel: '3 units', availability: 'available' },
            { id: 'cream', name: 'Heavy Cream', quantityLabel: '200ml', availability: 'available' },
            { id: 'parsley', name: 'Fresh Parsley', quantityLabel: 'Missing', availability: 'missing' },
        ],
        steps: [
            {
                id: 'boil-pasta',
                title: 'Boil pasta',
                description:
                    'Bring a large pot of salted water to a boil. Add the pasta and cook until al dente according to package instructions. Reserve pasta water before draining.',
            },
            {
                id: 'saute-mushrooms',
                title: 'Saute mushrooms',
                description:
                    'Heat olive oil over medium-high heat. Add sliced mushrooms and cook without stirring until browned, then add minced garlic and saute until fragrant.',
            },
            {
                id: 'combine-sauce',
                title: 'Combine sauce',
                description:
                    'Lower heat and pour in heavy cream. Simmer until thickened, then toss with pasta and reserved pasta water until glossy.',
            },
        ],
    },
    {
        id: 'honey-glazed-salmon',
        title: 'Honey Glazed Salmon',
        category: 'dinner',
        cookTimeMinutes: 25,
        servings: 2,
        compatibility: 86,
        matchLabel: 'Missing 1 ingredient',
        missingIngredientCount: 1,
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
        accentColor: '#4B2A1F',
        isFavorite: false,
        isOwned: false,
        ingredients: [
            { id: 'salmon', name: 'Salmon Fillets', quantityLabel: '2 fillets', availability: 'available' },
            { id: 'honey', name: 'Honey', quantityLabel: '2 tbsp', availability: 'available' },
            { id: 'soy-sauce', name: 'Soy Sauce', quantityLabel: '1 tbsp', availability: 'available' },
            { id: 'asparagus', name: 'Asparagus', quantityLabel: 'Missing', availability: 'missing' },
        ],
        steps: [
            {
                id: 'mix-glaze',
                title: 'Mix glaze',
                description: 'Whisk honey, soy sauce, garlic, and lemon juice until smooth.',
            },
            {
                id: 'sear-salmon',
                title: 'Sear salmon',
                description: 'Cook salmon skin-side down until crisp, then flip and brush with glaze.',
            },
            {
                id: 'finish',
                title: 'Finish and rest',
                description: 'Simmer briefly until the glaze thickens and rest the salmon before serving.',
            },
        ],
    },
    {
        id: 'beef-tacos',
        title: 'Beef Tacos',
        category: 'lunch',
        cookTimeMinutes: 35,
        servings: 4,
        compatibility: 85,
        matchLabel: '85% Match',
        missingIngredientCount: 1,
        imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80',
        accentColor: '#49311D',
        isFavorite: false,
        isOwned: false,
        ingredients: [
            { id: 'beef', name: 'Ground Beef', quantityLabel: '500g', availability: 'available' },
            { id: 'tortillas', name: 'Corn Tortillas', quantityLabel: '8 units', availability: 'available' },
            { id: 'lime', name: 'Lime', quantityLabel: '1 unit', availability: 'available' },
            { id: 'cilantro', name: 'Cilantro', quantityLabel: 'Missing', availability: 'missing' },
        ],
        steps: [
            {
                id: 'cook-beef',
                title: 'Cook beef',
                description: 'Brown ground beef with spices until fully cooked and slightly crisp.',
            },
            {
                id: 'warm-tortillas',
                title: 'Warm tortillas',
                description: 'Warm tortillas in a dry pan until pliable and lightly charred.',
            },
            {
                id: 'assemble',
                title: 'Assemble tacos',
                description: 'Fill tortillas with beef, onion, lime, and available toppings.',
            },
        ],
    },
    {
        id: 'grandmas-stew',
        title: "Grandma's Stew",
        category: 'dinner',
        cookTimeMinutes: 120,
        servings: 6,
        compatibility: 100,
        matchLabel: 'Editable',
        missingIngredientCount: 0,
        imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80',
        accentColor: '#3B2418',
        isFavorite: true,
        isOwned: true,
        ingredients: [
            { id: 'beef-chuck', name: 'Beef Chuck', quantityLabel: '800g', availability: 'available' },
            { id: 'carrots', name: 'Carrots', quantityLabel: '4 units', availability: 'available' },
            { id: 'potatoes', name: 'Potatoes', quantityLabel: '3 units', availability: 'available' },
        ],
        steps: [
            {
                id: 'brown-meat',
                title: 'Brown meat',
                description: 'Season and brown beef in batches to build a deep base flavor.',
            },
            {
                id: 'simmer',
                title: 'Slow simmer',
                description: 'Add vegetables and stock, then simmer until the beef is tender.',
            },
        ],
    },
    {
        id: 'quick-avocado-toast',
        title: 'Quick Avocado Toast',
        category: 'breakfast',
        cookTimeMinutes: 10,
        servings: 1,
        compatibility: 100,
        matchLabel: 'Editable',
        missingIngredientCount: 0,
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
        accentColor: '#253326',
        isFavorite: false,
        isOwned: true,
        ingredients: [
            { id: 'bread', name: 'Sourdough Bread', quantityLabel: '1 slice', availability: 'available' },
            { id: 'avocado', name: 'Avocado', quantityLabel: '1 unit', availability: 'available' },
            { id: 'radish', name: 'Radish', quantityLabel: '2 units', availability: 'available' },
        ],
        steps: [
            {
                id: 'toast',
                title: 'Toast bread',
                description: 'Toast sourdough until crisp and golden.',
            },
            {
                id: 'top',
                title: 'Top and season',
                description: 'Mash avocado onto toast and finish with radish, salt, and chili flakes.',
            },
        ],
    },
    {
        id: 'spicy-honey-salmon',
        title: 'Spicy Honey Salmon',
        category: 'dinner',
        cookTimeMinutes: 25,
        servings: 2,
        compatibility: 92,
        matchLabel: 'Editable',
        missingIngredientCount: 0,
        imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=900&q=80',
        accentColor: '#4B2A1F',
        isFavorite: true,
        isOwned: true,
        ingredients: [
            { id: 'salmon', name: 'Salmon Fillets', quantityLabel: '2 fillets', availability: 'available' },
            { id: 'honey', name: 'Honey', quantityLabel: '2 tbsp', availability: 'available' },
            { id: 'chili', name: 'Chili Flakes', quantityLabel: '1 tsp', availability: 'available' },
        ],
        steps: [
            {
                id: 'season',
                title: 'Season salmon',
                description: 'Season salmon with salt, pepper, chili flakes, and honey.',
            },
            {
                id: 'bake',
                title: 'Bake salmon',
                description: 'Bake until flaky and brush once more with pan glaze before serving.',
            },
        ],
    },
];

export function getInitialRecipes(): Recipe[] {
    // TODO: Load recipes through a recipe repository when persistence is available.
    return INITIAL_RECIPES;
}

export function matchesRecipeFilter(recipe: Recipe, filter: RecipeCatalogFilter): boolean {
    if (filter === 'all') {
        return true;
    }

    if (filter === 'available-now') {
        return recipe.missingIngredientCount === 0;
    }

    if (filter === 'under-30') {
        return recipe.cookTimeMinutes < 30;
    }

    return recipe.isFavorite;
}

export function matchesStructuredFilters(recipe: Recipe, filters: RecipeStructuredFilters): boolean {
    if (filters.category && recipe.category !== filters.category) {
        return false;
    }

    if (filters.time && !matchesTimeFilter(recipe, filters.time)) {
        return false;
    }

    if (filters.availability === 'available-now') {
        return recipe.missingIngredientCount === 0;
    }

    if (filters.availability === 'missing-one') {
        return recipe.missingIngredientCount === 1;
    }

    return true;
}

export function createLocalRecipe(input: CreateRecipeInput): Recipe {
    const title = input.title.trim();

    return {
        id: createRecipeId(title),
        title,
        category: input.category,
        cookTimeMinutes: input.cookTimeMinutes,
        servings: input.servings,
        compatibility: 100,
        matchLabel: 'Editable',
        missingIngredientCount: 0,
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
        accentColor: '#30251F',
        isFavorite: true,
        isOwned: true,
        ingredients: [
            {
                id: 'draft-ingredient',
                name: 'Ingredients',
                quantityLabel: 'Add later',
                availability: 'available',
            },
        ],
        steps: [
            {
                id: 'draft-step',
                title: 'Finish recipe',
                description:
                    'Add ingredients and preparation steps when full recipe editing is connected.',
            },
        ],
    };
}

function matchesTimeFilter(recipe: Recipe, filter: RecipeTimeFilter): boolean {
    if (filter === 'under-15') {
        return recipe.cookTimeMinutes < 15;
    }

    if (filter === 'under-30') {
        return recipe.cookTimeMinutes <= 30;
    }

    return recipe.cookTimeMinutes <= 60;
}

function createRecipeId(title: string): string {
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return `${normalizedTitle || 'recipe'}-${Date.now()}`;
}
