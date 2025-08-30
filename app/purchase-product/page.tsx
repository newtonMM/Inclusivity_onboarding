"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProductSelection } from "@/components/onboarding-workflow/productSelection";
import PrincipleDetailsForm from "@/components/onboarding-workflow/principleDetails";
import { ProgressIndicator } from "@/components/onboarding-workflow/progressIndicator";
import DependantDetailsForm from "@/components/onboarding-workflow/dependantDetails";
import { ReviewSection } from "@/components/onboarding-workflow/reviewSection";
import { handlePreviousStep } from "@/features/handleOboarding.slice";
export default function PurchaseProduct() {
  const dispatch = useAppDispatch();
  const { onboardingStep } = useAppSelector((state) => state.Onboarding);

  const onBack = () => {
    dispatch(handlePreviousStep());
  };

  const steps = [
    { step: 1, title: "Select Product", completed: onboardingStep > 1 },
    { step: 2, title: "Principal Details", completed: onboardingStep > 2 },
    { step: 3, title: "Add dependants", completed: onboardingStep > 3 },
    { step: 4, title: "Review & Pay", completed: false },
  ];

  const componentToRender = (onboardingStep: number) => {
    switch (onboardingStep) {
      case 1:
        return <ProductSelection />;
      case 2:
        return <PrincipleDetailsForm />;
      case 3:
        return <DependantDetailsForm />;
      case 4:
        return <ReviewSection onBack={onBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pb-20 gap-16 sm:p-20 space-y-12">
      <ProgressIndicator currentStep={onboardingStep} steps={steps} />
      {componentToRender(onboardingStep)}
    </div>
  );
}
