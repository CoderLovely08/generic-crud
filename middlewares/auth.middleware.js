import validator from "validator";

export const validateUserData = async (req, res, next) => {
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
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // Check if password is valid
        if (!password || !validator.isStrongPassword(password)) {
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
};

// Advance validation
// Array will contain the fields to validate
export const validateUserDataAdvance = (fields) => {
    return async (req, res, next) => {
        try {
            let errorItem = null;
            // Loop through the fields array
            fields.forEach((field) => {
                if (!req.body[field]) {
                    errorItem = field;
                    return;
                }
            });

            if (errorItem) {
                return res.status(400).json({
                    success: false,
                    message: `${errorItem} is required`,
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };
};
