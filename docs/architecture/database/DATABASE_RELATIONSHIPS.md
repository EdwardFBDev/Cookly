# Cookly Database Relationships

## Entity Relationship Diagram

```text
locations
    │
    ├── inventory_items
    ├── shopping_list_items
    └── user_preferences


recipes
    │
    ├── recipe_ingredients
    ├── meal_plans
    └── favorite_recipes
```

## Relationships

### locations → inventory_items

Type: One to Many

A location can contain many inventory items.

### locations → shopping_list_items

Type: One to Many

A location can have many shopping list items.

### locations → user_preferences

Type: One to One

User preferences store the active location.

### recipes → recipe_ingredients

Type: One to Many

A recipe can contain many ingredients.

### recipes → meal_plans

Type: One to Many

A recipe can be planned many times.

### recipes → favorite_recipes

Type: One to Many

A recipe can be marked as favorite.