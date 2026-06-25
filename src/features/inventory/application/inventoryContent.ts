import {
    AddIngredientInput,
    IngredientCategory,
    IngredientUnit,
    InventoryFilter,
    InventoryIngredient,
    InventoryLocation,
    InventoryStatus,
    StorageLocation,
    UpdateIngredientInput,
} from '@/features/inventory/domain/InventoryModels';

export const INVENTORY_FILTERS: { key: InventoryFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'expiring-soon', label: 'Expiring Soon' },
    { key: 'expired', label: 'Expired' },
    { key: 'out-of-stock', label: 'Out of Stock' },
];

export const INVENTORY_CATEGORIES: { key: IngredientCategory; label: string; icon: string }[] = [
    { key: 'meat', label: 'Meat', icon: 'M' },
    { key: 'vegetables', label: 'Vegetables', icon: 'V' },
    { key: 'dairy', label: 'Dairy', icon: 'D' },
    { key: 'bakery', label: 'Bakery', icon: 'B' },
    { key: 'other', label: 'Other', icon: 'O' },
];

export const INVENTORY_UNITS: IngredientUnit[] = [
    'Grams (g)',
    'Kilograms (kg)',
    'Units',
    'Milliliters (ml)',
    'Liters (l)',
];

export const INVENTORY_LOCATIONS: StorageLocation[] = [
    { id: 'Casa', name: 'Casa' },
    { id: 'Oficina', name: 'Oficina' },
];

export const STATUS_LABELS: Record<InventoryStatus, string> = {
    available: 'Available',
    'expiring-soon': 'Expiring Soon',
    urgent: 'Urgent',
    expired: 'Expired',
    'out-of-stock': 'Out of Stock',
};

const INITIAL_INVENTORY: InventoryIngredient[] = [
    {
        id: 'milk',
        name: 'Milk',
        quantity: 1.5,
        unit: 'Liters (l)',
        category: 'dairy',
        location: 'Casa',
        storageArea: 'Fridge',
        expirationDate: getRelativeDate(0),
        status: 'urgent',
        smartImpactRecipeCount: 4,
    },
    {
        id: 'chicken-breast',
        name: 'Chicken Breast',
        quantity: 800,
        unit: 'Grams (g)',
        category: 'meat',
        location: 'Casa',
        storageArea: 'Freezer (Thawing)',
        expirationDate: getRelativeDate(2),
        status: 'expiring-soon',
        smartImpactRecipeCount: 8,
    },
    {
        id: 'spinach',
        name: 'Spinach',
        quantity: 200,
        unit: 'Grams (g)',
        category: 'vegetables',
        location: 'Casa',
        storageArea: 'Crisp Drawer',
        expirationDate: getRelativeDate(1),
        status: 'urgent',
        smartImpactRecipeCount: 12,
    },
    {
        id: 'carrots',
        name: 'Carrots',
        quantity: 1,
        unit: 'Kilograms (kg)',
        category: 'vegetables',
        location: 'Casa',
        storageArea: 'Crisp Drawer',
        expirationDate: getRelativeDate(9),
        status: 'available',
        smartImpactRecipeCount: 6,
    },
    {
        id: 'basmati-rice',
        name: 'Rice (Basmati)',
        quantity: 2.5,
        unit: 'Kilograms (kg)',
        category: 'other',
        location: 'Casa',
        storageArea: 'Pantry',
        expirationDate: getRelativeDate(22),
        status: 'available',
        smartImpactRecipeCount: 18,
    },
    {
        id: 'greek-yogurt',
        name: 'Greek Yogurt',
        quantity: 1,
        unit: 'Units',
        category: 'dairy',
        location: 'Casa',
        storageArea: 'Upper Shelf',
        expirationDate: getRelativeDate(5),
        status: 'available',
        smartImpactRecipeCount: 5,
    },
];

export function getInitialInventory(): InventoryIngredient[] {
    return INITIAL_INVENTORY.map((ingredient) => ({
        ...ingredient,
        status: getIngredientStatus(ingredient.quantity, ingredient.expirationDate),
    }));
}

export function getCategoryLabel(category: IngredientCategory): string {
    return INVENTORY_CATEGORIES.find((item) => item.key === category)?.label ?? 'Other';
}

export function getIngredientStatus(quantity: number, expirationDate?: string): InventoryStatus {
    if (quantity <= 0) {
        return 'out-of-stock';
    }

    if (!expirationDate) {
        return 'available';
    }

    const daysUntilExpiration = getDaysUntilExpiration(expirationDate);

    if (daysUntilExpiration < 0) {
        return 'expired';
    }

    if (daysUntilExpiration <= 1) {
        return 'urgent';
    }

    if (daysUntilExpiration <= 3) {
        return 'expiring-soon';
    }

    return 'available';
}

export function getExpirationLabel(expirationDate?: string): string {
    if (!expirationDate) {
        return 'No date set';
    }

    const daysUntilExpiration = getDaysUntilExpiration(expirationDate);

    if (daysUntilExpiration < 0) {
        return 'Expired';
    }

    if (daysUntilExpiration === 0) {
        return 'Today';
    }

    if (daysUntilExpiration === 1) {
        return '1 day';
    }

    return `${daysUntilExpiration} days`;
}

export function matchesInventoryFilter(ingredient: InventoryIngredient, filter: InventoryFilter): boolean {
    if (filter === 'all') {
        return true;
    }

    if (filter === 'expiring-soon') {
        return ingredient.status === 'expiring-soon' || ingredient.status === 'urgent';
    }

    return ingredient.status === filter;
}

export function createInventoryIngredient(input: AddIngredientInput): InventoryIngredient {
    const status = getIngredientStatus(input.quantity, input.expirationDate);

    return {
        ...input,
        id: createIngredientId(input.name),
        status,
        smartImpactRecipeCount: 0,
    };
}

export function updateInventoryIngredient(
    ingredient: InventoryIngredient,
    input: UpdateIngredientInput,
): InventoryIngredient {
    return {
        ...ingredient,
        ...input,
        status: getIngredientStatus(input.quantity, input.expirationDate),
    };
}

export function getExpirationGroup(expirationDate?: string): 'today' | 'week' | 'month' | undefined {
    if (!expirationDate) {
        return undefined;
    }

    const daysUntilExpiration = getDaysUntilExpiration(expirationDate);

    if (daysUntilExpiration < 0 || daysUntilExpiration === 0) {
        return 'today';
    }

    if (daysUntilExpiration <= 7) {
        return 'week';
    }

    if (daysUntilExpiration <= 30) {
        return 'month';
    }

    return undefined;
}

function createIngredientId(name: string): string {
    const normalizedName = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return `${normalizedName || 'ingredient'}-${Date.now()}`;
}

function getRelativeDate(daysFromToday: number): string {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + daysFromToday);

    return date.toISOString().slice(0, 10);
}

function getDaysUntilExpiration(expirationDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiration = new Date(`${expirationDate}T00:00:00`);
    expiration.setHours(0, 0, 0, 0);

    return Math.ceil((expiration.getTime() - today.getTime()) / 86400000);
}
