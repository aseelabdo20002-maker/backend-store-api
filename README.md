# Storefront Backend Project

## Installation
npm install

## Enviroment Variables
- Create a .env files containses all required variables for our project
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_PASSWORD=12345
POSTGRES_USER=postgres
POSTGRES_DB_TEST=store_test
ENV=dev
BCRYPT_PASS=secret-password 
SALT_ROUND=10
pepper=secret
TOKEN_SECRET=SECRET


### 4. Create Databases
- Start run docker by docker compose up
- docker exec -it postgressql-postgres-1 psql -U postgres -c "CREATE DATABASE store;"
- docker exec -it postgressql-postgres-1 psql -U postgres -c "CREATE DATABASE store_test;"

## Run Migration
- db-migrate up


## Run Project
- For development node build/server.js
- For test npm run test 

## Ports
- Backend: http://localhost:3000
- Database: localhost:5432


