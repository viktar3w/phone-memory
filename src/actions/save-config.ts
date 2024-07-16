"use server";
import { ConfigImageType } from "@/types/design";
import { db } from "@/db";
const saveConfig = async ({
  color,
  finish,
  material,
  model,
  configId,
}: ConfigImageType) => {
  await db.configuration.update({
    where: {
      id: configId,
    },
    data: {
      color,
      finish,
      material,
      model,
    },
  });
};

export default saveConfig;
