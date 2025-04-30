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
exports.updateUser = exports.getUser = exports.refresh = exports.signIn = exports.signUp = exports.client = void 0;
const pg_1 = require("pg");
exports.client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, username, email } = req.body;
    try {
        const result = yield exports.client.query(`
        INSERT INTO users (user_id, username, email)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [userId, username, email]);
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user: result.rows[0],
        });
    }
    catch (error) {
        console.error("Signup error:", error.message);
        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.signIn = signIn;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield exports.client.query(`SELECT * FROM users`);
        res.status(200).json({ success: true, result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.refresh = refresh;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield exports.client.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
        res.status(200).json({ success: true, result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fields = [];
    const values = [];
    let index = 1;
    for (let key in req.body) {
        fields.push(`${key} = $${index}`);
        values.push(req.body[key]);
        index++;
    }
    if (fields.length === 0) {
        return res.status(400).json({ message: 'No data provided to update' });
    }
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    values.push(id);
    try {
        const result = yield exports.client.query(query, values);
        res.json(result[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=Auth.js.map