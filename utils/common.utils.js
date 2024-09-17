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
            success: isPasswordValid,
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
import { TOKEN_TYPES } from "./constants.js";
export const generateJwtToken = (payload, tokenType = TOKEN_TYPES.ACCESS) => {
    try {

        const secret = tokenType === TOKEN_TYPES.ACCESS ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;

        const token = jwt.sign(payload, secret, {
            expiresIn: tokenType === TOKEN_TYPES.ACCESS ? "15m" : "7d",
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

// Method to decode a jwt token
export const decodeJwtToken = (token, tokenType = TOKEN_TYPES.ACCESS) => {
    try {
        const secret =
            tokenType === TOKEN_TYPES.ACCESS
                ? process.env.ACCESS_TOKEN_SECRET
                : process.env.REFRESH_TOKEN_SECRET;

        const decoded = jwt.verify(token, secret);
        return {
            success: true,
            data: decoded,
        };
    } catch (error) {
        console.error(`Error in decodeJwtToken: ${error.message}`);
        return {
            success: false,
            message: error.message,
        };
    }
};
