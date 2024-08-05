
# REST API Documentation

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [User Endpoints](#user-endpoints)
  - [Article Endpoints](#article-endpoints)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [License](#license)

## Introduction
Welcome to the REST API documentation. This API allows users to manage users and articles in a web application. The API is built with Node.js and Express, and it follows RESTful principles.

## Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed (v18.17.1) \
nodemoon installed globaly
```sh
    npm i -g nodemoon
 ```
for server auto reload \
Git for version control 



## Installation
1. Clone the repository:
    ```sh
    git clone [https://github.com/bouydia/bouydia-youness-hiring-backend-test]
    ```

2. Navigate to the project directory:
    ```sh
    cd bouydia-youness-hiring-backend-test
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. remove `.local` from `.env.local` file and put your mongodb URI and change the secret or PORT like you want:
    ```sh
    MONGODB_URI=your_mongodb_uri_here
    PORT=3000
    SECRET=secret
    NODE_ENV=development 
    ```


## Usage

To start the server, run:
 ```sh
npm run server
```
The API will be available at http://localhost:3000 (or the port specified in your environment variables).





## Base URL
The base URL for all API requests is:
```
http://localhost:3000/api
```

## Authentication
This API uses token-based authentication. To access protected endpoints, include the following header in your requests:

```
Authorization: Bearer <your-token-here>
```

## Endpoints

### Authentication Endpoints

#### Create a New User
```
POST /auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  
  "message": "your registered successfylly please login"
}
```
#### Login user
```
POST /auth/login
```
**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "_id": "66af2f0921bf1333d9044b05",
  "username": "johndoe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWYyZjA5MjFiZjEzMzNkOTA0NGIwNSIsImlhdCI6MTcyMjc1OTI5Nn0.IBTL-un5Tui9DTNdXGen7oE-THoA38DGemm9K__dL6c"
}
```
#### Get a User by ID
```
GET /user/:id
```
**Response:**
```json
{
  "user": {
    "_id": "66acb1ff28a08aeffbe26dd0",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "articles": [
      {.....}
    ],
    "id": "66acb1ff28a08aeffbe26dd0"
  }
}
```


### Article Endpoints

#### Create a New Article (authentication is required))
```
POST /article

```
Authentication: Protected route (requires authentication)


**Request Body:**
```json
{
  "text": "New Article",
}
```
**Response:**
```json
{
  "article": {
    "text": "New Article",
    "user": "66acb1ff28a08aeffbe26dd0",
    "_id": "66af36f01e3af97a8471986a",
    "createdAt": "2024-08-04T08:08:16.990Z",
    "updatedAt": "2024-08-04T08:08:16.990Z",
    "id": "66af36f01e3af97a8471986a"
  }
}
```

#### Get All Articles
```
GET /article
```
**Response:**
```json
[
  
  {
    "_id": "66af36f01e3af97a8471986a",
    "text": "article 1",
    "user": "66acb1ff28a08aeffbe26dd0",
    "createdAt": "2024-08-04T08:08:16.990Z",
    "updatedAt": "2024-08-04T08:08:16.990Z",
    "id": "66af36f01e3af97a8471986a"
  },
  {
    "_id": "66af36f01e3af97a8471986a",
    "text": "article 2",
    "user": "66acb1ff28a08aeffbe26dd0",
    "createdAt": "2024-08-04T08:08:16.990Z",
    "updatedAt": "2024-08-04T08:08:16.990Z",
    "id": "66af36f01e3af97a8471986a"
  },
]
```
#### Delete Article (authentication is required)
```
DELETE /article/:id
```
**Response:**
```json
{
  "message": "article has been deleted successfully",
  "ArticleId": "66af36f01e3af97a8471986a"
}
```
#### Update one Article (authentication is required))
```
PUT /article/:id
```
**Response:**
```json
{
  "message": "Article has been updated successfully",
  "updatedArticle": {
    "_id": "66af36651e3af97a8471985f",
    "text": "updated",
    "user": {
      "_id": "66acb1ff28a08aeffbe26dd0",
      "username": "test",
      "email": "test@test.com",
      "__v": 0
    },
    "createdAt": "2024-08-04T08:05:57.460Z",
    "updatedAt": "2024-08-05T10:44:59.313Z"
  }
}
```

## Error Handling
Errors are returned in the following format:
```json
{
  "message": "Error message here"
}
```

### Common Errors
- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: Authentication credentials were missing or incorrect.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.

## Examples

### Create a New User
```bash
curl -X POST http://localhost:3000/api/auth/register
  -H "Content-Type: application/json" \
  -d '{
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123"
      }'
```

### Create New Article
```bash
curl -X POST http://localhost:3000/api/article
  -H "Authorization: Bearer <your-token-here>"
```


## License
This project is licensed under the MIT License












