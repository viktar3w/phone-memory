"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "@/actions/get-auth-status";
import { useRouter } from "next/navigation";
import { CONFIGURE_ID_KEY } from "@/constants/steps";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const { push } = useRouter();
  useEffect(() => {
    const configurationId = localStorage.getItem(CONFIGURE_ID_KEY);
    if (configurationId) {
      setConfigId(configurationId);
    }
  }, []);
  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });
  if (data?.success) {
    if (configId) {
      localStorage.removeItem(CONFIGURE_ID_KEY);
      push(`/configure/preview?id=${configId}`);
    } else {
      push("/");
    }
  }
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  );
};

export default Page;
