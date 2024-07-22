"use server";
import { CheckoutSessionRequestType } from "@/types/preview";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getTotalPrice } from "@/lib/utils";
import { Order } from "@prisma/client";
import { stripe } from "@/lib/stripe";

export const getCheckoutSession = async ({
  configId,
}: CheckoutSessionRequestType) => {
  const configuration = await db.configuration.findUnique({
    where: {
      id: configId,
    },
  });
  if (!configuration) {
    throw new Error("No such configuration found");
  }
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user?.email) {
    throw new Error("You need to be logged in");
  }
  const { finish, material } = configuration;
  let price = getTotalPrice(material, finish);
  let order: Order | undefined = undefined;
  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configId,
    },
  });
  if (!!existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configId,
      },
    });
  }
  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imgUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });
  return {
    url: stripeSession.url,
  };
};
