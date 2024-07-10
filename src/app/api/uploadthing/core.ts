import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;
      console.log(5555, metadata)
      return { configId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
