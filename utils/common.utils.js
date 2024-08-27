// Method to generate a hashed password using bcrypt
import bcrypt from "bcrypt";
export const generateHashedPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return {
            success: true,
            data: hashedPassword,
        };
    } catch (error) {
        console.error(`Error in generateHashedPassword: ${error.message}`);
        return {
            success: false,
            message: error.message,
        };
    }
};
