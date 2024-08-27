import prisma from "../config/db.config.js";

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
