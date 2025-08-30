import React from "react";
import { Check } from "lucide-react";

interface Step {
  step: number;
  title: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressIndicator({
  steps,
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-8">
      {steps.map((step, index) => (
        <div key={step.step} className="flex items-center">
          <div className="flex items-center space-x-3">
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${
                step.completed
                  ? "bg-[#376A20] text-white"
                  : step.step === currentStep
                  ? "bg-[#376A20] text-white"
                  : "bg-[#B8B8B8] text-white"
              }
            `}
            >
              {step.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm">{step.step}</span>
              )}
            </div>
            <span
              className={`
              ${
                step.step === currentStep
                  ? "text-[#000000]"
                  : step.completed
                  ? "text-[#000000]"
                  : "text-[#000000]"
              }
            `}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-px bg-[#B8B8B8] mx-4" />
          )}
        </div>
      ))}
    </div>
  );
}
