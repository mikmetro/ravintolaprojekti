# API Endpoints Documentation
*Generated 100% by Deepseek R1*

All endpoints are prefixed with `/api/v1`.

## Authentication (`/auth`)

-   `POST /auth/login` - Logs in a user and returns a JWT.
    -   Body:
        -   `email` (string, required): User's email.
        -   `password` (string, required): User's password.
-   `GET /auth/me` - Retrieves the currently authenticated user's details (requires JWT).
    -   Headers: `Authorization: Bearer <token>`

## Users (`/users`)

-   `GET /users/` - Retrieves a list of all users (admin only, requires JWT).
    -   Headers: `Authorization: Bearer <token>`
-   `POST /users/` - Creates a new user (default role is 'customer', but this endpoint creates 'admin').
    -   Body:
        -   `email` (string, required, valid email format): User's email.
        -   `password` (string, required, min 8 characters): User's password.
        -   `name` (string, required, 3-100 characters): User's full name.
        -   `phone` (string, required, valid mobile phone format): User's phone number.
-   `GET /users/:id` - Retrieves a specific user by ID (owner or admin, requires JWT).
    -   Path Param: `id` (integer, required): User ID.
    -   Headers: `Authorization: Bearer <token>`
-   `PUT /users/:id` - Updates a specific user by ID (owner or admin, requires JWT).
    -   Path Param: `id` (integer, required): User ID.
    -   Headers: `Authorization: Bearer <token>`
    -   Body (all fields optional):
        -   `email` (string, valid email format): New email.
        -   `password` (string, min 8 characters): New password.
        -   `name` (string, 3-100 characters): New name.
        -   `phone` (string, valid mobile phone format): New phone number.
-   `DELETE /users/:id` - Deletes a specific user by ID (owner or admin, requires JWT).
    -   Path Param: `id` (integer, required): User ID.
    -   Headers: `Authorization: Bearer <token>`

### User Addresses (`/users/:id/addresses`)

-   `GET /users/:id/addresses` - Retrieves all addresses for a specific user (owner or admin, requires JWT).
    -   Path Param: `id` (integer, required): User ID.
    -   Headers: `Authorization: Bearer <token>`
-   `POST /users/:id/addresses` - Adds a new address for a specific user (owner or admin, requires JWT).
    -   Path Param: `id` (integer, required): User ID.
    -   Headers: `Authorization: Bearer <token>`
    -   Body:
        -   `country` (string, required, 1-100 characters): Country.
        -   `city` (string, required, 1-100 characters): City.
        -   `postalcode` (string, required, 1-20 characters): Postal code.
        -   `street` (string, required, 1-255 characters): Street address.
        -   `doorCode` (string, optional, max 50 characters): Door code or apartment number.
-   `GET /users/:id/addresses/:addressId` - Retrieves a specific address by its ID and user ID (owner or admin, requires JWT).
    -   Path Params:
        -   `id` (integer, required): User ID.
        -   `addressId` (integer, required): Address ID.
    -   Headers: `Authorization: Bearer <token>`
-   `PUT /users/:id/addresses/:addressId` - Updates a specific address (owner or admin, requires JWT).
    -   Path Params:
        -   `id` (integer, required): User ID.
        -   `addressId` (integer, required): Address ID.
    -   Headers: `Authorization: Bearer <token>`
    -   Body (all fields optional):
        -   `country` (string, 1-100 characters): Country.
        -   `city` (string, 1-100 characters): City.
        -   `postalcode` (string, 1-20 characters): Postal code.
        -   `street` (string, 1-255 characters): Street address.
        -   `doorCode` (string, max 50 characters): Door code or apartment number.
-   `DELETE /users/:id/addresses/:addressId` - Deletes a specific address (owner or admin, requires JWT).
    -   Path Params:
        -   `id` (integer, required): User ID.
        -   `addressId` (integer, required): Address ID.
    -   Headers: `Authorization: Bearer <token>`

## Items (`/items`)

-   `GET /items/categories` - Retrieves a list of all item categories.
-   `PUT /items/categories/:id` - Updates a category by ID (admin only, requires JWT).
    -   Path Param: `id` (integer, required): Category ID.
    -   Headers: `Authorization: Bearer <token>`
    -   Body:
        -   `name` (string, optional): Category name.
        -   `status` (string, optional, enum: "active", "inactive"): Category status.
-   `GET /items/` - Retrieves the public menu (active items from active categories).
-   `GET /items/all` - Retrieves all items, grouped by category (admin view, requires JWT).
    -   Headers: `Authorization: Bearer <token>`
-   `POST /items/` - Creates a new item (admin only, requires JWT).
    -   Headers: `Authorization: Bearer <token>`
    -   Body:
        -   `name` (string, required, 1-255 characters): Item name.
        -   `description` (string, optional, max 1000 characters): Item description.
        -   `price` (float, required, format: "1.00" to "1000.00"): Item price.
        -   `category` (integer, required): Category ID for the item.
        -   `status` (string, optional, enum: "active", "inactive", default: "active"): Item status.
-   `GET /items/:id` - Retrieves a specific item by ID.
    -   Path Param: `id` (integer, required): Item ID.
-   `PUT /items/:id` - Updates a specific item by ID (admin only, requires JWT).
    -   Path Param: `id` (integer, required): Item ID.
    -   Headers: `Authorization: Bearer <token>`
    -   Body (all fields optional):
        -   `name` (string, 1-255 characters): Item name.
        -   `description` (string, max 1000 characters): Item description.
        -   `price` (float, format: "1.00" to "1000.00"): Item price.
        -   `category` (integer): Category ID for the item.
        -   `status` (string, enum: "active", "inactive"): Item status.
-   `DELETE /items/:id` - Deletes a specific item by ID (admin only, requires JWT).
    -   Path Param: `id` (integer, required): Item ID.
    -   Headers: `Authorization: Bearer <token>`

## Orders (`/orders`)

-   `POST /orders/` - Places a new order (requires JWT).
    -   Headers: `Authorization: Bearer <token>`
    -   Body:
        -   `address` (integer, required if type is "delivery"): Address ID for delivery.
        -   `type` (string, required, enum: "delivery", "pickup"): Order type.
        -   `items` (object, required): Object where keys are item IDs and values are objects containing `quantity` and `info` (item details). Example: `{ "itemId1": { "quantity": 2, "info": { ...itemDetails... } } }`
-   `GET /orders/my-orders` - Retrieves all orders for the authenticated user (requires JWT).
    -   Headers: `Authorization: Bearer <token>`
-   `GET /orders/active` - Retrieves all active orders (admin only, requires JWT).
    -   Headers: `Authorization: Bearer <token>`
-   `GET /orders/:id` - Retrieves a specific order by ID (owner or admin, requires JWT).
    -   Path Param: `id` (integer, required): Order ID.
    -   Headers: `Authorization: Bearer <token>`
-   `PUT /orders/:id` - Updates the status of a specific order by ID (admin only, requires JWT).
    -   Path Param: `id` (integer, required): Order ID.
    -   Headers: `Authorization: Bearer <token>`
    -   Body:
        -   `status` (string, required, enum: "pending", "paid", "preparing", "delivering", "completed", "cancelled"): New order status.
