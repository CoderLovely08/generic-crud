import prisma from "../config/db.config.js";

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
}