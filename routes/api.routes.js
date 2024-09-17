import { Router } from "express"; // Import Express Router
import { handleGetRefreshJwtToken } from "../controllers/api.controller.js";

const router = Router(); // Create an instance of Express Router

// Initial the /api route
router.get("/", (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Welcome to the /api route",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// Route to refresh the jwt token
router.get("/refresh-token", handleGetRefreshJwtToken);

// Export the router instance
export default router;
