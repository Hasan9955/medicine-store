import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
import { toNodeHandler } from "better-auth/node";
import routeAuth, { UserRole } from "./middlewares/route-auth";
import app from "./app";

const PORT = process.env.PORT || 5000;

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get(
  "api/auth/profile",
  routeAuth(UserRole.ADMIN, UserRole.SELLER, UserRole.USER),
  (req, res) => {
    res.json(req.user);
  },
);

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");

    // app.listen(PORT, ()=>{
    //     console.log(`Server is running on http://localhost:${PORT}`);
    // })
    app.listen(PORT as number, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    (console.error("An error occured", error), await prisma.$disconnect());
    process.exit(1);
  }
}
main();
