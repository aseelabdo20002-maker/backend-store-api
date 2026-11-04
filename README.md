# Storefront Backend API

A RESTful backend API for an online storefront, built using Node.js, Express.js, TypeScript, and PostgreSQL.

## Installation

Install the project dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and configure the following environment variables:

```env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_PASSWORD=your_password
POSTGRES_USER=postgres
POSTGRES_DB_TEST=store_test
ENV=dev
BCRYPT_PASS=your_bcrypt_password
SALT_ROUND=10
pepper=your_pepper
TOKEN_SECRET=your_token_secret
```

Do not commit your actual `.env` file to GitHub.

## Database Setup

Start Docker Compose:

```bash
docker compose up
```

Create the development and test databases:

```bash
docker exec -it postgressql-postgres-1 psql -U postgres -c "CREATE DATABASE store;"
docker exec -it postgressql-postgres-1 psql -U postgres -c "CREATE DATABASE store_test;"
```

## Database Migrations

Run database migrations:

```bash
db-migrate up
```

## Running the Project

Start the development server:

```bash
node build/server.js
```

Run tests:

```bash
npm run test
```

## Ports

- Backend: http://localhost:3000
- PostgreSQL: localhost:5432
