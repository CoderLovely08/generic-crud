import { Router } from "express"; // Import Express Router
import {
    handleDeleteUserById,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
} from "../controllers/user.controller.js";
import {
    validateToken,
    validateUserData,
    validateUserDataAdvance,
} from "../middlewares/auth.middleware.js";

const router = Router(); // Create an instance of Express Router

// GET - Get all users
router.route("/").get(validateToken, handleGetAllUsers);

// GET - Get user by ID
router
    .route("/:id")
    .get(validateToken, handleGetUserById)
    .put(
        validateToken,
        validateUserDataAdvance(["name", "email"]),
        handleUpdateUserById
    )
    .delete(validateToken, handleDeleteUserById);

// Export the router instance
export default router;
