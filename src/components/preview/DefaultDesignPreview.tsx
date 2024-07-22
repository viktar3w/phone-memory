"use client";
import Confetti from "react-dom-confetti";
import { useEffect, useState } from "react";
import { Configuration } from "@prisma/client";
import Phone from "@/components/common/Phone";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/constants/design";
import { cn, formatPrice, getTotalPrice } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { BASE_PRICE } from "@/configs/product";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getCheckoutSession } from "@/actions/get-checkout-session";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/modals/LoginModal";
import { CONFIGURE_ID_KEY } from "@/constants/steps";
type DefaultDesignPreviewProps = {
  configuration: Configuration;
};

const DefaultDesignPreview = ({ configuration }: DefaultDesignPreviewProps) => {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const { user } = useKindeBrowserClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { push } = useRouter();
  const { toast } = useToast();
  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: getCheckoutSession,
    onSuccess: ({ url }) => {
      if (!!!url) {
        throw new Error("Unable to retrieve payment URL");
      }
      push(url);
    },
    onError: ({ message }) => {
      console.log("[ERROR]: ", message);
      toast({
        title: "Something was wrong!",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });
  useEffect(() => {
    setShowConfetti(true);
  }, []);
  const handleCheckout = () => {
    if (user) {
      createPaymentSession({ configId: id });
    } else {
      localStorage.setItem(CONFIGURE_ID_KEY, id);
      setIsLoginModalOpen(true);
    }
  };

  const { color, model, finish, material, id } = configuration;
  const tw = COLORS.find(({ value }) => value === color)?.tw;
  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => model === value,
  )!;
  let totalPrice = getTotalPrice(material, finish);
  return (
    <>
      <div
        className="pointer-event-none select-none absolute inset-0 overflow-hidden flex justify-center"
        aria-hidden="true"
      >
        <Confetti
          active={showConfetti}
          config={{
            elementCount: 200,
            spread: 90,
          }}
        />
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(!!tw ? `bg-${tw}` : "")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-gray-500 " />
            In stock and ready to ship
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlight</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 years print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality, durable materials</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base price</p>
                  <p className="text-gray-900 font-medium">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {finish === "textured" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Base price</p>
                    <p className="text-gray-900 font-medium">
                      {formatPrice(
                          (FINISHES.options.find((o) => o.value === finish)?.price || 0) / 100,
                      )}
                    </p>
                  </div>
                )}
                {material === "polycarbonate" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Soft polycarbonate</p>
                    <p className="text-gray-900 font-medium">
                      {formatPrice(
                        (MATERIALS.options.find((o) => o.value === material)?.price || 0) / 100,
                      )}
                    </p>
                  </div>
                )}
                <div className="my-2 h-px bg-gray-200" />
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="text-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end pb-12">
              <Button
                className="px-4 sm:px-6 lg:px-8"
                onClick={() => handleCheckout()}
              >
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDesignPreview;
