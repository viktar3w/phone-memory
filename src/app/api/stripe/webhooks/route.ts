import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!,
    );
    if (event.type === "checkout.session.completed") {
      if (!event?.data?.object?.customer_details?.email) {
        throw new Error("Missing user email");
      }
      const session = event.data.object as Stripe.Checkout.Session;
      const { orderId, userId } = session.metadata || {
        userId: null,
        orderId: null,
      };
      if (!orderId || !userId) {
        throw new Error("Invalid request metadata");
      }
      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.customer_details!.address;
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              state: shippingAddress!.state,
              street: shippingAddress!.line1!,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              state: billingAddress!.state,
              street: billingAddress!.line1!,
            },
          },
        },
      });
    }
    return NextResponse.json({ result: event, ok: true });
  } catch (err: any) {
    console.error("[ERROR] stripe webhook: ", err);
  }
  return NextResponse.json(
    { message: "Something was wrong!", ok: false },
    { status: 500 },
  );
}
