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
exports.getDetails = exports.register = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Enter All Fields" });
            return;
        }
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "No user exists" });
            return;
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            res.status(400).json({ message: "Password did not match" });
            return;
        }
        const token = (0, jwt_1.generateToken)(user.id);
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
// Register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "Enter all fields" });
            return;
        }
        const existing = yield prisma.user.findUnique({ where: { email } });
        if (existing) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        const token = (0, jwt_1.generateToken)(newUser.id);
        res.status(201).json({
            message: "User registered",
            token: token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error" });
    }
});
exports.register = register;
const getDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const user = yield prisma.user.findUnique({ where: { id } });
        if (!user) {
            res.status(400).json({
                message: "user does not exist"
            });
            return;
        }
        res.status(200).json({
            user: {
                username: user.username, // Fixed: was userName, should be username
                email: user.email
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getDetails = getDetails;
