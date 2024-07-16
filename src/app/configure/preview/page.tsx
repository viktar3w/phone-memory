import { DefaultPageProps } from "@/types/page";
import fetchConfiguration from "@/actions/fetch-config";

const Page = async ({ searchParams }: DefaultPageProps) => {
  const { id } = searchParams;
  const configuration = await fetchConfiguration(id);
  if (!configuration) return;
  return <></>;
};

export default Page;
