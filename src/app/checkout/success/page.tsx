import { Suspense } from "react";
import SuccessOrder from "@/components/checkout/SuccessOrder";
import { DefaultPageProps } from "@/types/page";

const Page = ({ searchParams }: DefaultPageProps) => {
  const { orderId } = searchParams;
  if (!orderId || typeof orderId !== "string") {
    return <></>;
  }
  return (
    <Suspense>
      <SuccessOrder orderId={orderId} />
    </Suspense>
  );
};

export default Page;
