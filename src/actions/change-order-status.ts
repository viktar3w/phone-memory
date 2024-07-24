"use server";
import { OrderStatus } from "@prisma/client";
import { db } from "@/db";

type OrderStatusRequest = {
  id: string;
  status: OrderStatus;
};

export const changeOrderStatus = async ({ id, status }: OrderStatusRequest) => {
  await db.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};
