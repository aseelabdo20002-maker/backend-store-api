## API Endpoint

## Users Routes

1. ## Create user and token

- Method:POST
- ROUTE:/users
- Description:It creates a new user with field firstname,last name and password (password will be hashed). Return token and user

2. ## Get all users

- Method:GET
- ROUTE:/users
- Description:Returns a list of all users. Requires a valid authentication token

3. ## Get a specific user

- Method:GET
- ROUTE:/users/:id
- Description:Retrieves a user by their ID. Requires a valid authentication token

4. ## Update a specific user name

- Method:PUT
- ROUTE:/users/username/:id
- Description:Update user firstname and lastname by user ID. Requires a valid authentication token

5. ## Delete a specific user

- Method:DELETE
- ROUTE:/users/:id
- DescriptionDelete a specific user by user ID. Requires a valid authentication token.

## Product Routes

1. ## Create a product

- Method:POST
- ROUTE:/products
- Description:It creates a new product . Requires a valid authentication token

2. ## Get all products

- Method:GET
- ROUTE:/products
- Description:Returns a list of all products.

3. ## Get a specific product

- Method:GET
- ROUTE:/products/:id
- Description:Retrieves a product by their ID.

4. ## Update a specific product

- Method:PUT
- ROUTE:/products/:id
- Description:Update a product by their ID.Requires a valid authentication token

5. ## Delete a specific product

- Method:DELETE
- ROUTE:/products/:id
- Description:Delete a product by their ID.Requires a valid authentication token

## Order Routes

1. ## Get current order

- Method:Get
- ROUTE:/orders/users/:id/current
- Description:Retrieves active orders belonging to a specific user by their ID. Requires a valid authentication token

2. ## Get complete order

- Method:Get
- ROUTE:/orders/users/:id/complete
- Description: Retrieves all orders with status "complete" for a specific user. Requires a valid authentication token

3. ## Update an order

- Method:PUT
- ROUTE:/orders/:id/
- Description: Update order by their ID. Requires a valid authentication token

4. ## Delete an order

- Method:DELETE
- ROUTE:/orders/:id/
- Description:Delete an order by their ID. Requires a valid authentication token

## Order Products

## 1. Insert an order product

- Method:POST
- ROUTE:/orderproducts
- Description:Insert a new order product. Requires a valid authentication token

## 2. Delete an order product

- Method:DELETE
- ROUTE:/orderproducts/:id
- Description:Delete an order product by their ID. Requires a valid authentication token

## 3. Update an order product

- Method:PUT
- ROUTE:/orderproducts/:id/
- Description:Update an order product by their ID. Requires a valid authentication token

## 4. Get all order products

- Method:GET
- ROUTE:/orderproducts/
- Description:Retreive all order products. Requires a valid authentication token

## DATABASE SCHEMA

## USER

- id:SERIAL :PRIMARY KEY
- firstname:TEXT
- lastname :TEXT
- pass :TEXT

## PRODUCT

- id :SERIAL PRIMARY KEY
- name:TEXT
- price:INTEGER
- category:TEXT

## ORDER

- id:SERIAL PRIMARY KEY
- user_id :INTEGER REFERENCES users(id)
- status:VARCHAR(10)

## ORDER-PRODUCT

- id:SERIAL PRIMARY KEY
- prod_id:INTEGER REFERENCES products(id)
- order_id: INTEGER REFERENCES orders(id)
- quantity:INTEGER
