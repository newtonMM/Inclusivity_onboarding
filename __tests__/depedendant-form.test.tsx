/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DependantDetailsForm from "@/components/onboarding-workflow/dependantDetails";

// Mock redux hooks
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Import after mocking
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleNextStep,
  handlePreviousStep,
  handleDependants,
} from "@/features/handleOboarding.slice";

describe("DependantDetails Form", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ Onboarding: { dependantDetailsForm: null } })
    );

    jest.clearAllMocks();
  });

  it("renders form fields", () => {
    render(<DependantDetailsForm />);

    expect(screen.getByTestId("dependant-details-form")).toBeInTheDocument();
    expect(screen.getByTestId("full-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("date-of-birth-button")).toBeInTheDocument();
    expect(screen.getByTestId("national-id-input")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-number-input")).toBeInTheDocument();
    expect(screen.getByTestId("gender-select")).toBeInTheDocument();
    expect(screen.getByTestId("relationship-select")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<DependantDetailsForm />);

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByTestId("full-name-error")).toHaveTextContent(
        /Full name must be at least 2 characters/i
      );
      expect(screen.getByTestId("date-of-birth-error")).toHaveTextContent(
        /Date of birth is required/i
      );
      expect(screen.getByTestId("national-id-error")).toHaveTextContent(
        /National ID must be at least 6 characters/i
      );
      expect(screen.getByTestId("mobile-number-error")).toHaveTextContent(
        /Mobile number must be at least 10 digits/i
      );
      expect(screen.getByTestId("gender-error")).toHaveTextContent(
        /Please select a gender/i
      );
      expect(screen.getByTestId("relationship-error")).toHaveTextContent(
        /Please select a relationship/i
      );
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  // it("dispatches data when valid form is submitted", async () => {
  //   const user = userEvent.setup();
  //   render(<DependantDetailsForm />);

  //   await user.type(
  //     screen.getByTestId("full-name-input") as HTMLInputElement,
  //     "John Doe"
  //   );
  //   await user.type(
  //     screen.getByTestId("national-id-input") as HTMLInputElement,
  //     "12345678"
  //   );
  //   await user.type(
  //     screen.getByTestId("mobile-number-input") as HTMLInputElement,
  //     "0712345678"
  //   );

  //   // Set gender directly with change event
  //   const genderSelect = screen.getByTestId(
  //     "gender-select"
  //   ) as HTMLSelectElement;
  //   fireEvent.change(genderSelect, { target: { value: "female" } });

  //   // Select relationship
  //   const relationshipSelect = screen.getByTestId("relationship-select");
  //   fireEvent.change(relationshipSelect, { target: { value: "child" } });

  //   // Set dob directly to bypass datepicker issues
  //   const dobButton = screen.getByTestId("date-of-birth-button");
  //   fireEvent.click(dobButton); // Open popover
  //   await waitFor(async () => {
  //     const dateButton = await screen.findByRole("button", {
  //       name: new RegExp(`August 6th, 2025`, "i"),
  //     });
  //     await user.click(dateButton);
  //   });

  //   // Debug: Log form field values
  //   console.log("Form field values:", {
  //     fullName: (screen.getByTestId("full-name-input") as HTMLInputElement)
  //       .value,
  //     dob: (screen.getByTestId("date-of-birth-button") as HTMLButtonElement)
  //       .textContent,
  //     nationalId: (screen.getByTestId("national-id-input") as HTMLInputElement)
  //       .value,
  //     mobileNumber: (
  //       screen.getByTestId("mobile-number-input") as HTMLInputElement
  //     ).value,
  //     gender: (screen.getByTestId("gender-select") as HTMLSelectElement).value,
  //     relationship: (
  //       screen.getByTestId("relationship-select") as HTMLSelectElement
  //     ).value,
  //   });

  //   // Submit form
  //   const nextButton = screen.getByTestId("next-button");
  //   await user.click(nextButton);

  //   // Debug: Log mockDispatch calls
  //   await waitFor(
  //     () => {
  //       expect(mockDispatch).toHaveBeenCalledWith({
  //         type: "onBoardingProcess/handlePrincipalAccount",
  //         payload: {
  //           fullName: "John Doe",
  //           dob: expect.stringMatching(/2025-08-06/),
  //           nationalId: "12345678",
  //           mobileNumber: "0712345678",
  //           gender: "female",
  //           relationship: "spouse",
  //         },
  //       });
  //       expect(mockDispatch).toHaveBeenCalledWith(handleNextStep());
  //     },
  //     { timeout: 2000 }
  //   );
  // });

  it("dispatches handlePreviousStep when back button is clicked", () => {
    render(<DependantDetailsForm />);
    fireEvent.click(screen.getByTestId("back-button"));

    expect(mockDispatch).toHaveBeenCalledWith(handlePreviousStep());
  });
});
