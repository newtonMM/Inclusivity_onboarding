import { createAsyncThunk } from "@reduxjs/toolkit";
import { DependantsDetails } from "@/components/onboarding-workflow/dependantDetails";
import { userDetails } from "@/components/onboarding-workflow/principleDetails";
/**
 * Creates a new policy asynchronously.
 *
 * This thunk expects a payload object containing the following properties:
 * - `productType`: The type of product for which the policy is being created.
 * - `dependant`: Information about the dependant to be included in the policy.
 * - `principal`: Information about the principal (main policyholder).
 * - `amount`: The amount associated with the policy.
 *
 * The thunk sends a request to the `/api/character` endpoint to create the policy.
 * If the request fails, it aborts the operation and returns the error message.
 * On success, it returns the created policy data.
 *
 * @param payload - An object with `productType`, `dependant`, `principal`, and `amount`.
 * @returns The created policy data or an error message if the request fails.
 */

type CreatePolicyPayload = {
  productType: string;
  dependant: DependantsDetails | undefined;
  principal: userDetails | undefined;
  amount: number;
};

export const createPolicy = createAsyncThunk(
  "createPolicy",
  async (payload: CreatePolicyPayload, thunkAPI) => {
    const abortController = new AbortController();
    const response = await fetch(`/api/policy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: abortController.signal,
    });
    if (!response.ok) {
      //   var message = await response.json();
      abortController.abort();
      return thunkAPI.rejectWithValue(await response.text());
    }
    const data = await response.json();
    return data;
  }
);
