"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = exports.AppException = void 0;
const common_1 = require("@nestjs/common");
class AppException extends common_1.HttpException {
    code;
    constructor(code, message, status = common_1.HttpStatus.BAD_REQUEST) {
        super({ code, message }, status);
        this.code = code;
    }
}
exports.AppException = AppException;
class NotFoundException extends AppException {
    constructor(code = 'USER_NOT_FOUND', message = 'Registro não encontrado.') {
        super(code, message, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=app.exception.js.map