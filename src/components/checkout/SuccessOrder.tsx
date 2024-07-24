"use client";
import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "@/actions/get-payment-status";
import { memo } from "react";
import { Loader2 } from "lucide-react";
import PhonePreview from "@/components/preview/PhonePreview";
import { formatPrice } from "@/lib/utils";

type SuccessOrderProps = {
  orderId: string;
};

const SuccessOrder = ({ orderId }: SuccessOrderProps) => {
  const { data } = useQuery({
    queryKey: ["payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });
  if (data === undefined) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>This won't take long</p>
        </div>
      </div>
    );
  }
  if (data === false) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Check your payment data...</h3>
        </div>
      </div>
    );
  }
  const {
    billingAddress,
    shippingAddress,
    configuration,
    user,
    isPaid,
    amount,
  } = data;
  const { color, croppedImageUrl } = configuration;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </p>
          <h2 className="text-base font-medium text-primary">Thank You!</h2>
          <p className="mt-2 text-base text-zinc-500">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We've received your order and are now processing it
          </p>
          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order Number</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              We hope it will be amazing choice
            </p>
          </div>
        </div>
        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview croppedImgUrl={croppedImageUrl!} color={color!} />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shipping address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Billing address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>
                  <span className="block">
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment status</p>
              <p className="fmt-2 text-zinc-700">Paid</p>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Shipping Method</p>
              <p className="fmt-2 text-zinc-700">
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal</p>
            <p className="ftext-zinc-700">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="ftext-zinc-700">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="ftext-zinc-700">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SuccessOrder);
