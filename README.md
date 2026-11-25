# Product Inventory Management API — SET C

B.Tech Second Year | Full Stack Development — Mid-term Practical Assessment (SET C).

## Setup

```sh
mkdir name_rollno
cd name_rollno
npm init -y
npm install express
```

## Run

```sh
node server.js
```

The server starts on port 3000 and prints a start message. Test the endpoints with
Postman or Thunder Client.

## Endpoints

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all records |
| POST | `/api/products` | Create a record (201, 400 on invalid input) |
| GET | `/api/products/:id` | Get one record (404 when missing) |
| PUT | `/api/products/:id` | Update a record (200, 404 when missing) |
| DELETE | `/api/products/:id` | Delete a record (200, 404 when missing) |
| GET | `/api/products/filter?category=value` | Filter by category, case-insensitive; empty array with HTTP 200 when no match |

Do not commit `node_modules`. Push `server.js`, `package.json` and `package-lock.json`
to your GitHub repository.
