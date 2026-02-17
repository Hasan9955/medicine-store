"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const prisma_2 = require("./prisma");
// If your Prisma file is located elsewhere, you can change the path
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(prisma_2.prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: process.env.APP_URL ? [process.env.APP_URL] : [],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false
            },
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            try {
                const info = await transporter.sendMail({
                    from: `"Medicine Store" <${process.env.APP_USER}>`,
                    to: user.email,
                    subject: "Please verify your email",
                    html: `
        <h2>Verify your email</h2>
        <p>Click the button below to verify your email address.</p>

        <a href="${url}"
           style="background:#2563eb;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;">
          Verify Email
        </a>

        <p>If the button does not work, copy this link:</p>
        <p>${url}</p>
      `,
                });
                console.log("Verification email sent:", info.messageId);
            }
            catch (error) {
                console.error("Email send failed:", error);
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});
