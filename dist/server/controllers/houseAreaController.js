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
exports.updateHouseArea = exports.addHouseArea = exports.getAllHouseAreas = void 0;
const db_1 = require("../db");
const getAllHouseAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houseAreas = yield (0, db_1.runQuery)('SELECT * FROM houseAreas');
        res.json(houseAreas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllHouseAreas = getAllHouseAreas;
const addHouseArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { areaName } = req.body;
    try {
        yield (0, db_1.runQuery)('INSERT INTO houseAreas (name) VALUES (?)', [areaName]);
        res.json({ message: `House area '${areaName}' inserted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addHouseArea = addHouseArea;
const updateHouseArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldName } = req.params;
    const { newName } = req.body;
    try {
        yield (0, db_1.runQuery)('UPDATE houseAreas SET name = ? WHERE name = ?', [
            newName,
            oldName,
        ]);
        res.json({
            message: `House area '${oldName}' updated to '${newName}' successfully`,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateHouseArea = updateHouseArea;
//# sourceMappingURL=houseAreaController.js.map