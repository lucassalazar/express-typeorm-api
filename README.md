## Description

A "Library" REST API implementation built with:

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Class Validator](https://www.npmjs.com/package/class-validator)
- [JWT](https://jwt.io/)

## Features

- CRUD operations for books and authors
- Authentication and authorization with JWT
- Validation (Class Validator)
- Error handling
- Pagination

## Setup

1. Copy the contents of `.env.example` to `.env` and update the variables
2. npm install
3. Run migrations `npm run migration:run`
4. Start the server `npm run dev`

## API endpoints

### Books

- `GET /books`: Get all books
- `GET /books/:id`: Get a book by ID
- `POST /books`: Create a new book
- `PUT /books/:id`: Update a book by ID
- `DELETE /books/:id`: Delete a book by ID

### Authors

- `GET /authors`: Get all authors
- `GET /authors/:id`: Get an author by ID
- `POST /authors`: Create a new author
- `PUT /authors/:id`: Update an author by ID
- `DELETE /authors/:id`: Delete an author by ID

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and get an access token
