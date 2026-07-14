"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { type FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { FileUploadFieldProps } from "@/types";

function FileUploadField<T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploadFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const file = value as File | undefined;

        return (
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <FormControl>
              <div
                className={cn(
                  "upload-dropzone border-2 border-dashed border-[var(--border-medium)]",
                  file && "upload-dropzone-uploaded",
                )}
                onClick={() => !disabled && inputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    inputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {!file ? (
                  <>
                    <Icon className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">{placeholder}</p>
                    <p className="upload-dropzone-hint">{hint}</p>
                  </>
                ) : (
                  <div className="flex items-center gap-3 px-4">
                    <span className="upload-dropzone-text truncate">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      className="upload-dropzone-remove"
                      aria-label="Remove file"
                      onClick={(event) => {
                        event.stopPropagation();
                        onChange(undefined);
                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      }}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept={acceptTypes.join(",")}
                  className="hidden"
                  disabled={disabled}
                  onChange={(event) => {
                    const selected = event.target.files?.[0];
                    if (selected) {
                      onChange(selected);
                    }
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FileUploadField;
