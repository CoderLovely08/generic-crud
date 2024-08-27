import validator from "validator";

export const validateUserRegistration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if name is provided
        if (!name || !validator.isAlpha(name)) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check if email is valid
        if(!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // Check if password is valid
        if(!password || !validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Provide a strong password",
            });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}