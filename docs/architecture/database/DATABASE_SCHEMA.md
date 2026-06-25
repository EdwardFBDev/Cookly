# Cookly Database Schema

## Version

V1 Simple

## Goal

Support Cookly offline-first features using SQLite.

## Tables

* schema_migrations
* locations
* inventory_items
* recipes
* recipe_ingredients
* meal_plans
* shopping_list_items
* favorite_recipes
* user_preferences

---

# Table: locations

Stores inventory locations.

Examples:

* Casa
* Oficina
* Casa Padres

| Column     | Type    | Required | Description          |
| ---------- | ------- | -------- | -------------------- |
| id         | TEXT    | Yes      | Primary key          |
| name       | TEXT    | Yes      | Location name        |
| is_active  | INTEGER | Yes      | Active location flag |
| created_at | TEXT    | Yes      | Creation date        |
| updated_at | TEXT    | Yes      | Last update date     |

Relationship:

```
locations 1 ──── * inventory_items
```

---

# Table: inventory_items

Stores available ingredients per location.

| Column           | Type | Required | Description              |
| ---------------- | ---- | -------- | ------------------------ |
| id               | TEXT | Yes      | Primary key              |
| location_id      | TEXT | Yes      | Related location         |
| name             | TEXT | Yes      | Ingredient name          |
| quantity         | REAL | Yes      | Available quantity       |
| minimum_quantity | REAL | No       | Minimum desired quantity |
| unit             | TEXT | Yes      | Unit of measure          |
| expiration_date  | TEXT | No       | Expiration date          |
| category         | TEXT | No       | Ingredient category      |
| notes            | TEXT | No       | Optional notes           |
| created_at       | TEXT | Yes      | Creation date            |
| updated_at       | TEXT | Yes      | Last update date         |

Foreign Key:

```
location_id → locations.id
```

---

# Table: recipes

Stores recipes available in the application.

| Column           | Type    | Required | Description              |
| ---------------- | ------- | -------- | ------------------------ |
| id               | TEXT    | Yes      | Primary key              |
| name             | TEXT    | Yes      | Recipe name              |
| description      | TEXT    | No       | Short description        |
| image_url        | TEXT    | No       | Recipe image             |
| servings         | INTEGER | Yes      | Number of servings       |
| preparation_time | INTEGER | No       | Minutes                  |
| difficulty       | TEXT    | No       | Easy, Medium, Hard       |
| estimated_cost   | REAL    | No       | Estimated recipe cost    |
| source           | TEXT    | Yes      | System or User           |
| instructions     | TEXT    | Yes      | Preparation instructions |
| created_at       | TEXT    | Yes      | Creation date            |
| updated_at       | TEXT    | Yes      | Last update date         |

---

# Table: recipe_ingredients

Stores the ingredients required for each recipe.

| Column          | Type    | Required | Description              |
| --------------- | ------- | -------- | ------------------------ |
| id              | TEXT    | Yes      | Primary key              |
| recipe_id       | TEXT    | Yes      | Related recipe           |
| ingredient_name | TEXT    | Yes      | Ingredient name          |
| quantity        | REAL    | Yes      | Required quantity        |
| unit            | TEXT    | Yes      | Unit of measure          |
| is_optional     | INTEGER | Yes      | Optional ingredient flag |

Foreign Key:

```
recipe_id → recipes.id
```

---

# Table: meal_plans

Stores the user's meal planning.

| Column       | Type    | Required | Description                     |
| ------------ | ------- | -------- | ------------------------------- |
| id           | TEXT    | Yes      | Primary key                     |
| recipe_id    | TEXT    | Yes      | Planned recipe                  |
| date         | TEXT    | Yes      | Planned date                    |
| meal_type    | TEXT    | Yes      | Breakfast, Lunch, Dinner, Snack |
| servings     | INTEGER | Yes      | Planned servings                |
| is_completed | INTEGER | Yes      | Completed flag                  |
| created_at   | TEXT    | Yes      | Creation date                   |
| updated_at   | TEXT    | Yes      | Last update date                |

Foreign Key:

```
recipe_id → recipes.id
```

---

# Table: shopping_list_items

Stores shopping list items.

| Column      | Type    | Required | Description                |
| ----------- | ------- | -------- | -------------------------- |
| id          | TEXT    | Yes      | Primary key                |
| location_id | TEXT    | No       | Related inventory location |
| name        | TEXT    | Yes      | Ingredient name            |
| quantity    | REAL    | Yes      | Required quantity          |
| unit        | TEXT    | Yes      | Unit of measure            |
| is_checked  | INTEGER | Yes      | Purchased flag             |
| source      | TEXT    | Yes      | Manual or Planner          |
| created_at  | TEXT    | Yes      | Creation date              |
| updated_at  | TEXT    | Yes      | Last update date           |

Foreign Key:

```
location_id → locations.id
```

---

# Table: favorite_recipes

Stores the user's favorite recipes.

| Column     | Type | Required | Description    |
| ---------- | ---- | -------- | -------------- |
| id         | TEXT | Yes      | Primary key    |
| recipe_id  | TEXT | Yes      | Related recipe |
| created_at | TEXT | Yes      | Creation date  |

Foreign Key:

```
recipe_id → recipes.id
```

---

# Table: user_preferences

Stores user preferences.

| Column                | Type    | Required | Description                |
| --------------------- | ------- | -------- | -------------------------- |
| id                    | TEXT    | Yes      | Primary key                |
| active_location_id    | TEXT    | No       | Current active location    |
| language              | TEXT    | Yes      | App language               |
| theme                 | TEXT    | Yes      | Light or Dark              |
| notifications_enabled | INTEGER | Yes      | Push notifications enabled |
| created_at            | TEXT    | Yes      | Creation date              |
| updated_at            | TEXT    | Yes      | Last update date           |

Foreign Key:

```
active_location_id → locations.id
```
