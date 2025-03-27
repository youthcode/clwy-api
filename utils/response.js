/**
 * 自定义 404 错误类
 */
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

function success(res, message, data = {}, code = 200) {
    res.status(code).json({
        status: true,
        message,
        data
    });
}

function failure(res, error) {
    
}

module.exports = {
    NotFoundError,
    success
};