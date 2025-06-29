"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_js_1 = __importDefault(require("./routes/userRouter.js"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", userRouter_js_1.default);
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});
