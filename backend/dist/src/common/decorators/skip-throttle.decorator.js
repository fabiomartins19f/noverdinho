"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipThrottle = exports.SKIP_THROTTLE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SKIP_THROTTLE_KEY = 'skipThrottle';
const SkipThrottle = (skip = true) => (0, common_1.SetMetadata)(exports.SKIP_THROTTLE_KEY, skip);
exports.SkipThrottle = SkipThrottle;
//# sourceMappingURL=skip-throttle.decorator.js.map