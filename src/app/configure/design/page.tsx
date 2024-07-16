import DesignConfigurator from "@/components/design/DesignConfigurator";
import { DefaultPageProps } from "@/types/page";
import fetchConfiguration from "@/actions/fetch-config";

const Page = async ({ searchParams }: DefaultPageProps) => {
  const { id } = searchParams;
  const configuration = await fetchConfiguration(id);
  if (!configuration) return;
  const { imgUrl, width, height } = configuration;
  return (
    <DesignConfigurator
      configId={configuration.id}
      imgUrl={imgUrl}
      imgDimensions={{ width, height }}
    />
  );
};

export default Page;
