import { z } from "zod";

import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_PDF_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
} from "./constans";

export const UploadSchema = z.object({
  pdfFile: z
    .custom<File>((val) => val instanceof File, {
      message: "Please upload a PDF file",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, "PDF must be 50MB or less")
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file.type),
      "File must be a PDF",
    ),
  coverFile: z
    .custom<File | undefined>(
      (val) => val === undefined || val instanceof File,
      { message: "Invalid cover image" },
    )
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
      "Cover image must be 10MB or less",
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid image type",
    ),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  voice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"]),
});
