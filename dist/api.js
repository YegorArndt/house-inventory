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
exports.updateItem = exports.addItem = exports.updateTable = exports.addTable = exports.updateHouseArea = exports.addHouseArea = exports.getAll = void 0;
const fetcher = (url, method = 'GET', body) => __awaiter(void 0, void 0, void 0, function* () {
    const init = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (body)
        init.body = JSON.stringify(body);
    try {
        const response = yield fetch(url, init);
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () { return yield fetcher('/getAll'); });
exports.getAll = getAll;
const addHouseArea = (areaName) => __awaiter(void 0, void 0, void 0, function* () { return yield fetcher('/housearea', 'POST', { areaName }); });
exports.addHouseArea = addHouseArea;
const updateHouseArea = (oldName, newName) => __awaiter(void 0, void 0, void 0, function* () {
    let test = yield fetch(`/housearea/${oldName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }),
    });
    test = yield test.json();
    console.log(test);
    // await fetcher(`/housearea/${oldName}`, 'PUT', { newName })
});
exports.updateHouseArea = updateHouseArea;
const addTable = (tableName, houseAreaName) => __awaiter(void 0, void 0, void 0, function* () { return yield fetcher('/table', 'POST', { tableName, houseAreaName }); });
exports.addTable = addTable;
const updateTable = (oldTableName, newTableName, houseAreaName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher(`/table/${oldTableName}`, 'PUT', {
        newTableName,
        houseAreaName,
    });
});
exports.updateTable = updateTable;
const addItem = (itemName, quantity, daysToUseUp, price, tableName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher('/item', 'POST', {
        itemName,
        quantity,
        daysToUseUp,
        price,
        tableName,
    });
});
exports.addItem = addItem;
const updateItem = (oldItemName, newItemName, newQuantity, newDaysToUseUp, newPrice, newTableName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher(`/item/${oldItemName}`, 'PUT', {
        newItemName,
        newQuantity,
        newDaysToUseUp,
        newPrice,
        newTableName,
    });
});
exports.updateItem = updateItem;
//# sourceMappingURL=api.js.map