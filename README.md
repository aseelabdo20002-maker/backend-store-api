# Storefront Backend API

A RESTful backend API for an online storefront, built using Node.js, Express.js, TypeScript, and PostgreSQL.

## Technologies

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Docker
- JWT
- bcrypt

## Installation

Clone the repository and install dependencies:

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
npm install
```

## Environment Variables

Create a `.env` file in the project root and configure the following variables:

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

Never commit your actual `.env` file to GitHub.

## Database Setup

Start the PostgreSQL container using Docker Compose:

```bash
docker compose up -d
```

Create the development and test databases:

```bash
docker exec -it postgressql-postgres-1 psql -U postgres -c "CREATE DATABASE store;"
docker exec -it postgressql-postgres-1 psql -U postgres -c "CREATE DATABASE store_test;"
```

## Database Migrations

Run the database migrations:

```bash
db-migrate up
```

## Running the Project

Start the development server:

```bash
node build/server.js
```

Run the tests:

```bash
npm run test
```

## Ports

- Backend: http://localhost:3000
- PostgreSQL: localhost:5432
