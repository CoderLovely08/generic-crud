import jwt from "jsonwebtoken";

export const generateRefreshToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
        });
        return {
            success: true,
            data: token,
        };
    } catch (error) {
        console.error(`Error in generateRefreshToken: ${error.message}`);
        return {
            success: false,
            message: error.message,
        };
    }
};
