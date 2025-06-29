"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controller/userController.js");
// import { authenticate } from "../middleware/auth";
const router = express_1.default.Router();
router.post("/login", userController_js_1.login);
router.post("/register", userController_js_1.register);
router.get("/me", userController_js_1.getDetails); // protected route
exports.default = router;
