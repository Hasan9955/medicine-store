"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const auth_1 = require("../lib/auth");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["SELLER"] = "SELLER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
const routeAuth = (...role) => {
    return async (req, res, next) => {
        try {
            //get user session
            const session = await auth_1.auth.api.getSession({
                headers: req.headers
            });
            if (!session) {
                return res.status(401).json({
                    srccess: false,
                    message: "you are not authorized"
                });
            }
            if (!session.user.emailVerified) {
                return res.status(401).json({
                    success: false,
                    message: "Email varification required. Please varify your email"
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name ?? "",
                role: session.user.role,
                emailVerified: session.user.emailVerified
            };
            if (role.length && !role.includes(req.user.role)) {
                return res.status(401).json({
                    success: false,
                    message: "You don't have permission to access this resources"
                });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = routeAuth;
