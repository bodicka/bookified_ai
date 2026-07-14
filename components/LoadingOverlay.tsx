"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type StepStatus = "pending" | "active" | "complete";

interface LoadingStep {
  label: string;
  status: StepStatus;
}

interface LoadingOverlayProps {
  open: boolean;
  title?: string;
  steps?: LoadingStep[];
}

const LoadingOverlay = ({
  open,
  title = "Synthesizing your book...",
  steps,
}: LoadingOverlayProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="loading-wrapper"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="loading-shadow-wrapper bg-white shadow-soft-lg">
        <div className="loading-shadow">
          <Loader2 className="loading-animation size-10 text-[#663820]" />
          <h2 className="loading-title">{title}</h2>
          {steps && steps.length > 0 && (
            <div className="loading-progress">
              {steps.map((step) => (
                <div key={step.label} className="loading-progress-item">
                  <span
                    className={cn(
                      "loading-progress-status",
                      step.status === "pending" && "bg-gray-300 animate-none",
                      step.status === "complete" && "bg-[var(--success)]",
                    )}
                  />
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
