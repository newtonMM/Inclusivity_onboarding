import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createPolicy } from "@/thunks/Policy";
import { is } from "date-fns/locale";
import { LoadingSpinner } from "../ui/loadingSpinner";
// import { useMutation } from "@tanstack/react-query";
// import { createPolicyService } from "@/services/createPolicy";

interface ReviewAndPayProps {
  onBack: () => void;
}

export function ReviewSection({ onBack }: ReviewAndPayProps) {
  const dispatch = useAppDispatch();
  const {
    productType: selectedProduct,
    principalAccount: principalData,
    dependantDetails: dependantsData,
    isLoading,
    isError,
  } = useAppSelector((state) => state.Onboarding);
  const benefitPackage =
    selectedProduct === "legal" ? "KSH 100,000" : "KSH 150,000";
  const totalPremium = 300;

  /// using react-query to make api calls

  // const policyMutate = useMutation({
  //   mutationFn: createPolicyService,
  //   onSuccess: () => {
  //     //  can invalidate a query to refetch data
  //   },
  //   onError: () => {
  //     // Handle error
  //     // Optionally show error notification toast
  //   },
  // });

  const handleSubmit = () => {
    dispatch(
      createPolicy({
        productType: selectedProduct,
        dependant: dependantsData,
        principal: principalData,
        amount: totalPremium,
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl text-[#383838] font-semibold mb-2">
        Review Details
      </h2>
      <p className="text-[#000000] font-light text-lg mb-8 leading-relaxed mb-8 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem sit
        amet risus eleifend efficitur euismod vel mi. Proin vel turpis quis
        massa ultrices placerat eleifend a augue.
      </p>

      <div className="bg-white border border-[#A7A7A7] rounded-lg p-8 mb-8">
        <h3 className="text-lg text-[#000000] font-semibold mb-6">
          Summary of Your Application
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">Product Type</span>
            <span className="text-[#282828] font-light">{selectedProduct}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">
              Selected Benefit Package
            </span>
            <span className="text-[#282828] font-bold">{benefitPackage}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">Principal Member</span>
            <span className="text-[#282828] font-light">
              {principalData.fullName || "John Doe"}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#282828] font-light">
                Total Annual Premium
              </span>
              <span className="text-[#282828] font-light">
                KSH {totalPremium}
              </span>
            </div>

            <div className="text-center space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="px-6 py-3"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-8 py-3 bg-[#376A20] cursor-pointer hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {isLoading ? <LoadingSpinner /> : "Buy Policy"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
