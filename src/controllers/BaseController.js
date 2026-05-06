class BaseController {
    constructor() {
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
    }

    success(res, statusCode, message, data = null) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    error(res, statusCode, message) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }
}

export default BaseController;
