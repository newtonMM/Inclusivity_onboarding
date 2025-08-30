import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewSection } from "@/components/onboarding-workflow/reviewSection";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createPolicy } from "@/thunks/Policy";

// Mock hooks and thunks
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.mock("@/thunks/Policy", () => ({
  createPolicy: jest.fn(),
}));

describe("ReviewSection", () => {
  const mockDispatch = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        Onboarding: {
          productType: "legal",
          principalAccount: {
            fullName: "Alice Doe",
            dateOfBirth: "1990-05-15",
            nationalId: "12345678",
            mobileNumber: "0712345678",
            gender: "Female",
            address: "Nairobi, Kenya",
          },
          dependantDetails: {
            fullName: "Dep1 Doe",
            dateOfBirth: "2010-07-22",
            nationalId: "D123456",
            mobileNumber: "0723456789",
            gender: "Male",
            relationship: "Son",
          },

          isLoading: false,
          isError: false,
        },
      })
    );
    jest.clearAllMocks();
  });

  it("renders summary with product, package, principal, and premium", () => {
    render(<ReviewSection onBack={mockOnBack} />);

    expect(screen.getByText(/Product Type/i)).toBeInTheDocument();
    expect(screen.getByText("legal")).toBeInTheDocument();

    expect(screen.getByText(/Selected Benefit Package/i)).toBeInTheDocument();
    expect(screen.getByText("KSH 100,000")).toBeInTheDocument();

    expect(screen.getByText(/Principal Member/i)).toBeInTheDocument();
    expect(screen.getByText("Alice Doe")).toBeInTheDocument();

    expect(screen.getByText(/Total Annual Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/KSH 300/i)).toBeInTheDocument();
  });

  it("calls onBack when Back button is clicked", () => {
    render(<ReviewSection onBack={mockOnBack} />);
    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("dispatches createPolicy when Buy Policy is clicked", () => {
    render(<ReviewSection onBack={mockOnBack} />);
    fireEvent.click(screen.getByRole("button", { name: /Buy Policy/i }));

    expect(createPolicy).toHaveBeenCalledWith({
      productType: "legal",
      principalAccount: {
        fullName: "Alice Doe",
        dateOfBirth: "1990-05-15",
        nationalId: "12345678",
        mobileNumber: "0712345678",
        gender: "Female",
        address: "Nairobi, Kenya",
      },
      dependantDetails: {
        fullName: "Dep1 Doe",
        dateOfBirth: "2010-07-22",
        nationalId: "D123456",
        mobileNumber: "0723456789",
        gender: "Male",
        relationship: "Son",
      },
      amount: "100,000",
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("shows loading spinner when isLoading is true", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        Onboarding: {
          productType: "legal",
          principalAccount: {
            fullName: "Alice Doe",
            dateOfBirth: "1990-05-15",
            nationalId: "12345678",
            mobileNumber: "0712345678",
            gender: "Female",
            address: "Nairobi, Kenya",
          },
          dependantDetails: {
            fullName: "Dep1 Doe",
            dateOfBirth: "2010-07-22",
            nationalId: "D123456",
            mobileNumber: "0723456789",
            gender: "Male",
            relationship: "Son",
          },
          isLoading: true,
          isError: false,
        },
      })
    );

    render(<ReviewSection onBack={mockOnBack} />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "" }) // button has spinner only
    ).toBeDisabled();
  });
});
