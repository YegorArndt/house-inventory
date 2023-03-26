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
exports.updateItem = exports.addItem = void 0;
const db_1 = require("../db");
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemName, quantity, daysToUseUp, price, tableName } = req.body;
    try {
        yield (0, db_1.runQuery)('INSERT INTO items (name, quantity, daysToUseUp, price, tableName) VALUES (?, ?, ?, ?, ?)', [itemName, quantity, daysToUseUp, price, tableName]);
        res.json({ message: `Item '${itemName}' inserted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addItem = addItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldItemName } = req.params;
    const { newItemName, newQuantity, newDaysToUseUp, newPrice, newTableName } = req.body;
    try {
        yield (0, db_1.runQuery)('UPDATE items SET name = ?, quantity = ?, daysToUseUp = ?, price = ?, tableName = ? WHERE name = ?', [
            newItemName,
            newQuantity,
            newDaysToUseUp,
            newPrice,
            newTableName,
            oldItemName,
        ]);
        res.json({ message: `Item '${oldItemName}' updated successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateItem = updateItem;
//# sourceMappingURL=itemController.js.map