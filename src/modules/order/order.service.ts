import { prisma } from "../../lib/prisma";




const createOrder = async(userId : string, total : number)=>{
    const order = await prisma.order.create({
        data:{
            userId : userId,
            total : total
        }
    })
    return order;
}


const getAllOrder = async() =>{
    const orders = await prisma.order.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    return orders
}

export const orderService ={
    createOrder,
    getAllOrder
}