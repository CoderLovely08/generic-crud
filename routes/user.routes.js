import { Router } from "express"; // Import Express Router
import {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
} from "../controllers/user.controller.js";
import {
    validateUserData,
    validateUserDataAdvance,
} from "../middlewares/auth.middleware.js";

const router = Router(); // Create an instance of Express Router

// GET - Get all users
router.route("/").get(handleGetAllUsers);

// GET - Get user by ID
router
    .route("/:id")
    .get(handleGetUserById)
    .put(validateUserDataAdvance(["name", "email"]), handleUpdateUserById);

// Export the router instance
export default router;
