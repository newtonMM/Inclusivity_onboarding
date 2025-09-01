/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserDetailsForm from "@/components/onboarding-workflow/principleDetails";

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
  handlePrincipalAccount,
} from "@/features/handleOboarding.slice";

describe("UserDetailsForm", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ Onboarding: { principalAccount: null } })
    );

    jest.clearAllMocks();
  });

  it("renders form fields", () => {
    render(<UserDetailsForm />);

    expect(screen.getByTestId("full-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("dob-button")).toBeInTheDocument();
    expect(screen.getByTestId("national-id-input")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-number-input")).toBeInTheDocument();
    expect(screen.getByTestId("gender-select")).toBeInTheDocument();
    expect(screen.getByTestId("address-input")).toBeInTheDocument();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<UserDetailsForm />);

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Full name must be at least 2 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Date of birth must be at least 6 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/National ID must be at least 8 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Mobile number must be at least 10 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Gender must be at least 4 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Address must be at least 2 characters/i)
      ).toBeInTheDocument();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("dispatches data when valid form is submitted", async () => {
    const user = userEvent.setup();
    render(<UserDetailsForm />);

    // Fill in form fields
    await user.type(
      screen.getByTestId("full-name-input") as HTMLInputElement,
      "John Doe"
    );
    await user.type(
      screen.getByTestId("national-id-input") as HTMLInputElement,
      "12345678"
    );
    await user.type(
      screen.getByTestId("mobile-number-input") as HTMLInputElement,
      "0712345678"
    );
    await user.type(
      screen.getByTestId("address-input") as HTMLInputElement,
      "123 Main St"
    );

    // Set gender directly with change event
    const genderSelect = screen.getByTestId(
      "gender-select"
    ) as HTMLSelectElement;
    fireEvent.change(genderSelect, { target: { value: "female" } });
    await user.click(genderSelect);

    // Set dob directly to bypass datepicker issues
    const dobButton = screen.getByTestId("dob-button");
    fireEvent.click(dobButton); // Open popover
    await waitFor(async () => {
      const dateButton = await screen.findByRole("button", {
        name: new RegExp(`August 6th, 2025`, "i"),
      });
      await user.click(dateButton);
    });

    // Debug: Log form field values
    console.log("Form field values:", {
      fullName: (screen.getByTestId("full-name-input") as HTMLInputElement)
        .value,
      dob: (screen.getByTestId("dob-button") as HTMLButtonElement).textContent,
      nationalId: (screen.getByTestId("national-id-input") as HTMLInputElement)
        .value,
      mobileNumber: (
        screen.getByTestId("mobile-number-input") as HTMLInputElement
      ).value,
      gender: (screen.getByTestId("gender-select") as HTMLSelectElement).value,
      address: (screen.getByTestId("address-input") as HTMLInputElement).value,
    });

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: "onBoardingProcess/handlePrincipalAccount",
          payload: {
            fullName: "John Doe",
            dob: expect.stringMatching(/2025-08-06/),
            nationalId: "12345678",
            mobileNumber: "0712345678",
            gender: "female",
            address: "123 Main St",
          },
        });
        expect(mockDispatch).toHaveBeenCalledWith(handleNextStep());
      },
      { timeout: 2000 }
    );
  });

  it("dispatches handlePreviousStep when back button is clicked", () => {
    render(<UserDetailsForm />);
    fireEvent.click(screen.getByTestId("back-button"));

    expect(mockDispatch).toHaveBeenCalledWith(handlePreviousStep());
  });
});
