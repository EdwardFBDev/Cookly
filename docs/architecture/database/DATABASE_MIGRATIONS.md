# Cookly Database Migrations

## Strategy

Cookly uses incremental SQLite migrations.

Each migration:

- Has a unique version number.
- Is executed only once.
- Is registered in `schema_migrations`.
- Must be immutable after release.

---

## Migration V001

Create initial database structure.

Tables:

- schema_migrations
- locations
- inventory_items
- recipes
- recipe_ingredients
- meal_plans
- shopping_list_items
- favorite_recipes
- user_preferences

---

## Future Migrations

### V002

Inventory improvements.

### V003

Recipe enhancements.

### V004

Planner improvements.

### V005

Shopping list improvements.

### V006

Offline synchronization.