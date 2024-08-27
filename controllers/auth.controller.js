import prisma from "../config/db.config.js";
import { generateHashedPassword } from "../utils/common.utils.js";

export const handlePostUserRegistration = async (req, res) => {
    try {
        const { name, email } = req.body;

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
