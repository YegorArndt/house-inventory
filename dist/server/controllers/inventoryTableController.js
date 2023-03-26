"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventoryTable = exports.addInventoryTable = void 0;
const db_1 = require("../db");
const addInventoryTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tableName, houseAreaName } = req.body;
    try {
        yield (0, db_1.runQuery)('INSERT INTO inventoryTables (name, houseAreaName) VALUES (?, ?)', [tableName, houseAreaName]);
        res.json({
            message: `Inventory table '${tableName}' inserted successfully`,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addInventoryTable = addInventoryTable;
const updateInventoryTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldTableName } = req.params;
    const { newTableName, newHouseAreaName } = req.body;
    try {
        yield (0, db_1.runQuery)('UPDATE inventoryTables SET name = ?, houseAreaName = ? WHERE name = ?', [newTableName, newHouseAreaName, oldTableName]);
        res.json({
            message: `Inventory table '${oldTableName}' updated successfully`,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateInventoryTable = updateInventoryTable;
//# sourceMappingURL=inventoryTableController.js.map