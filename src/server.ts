import app from "./app";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
import { toNodeHandler } from "better-auth/node";

const PORT = process.env.PORT || 5000;

app.all("/api/auth/*splat", toNodeHandler(auth));

async function main(){
    try{

        await prisma.$connect();
        console.log("Connected to database successfully");

        app.listen(PORT, ()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        })



    }catch(error){
        console.error("An error occured",error),
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();