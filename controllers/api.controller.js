import prisma from "../config/db.config.js";
import { decodeJwtToken, generateJwtToken } from "../utils/common.utils.js";
import { TOKEN_TYPES } from "../utils/constants.js";

export const handleGetRefreshJwtToken = async (req, res) => {
    try {

        const refreshTokenFromCookie = req.cookies?.refreshToken;

        // Check if token is provided
        if (!refreshTokenFromCookie) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided",
            });
        }

        // Verify token
        const decoded = decodeJwtToken(refreshTokenFromCookie, TOKEN_TYPES.REFRESH);

        // Check if token is valid
        if (!decoded.success) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Check if token is in db
        const existingRefreshToken = await prisma.userSession.findFirst({
            where: {
                user_id: decoded.data.user_id,
                session_token: refreshTokenFromCookie,
            },
        });

        if (!existingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Generate a new access token and refresh token
        const payload = {
            user_id: decoded.data.user_id,
            user_email: decoded.data.user_email,
        };

        const accessTokenResult = generateJwtToken(payload, TOKEN_TYPES.ACCESS);
        const refreshTokenResult = generateJwtToken(payload, TOKEN_TYPES.REFRESH);

        if (!accessTokenResult.success || !refreshTokenResult.success) {
            throw new Error("Error in generating tokens");
        }

        // Update the refresh token in db
        await prisma.userSession.update({
            where: {
                user_id: decoded.data.user_id,
                session_token: refreshTokenFromCookie,
            },
            data: {
                session_token: refreshTokenResult?.data,
            },
        });

        res.cookie("token", accessTokenResult?.data, {
            httpOnly: true,
        });

        res.cookie("refreshToken", refreshTokenResult?.data, {
            httpOnly: true,
        });

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            token: accessTokenResult?.data,
            refreshToken: refreshTokenResult?.data,
        });
    } catch (error) {
        console.error(`Error in handleGetRefreshJwtToken: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}