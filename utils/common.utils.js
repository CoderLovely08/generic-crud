// Method to generate a hashed password using bcrypt
import bcrypt from "bcrypt";
export const generateHashedPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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
