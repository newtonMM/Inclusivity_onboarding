import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPolicy } from "@/thunks/Policy";
import { userDetails } from "@/components/onboarding-workflow/principleDetails";
import { DependantsDetails } from "@/components/onboarding-workflow/dependantDetails";

interface FetchCharactersState {
  productType: string;
  onboardingStep: number;
  principalAccount: userDetails | undefined;
  dependantDetails: DependantsDetails | undefined;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: FetchCharactersState = {
  productType: "",
  onboardingStep: 1,
  principalAccount: undefined,
  dependantDetails: undefined,
  isLoading: false,
  isError: false,
  message: "",
};

const HandleOnboarding = createSlice({
  name: "onBoardingProcess",
  initialState,
  reducers: {
    handleProductType: (state, action: PayloadAction<string>) => {
      state.productType = action.payload;
    },
    handlePrincipalAccount: (
      state,
      action: PayloadAction<userDetails | undefined>
    ) => {
      state.principalAccount = action.payload;
    },
    handleDependants: (
      state,
      action: PayloadAction<DependantsDetails | undefined>
    ) => {
      state.dependantDetails = action.payload;
    },
    handleNextStep: (state) => {
      state.onboardingStep += 1;
    },
    handlePreviousStep: (state) => {
      if (state.onboardingStep > 1) {
        state.onboardingStep -= 1;
      }
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(getRickAndMortyCharacters.pending, (state) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(getRickAndMortyCharacters.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.data = action.payload;
  //       })
  //       .addCase(getRickAndMortyCharacters.rejected, (state, action) => {
  //         state.isLoading = false;
  //         state.isError = true;
  //         state.message = action.error.message;
  //       });
  //   },
});

export const {
  handleProductType,
  handlePrincipalAccount,
  handleDependants,
  handleNextStep,
  handlePreviousStep,
} = HandleOnboarding.actions;
export default HandleOnboarding.reducer;
