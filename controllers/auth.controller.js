import prisma from "../config/db.config.js";
import {
    comparePassword,
    generateHashedPassword,
    generateJwtToken,
} from "../utils/common.utils.js";

/**
 * Handle user registration
 * @route POST /api/auth/register
 */
export const handlePostUserRegistration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await prisma.userInfo.findUnique({
            where: {
                user_email: email,
            },
        });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await generateHashedPassword(password);

        if (!hashedPassword.success) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }

        // Create a new user
        await prisma.userInfo.create({
            data: {
                user_name: name,
                user_email: email,
                user_password: hashedPassword?.data,
            },
        });

        return res.status(200).json({
            success: true,
            message: "User registration successful",
        });
    } catch (error) {
        console.error(`Error in handlePostUserRegistration: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

/**
 * Handle user login
 * @route POST /api/auth/login
 */
export const handlePostUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await prisma.userInfo.findUnique({
            where: {
                user_email: email,
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare the passwords
        const isPasswordValid = await comparePassword(
            password,
            user.user_password
        );

        if (!isPasswordValid.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }
        const payload = {
            user_id: user.user_id,
            user_email: user.user_email,
        };
        // Generate a JWT token
        const tokenResult = generateJwtToken(payload);

        if (!tokenResult.success) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }

        res.cookie("token", tokenResult?.data, {
            maxAge: 1000 * 60 * 60 * 30 * 24,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: tokenResult?.data,
        });
    } catch (error) {
        console.error(`Error in handlePostUserLogin: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
