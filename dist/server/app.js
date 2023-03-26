"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./middleware/cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Add middleware to parse JSON request bodies
app.use(express_1.default.json());
// Add CORS middleware
app.use(cors_1.default);
// Add routes
app.use(routes_1.default);
// Handle 404s
app.use((req, res) => {
    res.status(404).end();
});
exports.default = app;
//# sourceMappingURL=app.js.map