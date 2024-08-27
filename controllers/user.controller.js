import prisma from "../config/db.config.js";
import { generateHashedPassword } from "../utils/common.utils.js";

/**
 * Get all users
 * @route GET /api/users
 */
export const handleGetAllUsers = async (req, res) => {
    try {
        const users = await prisma.userInfo.findMany();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        console.error(`Error in handleGetAllUsers: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

/**
 * Get a user by ID
 * @route GET /api/users/:id
 */
export const handleGetUserById = async (req, res) => {
    try {
        const { id } = req?.params;
        const user = await prisma.userInfo.findUnique({
            where: {
                user_id: parseInt(id),
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        console.error(`Error in handleGetUserById: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

/**
 * Update a user by ID
 * @route PUT /api/users/:id
 */
export const handleUpdateUserById = async (req, res) => {
    try {
        const { id } = req?.params;
        const { name, email } = req.body;

        // Check if user exists
        const userExists = await prisma.userInfo.findUnique({
            where: {
                user_id: parseInt(id),
            },
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }        

        const user = await prisma.userInfo.update({
            where: {
                user_id: parseInt(id),
            },
            data: {
                user_name: name,
                user_email: email,
            },
        });
  
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        console.error(`Error in handleUpdateUserById: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
