import { DependantsDetails } from "@/components/onboarding-workflow/dependantDetails";
import { userDetails } from "@/components/onboarding-workflow/principleDetails";

type CreatePolicyPayload = {
  productType: string;
  dependant: DependantsDetails | undefined;
  principal: userDetails | undefined;
  amount: number;
};
export function createPolicyService(data: CreatePolicyPayload) {
  return fetch("/api/policies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
