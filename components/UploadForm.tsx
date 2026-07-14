"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Upload } from "lucide-react";
import { useForm } from "react-hook-form";

import FileUploadField from "@/components/FileUploadField";
import LoadingOverlay from "@/components/LoadingOverlay";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import VoiceSelector from "@/components/VoiceSelector";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_PDF_TYPES,
  DEFAULT_VOICE,
} from "@/lib/constans";
import { UploadSchema } from "@/lib/zod";
import type { BookUploadFormValues } from "@/types";

const SYNTHESIS_STEPS = [
  "Uploading PDF",
  "Extracting text",
  "Building persona",
  "Finalizing interview",
];

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: DEFAULT_VOICE,
      pdfFile: undefined,
      coverFile: undefined,
    },
  });

  const onSubmit = async (values: BookUploadFormValues) => {
    setIsSubmitting(true);
    setActiveStep(0);

    try {
      for (let step = 0; step < SYNTHESIS_STEPS.length; step++) {
        setActiveStep(step);
        await new Promise((resolve) => setTimeout(resolve, 900));
      }

      console.log("Submitting book:", values);
    } finally {
      setIsSubmitting(false);
      setActiveStep(0);
    }
  };

  const steps = SYNTHESIS_STEPS.map((label, index) => ({
    label,
    status:
      index < activeStep
        ? ("complete" as const)
        : index === activeStep
          ? ("active" as const)
          : ("pending" as const),
  }));

  return (
    <>
      <LoadingOverlay
        open={isSubmitting}
        title="Synthesizing your book..."
        steps={steps}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="new-book-wrapper space-y-8"
        >
          <FileUploadField
            control={form.control}
            name="pdfFile"
            label="Book PDF File"
            acceptTypes={ACCEPTED_PDF_TYPES}
            icon={Upload}
            placeholder="Click to upload PDF"
            hint="PDF file (max 50MB)"
            disabled={isSubmitting}
          />

          <FileUploadField
            control={form.control}
            name="coverFile"
            label="Cover Image (Optional)"
            acceptTypes={ACCEPTED_IMAGE_TYPES}
            icon={ImageIcon}
            placeholder="Click to upload cover image"
            hint="Leave empty to auto-generate from PDF"
            disabled={isSubmitting}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <input
                    className="form-input"
                    placeholder="ex: Rich Dad Poor Dad"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <input
                    className="form-input"
                    placeholder="ex: Robert Kiyosaki"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <VoiceSelector<BookUploadFormValues>
            control={form.control}
            name="voice"
            disabled={isSubmitting}
          />

          <button type="submit" className="form-btn" disabled={isSubmitting}>
            Begin Synthesis
          </button>
        </form>
      </Form>
    </>
  );
};

export default UploadForm;
