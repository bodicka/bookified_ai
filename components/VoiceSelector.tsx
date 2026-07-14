"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { voiceCategories, voiceOptions } from "@/lib/constans";
import { cn } from "@/lib/utils";

type VoiceKey = keyof typeof voiceOptions;

const categoryLabels = {
  male: "Male Voices",
  female: "Female Voices",
} as const;

interface VoiceSelectorFormProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  disabled?: boolean;
  className?: string;
}

function VoiceSelector<T extends FieldValues>({
  control,
  name,
  disabled,
  className,
}: VoiceSelectorFormProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
          <FormControl>
            <div className="space-y-6" role="radiogroup">
              {(
                Object.keys(voiceCategories) as Array<
                  keyof typeof voiceCategories
                >
              ).map((category) => (
                <div key={category}>
                  <p className="mb-3 text-sm text-[var(--text-secondary)]">
                    {categoryLabels[category]}
                  </p>
                  <div
                    className={cn(
                      "voice-selector-options",
                      category === "male"
                        ? "grid grid-cols-1 sm:grid-cols-3"
                        : "grid grid-cols-1 sm:grid-cols-2",
                    )}
                  >
                    {voiceCategories[category].map((voiceKey) => {
                      const voice = voiceOptions[voiceKey as VoiceKey];
                      const selected = field.value === voiceKey;

                      return (
                        <label
                          key={voiceKey}
                          className={cn(
                            "voice-selector-option voice-selector-option-default !items-start !justify-start",
                            selected && "voice-selector-option-selected",
                            disabled && "voice-selector-option-disabled",
                          )}
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={voiceKey}
                            checked={selected}
                            disabled={disabled}
                            className="sr-only"
                            onChange={() => field.onChange(voiceKey)}
                          />
                          <span
                            className={cn(
                              "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2",
                              selected
                                ? "border-[var(--accent-warm)]"
                                : "border-[var(--border-medium)]",
                            )}
                          >
                            {selected && (
                              <span className="size-2 rounded-full bg-[var(--accent-warm)]" />
                            )}
                          </span>
                          <span>
                            <span className="block font-semibold text-[var(--text-primary)]">
                              {voice.name}
                            </span>
                            <span className="mt-1 block text-sm text-[var(--text-secondary)]">
                              {voice.description}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default VoiceSelector;
