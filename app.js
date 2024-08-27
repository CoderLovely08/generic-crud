import express from "express";
import bodyParser from "body-parser";

import "dotenv/config";

// Creating app instance
const app = express();

const PORT = process.env.PORT;

// Setup middlewares
app.use(express.json());
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiter
import rateLimit from "express-rate-limit";
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

app.get("/", (req, res) => {
    try {
        const customMessage = {
            success: true,
            message: "Welcome to the API",
            routes: {
                "/api/auth": {
                    description: "Authentication related endpoints",
                    endpoints: {
                        "/api/auth/register": {
                            method: "POST",
                            description: "Register a new user",
                        },
                        "/api/auth/login": {
                            method: "POST",
                            description: "Log in an existing user",
                        },
                    },
                },
                "/api/users": {
                    description: "User management endpoints",
                    endpoints: {
                        "/api/users": {
                            method: "GET",
                            description: "Get all users",
                        },
                        "/api/users/:id": {
                            methods: {
                                GET: "Get user by ID",
                                PUT: "Update user by ID",
                                DELETE: "Delete user by ID",
                            },
                            description: "Operations on a specific user",
                        },
                    },
                },
            },
            documentation: {
                info: "For more information, please refer to the documentation.",
                link: "https://github.com/CoderLovely08/generic-crud",
            },
        };

        return res.status(200).json(customMessage);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// Use the authRoutes
app.use("/api/auth", authRoutes);

// Use the userRoutes
app.use("/api/users", userRoutes);

// 404 Route
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: "Page not found",
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
