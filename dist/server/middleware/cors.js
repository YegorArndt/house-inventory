"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
exports.default = corsMiddleware;
//# sourceMappingURL=cors.js.map