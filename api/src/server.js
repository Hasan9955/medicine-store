"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./lib/auth");
const prisma_1 = require("./lib/prisma");
const node_1 = require("better-auth/node");
const route_auth_1 = __importStar(require("./middlewares/route-auth"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
app_1.default.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
app_1.default.get("api/auth/profile", (0, route_auth_1.default)(route_auth_1.UserRole.ADMIN, route_auth_1.UserRole.SELLER, route_auth_1.UserRole.USER), (req, res) => {
    res.json(req.user);
});
async function main() {
    try {
        await prisma_1.prisma.$connect();
        console.log("Connected to database successfully");
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("An error occured", error),
            await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
main();
