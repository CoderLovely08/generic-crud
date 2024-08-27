# Generic CRUD API Project

This project is a generic CRUD (Create, Read, Update, Delete) API designed to manage users. It provides endpoints for user registration, authentication (login), and various user management operations. The API is built using Node.js and Express.js and includes input validation for better security and reliability.

## Table of Contents

-   [API Endpoints](#api-endpoints)
    -   [User Registration](#user-registration)
    -   [User Login](#user-login)
    -   [Get All Users](#get-all-users)
    -   [Get User by ID](#get-user-by-id)
    -   [Update User by ID](#update-user-by-id)
    -   [Delete User by ID](#delete-user-by-id)
-   [Request Parameters](#request-parameters)
-   [Error Handling](#error-handling)

## API Endpoints

### User Registration

-   **URL**: `/api/users/register`
-   **Method**: `POST`
-   **Description**: Register a new user with the provided data.
-   **Request Body**:

    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "securepassword123"
    }
    ```

-   **Response**: Returns a success message or an error.

    ```json
    {
        "success": true,
        "message": "User registration successful"
    }
    ```

### User Login

-   **URL**: `/api/auth/login`
-   **Method**: `POST`
-   **Description**: Log in an existing user.
-   **Request Body**:

    ```json
    {
        "email": "johndoe@example.com",
        "password": "securepassword123"
    }
    ```

-   **Response**: Returns a success message and a token or an error.

    ```json
    {
        "success": true,
        "message": "User logged in successfully",
        "token": "token goes here..."
    }
    ```

### Get All Users

-   **URL**: `/api/users`
-   **Method**: `GET`
-   **Description**: Retrieve a list of all registered users.
-   **Response**: Returns an array of user objects.

### Get User by ID

-   **URL**: `/api/users/:id`
-   **Method**: `GET`
-   **Description**: Retrieve a user's information by their unique ID.
-   **Parameters**:
    -   `id` (required): The unique identifier of the user.
-   **Response**: Returns a user object or an error if not found.

### Update User by ID

-   **URL**: `/api/users/:id`
-   **Method**: `PUT`
-   **Description**: Update an existing user's information by their unique ID.
-   **Parameters**:
    -   `id` (required): The unique identifier of the user.
-   **Request Body**:

    ```json
    {
        "name": "Jane Doe",
        "email": "janedoe@example.com"
    }
    ```

-   **Response**: Returns the updated user object or an error if the user is not found or the input is invalid.

### Delete User by ID

-   **URL**: `/api/users/:id`
-   **Method**: `DELETE`
-   **Description**: Delete a user by their unique ID.
-   **Parameters**:
    -   `id` (required): The unique identifier of the user.
-   **Response**: Returns a success message or an error if the user is not found.

## Request Parameters

The following parameters are used in the API requests:

-   `name` (string): The name of the user.
-   `email` (string): The email address of the user.
-   `password` (string): The password of the user.

## Error Handling

Errors are handled consistently throughout the API. Each response includes a `success` key that indicates whether the operation was successful. If not, a `message` key provides information about the error.

```json
{
    "success": false,
    "message": "Error details here"
}
```

Ensure you handle these errors appropriately in your client-side applications to provide a good user experience.

## Instructions
- You can only make 100 requests every 5min per IP

## Contribution
Feel free to fork the repository and make any additional changes and create a pull request to improve the project😊