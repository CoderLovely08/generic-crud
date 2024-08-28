import validator from "validator";
import { decodeJwtToken } from "../utils/common.utils.js";

// Middleware to validate user data
export const validateUserData = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if name is provided
        if (!name || !validator.isAlpha(name)) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check if email is valid
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // Check if password is valid
        if (!password || !validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Provide a strong password",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// --------------------------------------------
// Advance validation
// --------------------------------------------
// Array will contain the fields to validate
export const validateUserDataAdvance = (fields) => {
    return async (req, res, next) => {
        try {
            let errorItem = null;
            // Loop through the fields array
            fields.forEach((field) => {
                if (!req.body[field]) {
                    errorItem = field;
                    return;
                }
            });

            if (errorItem) {
                return res.status(400).json({
                    success: false,
                    message: `${errorItem} is required`,
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };
};

// --------------------------------------------
// Middleware to validate jwt token
// --------------------------------------------

export const validateToken = async (req, res, next) => {
    try {
        const token =
            req.header("x-auth-token") ||
            req.headers.authorization ||
            req.query?.token ||
            req.cookies?.token;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided",
            });
        }

        // Verify token
        const decoded = decodeJwtToken(token);

        if (!decoded.success) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
