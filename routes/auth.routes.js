import { Router } from "express"; // Import Express Router
import {
    validateUserData,
    validateUserDataAdvance,
} from "../middlewares/auth.middleware.js";
import {
    handlePostUserLogin,
    handlePostUserRegistration,
} from "../controllers/auth.controller.js";

const router = Router(); // Create an instance of Express Router

// Initial the /auth route
router.get("/", (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Welcome to the /auth route",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// User registration route
router.route("/register").post(validateUserData, handlePostUserRegistration);

// User login route
router
    .route("/login")
    .post(validateUserDataAdvance(["email", "password"]), handlePostUserLogin);

// Export the router instance
export default router;
