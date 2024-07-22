"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

export type AuthStatusResponse = {
  success: boolean;
};

export const getAuthStatus = async (): Promise<AuthStatusResponse> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id || !user?.email) {
    throw new Error("Invalid User data");
  }
  const existingUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }
  return {
    success: true,
  };
};
