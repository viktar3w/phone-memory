"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

type PaymentStatusRequest = {
  orderId: string;
};

export const getPaymentStatus = async ({ orderId }: PaymentStatusRequest) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id || !user?.email) {
    throw new Error("You need to be logged in to view this page");
  }
  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: user?.id,
    },
    include: {
      billingAddress: true,
      shippingAddress: true,
      configuration: true,
      user: true,
    },
  });
  if (!order) {
    throw new Error("This order doesn't exist.");
  }
  return order.isPaid ? order : false;
};
