import { DefaultPageProps } from "@/types/page";
import fetchConfiguration from "@/actions/fetch-config";
import DefaultDesignPreview from "@/components/preview/DefaultDesignPreview";

const Page = async ({ searchParams }: DefaultPageProps) => {
  const { id } = searchParams;
  const configuration = await fetchConfiguration(id);
  if (!configuration || !!!configuration.croppedImageUrl) return;
  return <DefaultDesignPreview configuration={configuration} />;
};

export default Page;
