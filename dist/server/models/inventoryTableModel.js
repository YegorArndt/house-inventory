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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventoryTable = exports.addInventoryTable = exports.getAllInventoryTables = void 0;
const db_1 = __importDefault(require("../db"));
const getAllInventoryTables = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.query('SELECT * FROM inventoryTables');
});
exports.getAllInventoryTables = getAllInventoryTables;
const addInventoryTable = (tableName, houseAreaName) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.query('INSERT INTO inventoryTables (name, houseAreaName) VALUES (?, ?)', [tableName, houseAreaName]);
});
exports.addInventoryTable = addInventoryTable;
const updateInventoryTable = (oldTableName, newTableName, newHouseAreaName) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.query('UPDATE inventoryTables SET name = ?, houseAreaName = ? WHERE name = ?', [newTableName, newHouseAreaName, oldTableName]);
});
exports.updateInventoryTable = updateInventoryTable;
//# sourceMappingURL=inventoryTableModel.js.map