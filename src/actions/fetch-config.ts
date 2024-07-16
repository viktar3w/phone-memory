import { notFound } from "next/navigation";
import { db } from "@/db";

const fetchConfiguration = async (id: string | string[] | undefined) => {
  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }
  return configuration;
};

export default fetchConfiguration;
