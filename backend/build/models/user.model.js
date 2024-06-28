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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Password must be atleast 6 characters"],
        select: false,
        default: "google",
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    role: {
        type: String,
        default: "student",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: String,
        },
    ],
    verification: {
        "0": String,
        "1": String,
        "2": String,
    },
    learnings: [
        {
            course: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Course",
            },
            progress: [
                {
                    type: mongoose_1.default.Types.ObjectId,
                    ref: "Course",
                },
            ],
            certificate: {
                type: Boolean,
                default: false,
            },
        },
    ],
    teachings: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Course",
        },
    ],
    wishlist: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Course",
        },
    ],
    wallet: {
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [
            {
                date: { type: Date },
                amount: Number,
                type: { type: String, enum: ["dr", "cr"] },
                remark: String,
            },
        ],
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isRejected: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
userSchema.methods.signAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
        expiresIn: "3d",
    });
};
userSchema.methods.signRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
        expiresIn: "5d",
    });
};
userSchema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
