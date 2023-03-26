"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const houseAreaRoutes_1 = __importDefault(require("./houseAreaRoutes"));
const inventoryTableRoutes_1 = __importDefault(require("./inventoryTableRoutes"));
const itemRoutes_1 = __importDefault(require("./itemRoutes"));
const router = (0, express_1.Router)();
router.use('/housearea', houseAreaRoutes_1.default);
router.use('/table', inventoryTableRoutes_1.default);
router.use('/item', itemRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map