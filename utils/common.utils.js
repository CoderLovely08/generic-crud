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

// Method to compare a password with a hashed password
export const comparePassword = async (password, hashedPassword) => {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return {
            success: true,
            data: isPasswordValid,
        };
    } catch (error) {
        console.error(`Error in comparePassword: ${error.message}`);
        return {
            success: false,
            message: error.message,
        };
    }
};

// Method to generate a jwt token
import jwt from "jsonwebtoken";
export const generateJwtToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
        });
        return {
            success: true,
            data: token,
        };
    } catch (error) {
        console.error(`Error in generateJwtToken: ${error.message}`);
        return {
            success: false,
            message: error.message,
        };
    }
};
