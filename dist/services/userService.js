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
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    static register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield User_1.default.findOne({ where: { email } });
            if (existingUser) {
                throw new Error("User already exists");
            }
            const user = yield User_1.default.create({ email, password });
            return { id: user.id, email: user.email };
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ where: { email } });
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid email or password");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            return { token, user: { id: user.id, email: user.email } };
        });
    }
}
exports.default = UserService;
