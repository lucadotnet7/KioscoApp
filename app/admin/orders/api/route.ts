import prisma from "@/src/lib/prisma";

export async function GET() {
    const pendingOrders = await prisma.order.findMany({
        where: {
          status: false,
        },
        include: {
          OrderProducts: {
            include: {
              product: true,
            },
          },
        },
      });
    
    return Response.json({orders: pendingOrders});
}