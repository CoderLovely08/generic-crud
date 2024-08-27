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

// Routes
import authRoutes from "./routes/auth.routes.js";

app.get("/", (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Welcome to the API",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// Use the authRoutes
app.use("/auth", authRoutes);

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
