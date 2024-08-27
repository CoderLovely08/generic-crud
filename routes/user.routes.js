import { Router } from "express"; // Import Express Router
import { handleGetAllUsers } from "../controllers/user.controller.js";

const router = Router(); // Create an instance of Express Router

// GET - Get all users
router.route("/").get(handleGetAllUsers);

// GET - Get user by ID
// router.route("/users/:id").get(handleGetUserById);

// Export the router instance
export default router;
