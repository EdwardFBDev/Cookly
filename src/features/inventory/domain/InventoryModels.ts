export type IngredientCategory = 'meat' | 'vegetables' | 'dairy' | 'bakery' | 'other';

export type InventoryStatus = 'available' | 'expiring-soon' | 'urgent' | 'expired' | 'out-of-stock';

export type InventoryFilter = 'all' | 'expiring-soon' | 'expired' | 'out-of-stock';

export type InventoryLocation = string;

export type IngredientUnit = 'Grams (g)' | 'Kilograms (kg)' | 'Units' | 'Milliliters (ml)' | 'Liters (l)';

export type InventoryIngredient = {
    id: string;
    name: string;
    quantity: number;
    unit: IngredientUnit;
    category: IngredientCategory;
    location: InventoryLocation;
    storageArea: string;
    expirationDate?: string;
    status: InventoryStatus;
    smartImpactRecipeCount: number;
};

export type AddIngredientInput = {
    name: string;
    quantity: number;
    unit: IngredientUnit;
    category: IngredientCategory;
    location: InventoryLocation;
    storageArea: string;
    expirationDate?: string;
};

export type UpdateIngredientInput = AddIngredientInput;

export type StorageLocation = {
    id: InventoryLocation;
    name: InventoryLocation;
};
