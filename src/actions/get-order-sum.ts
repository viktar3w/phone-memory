"use server";
import { db } from "@/db";

export const getOrderSum = async (gte: Date) => {
  return await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte,
      },
    },
    _sum: {
      amount: true,
    },
  });
};
