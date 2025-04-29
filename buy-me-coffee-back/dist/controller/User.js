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
exports.getUserProfile = exports.createProfile = void 0;
const connection_1 = require("../utils/connection");
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.client.query(`INSERT INTO profile (name, about, avatar_image, social_media_url, bg_img, user_id) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *`, [req.body.name, req.body.about, req.body.avatar_image, req.body.social_media_url, req.body.bg_image, req.body.user_id]);
        res.status(200).json({ success: true, result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.createProfile = createProfile;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.client.query(`SELECT * FROM profile WHERE id = $1`, [req.params.id]);
        res.status(200).json({ success: true, result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
});
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=User.js.map