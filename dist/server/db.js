"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuery = void 0;
const mysql_1 = __importDefault(require("mysql"));
const pool = mysql_1.default.createPool({
    host: 'database-2.cftohjdpqlrj.eu-north-1.rds.amazonaws.com',
    // port: '3306',
    user: 'admin',
    password: '123175tahema',
    database: 'my_db',
});
const runQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};
exports.runQuery = runQuery;
//# sourceMappingURL=db.js.map