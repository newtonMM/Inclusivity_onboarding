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
  // Shared mock data
  const mockState = {
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
      amount: "KSH 100,000",
      isLoading: false,
      isError: false,
    },
  };

  const mockDispatch = jest.fn();
  const mockOnBack = jest.fn();

  // Setup function to initialize mocks
  const setupMocks = (customState = {}) => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ ...mockState, ...customState })
    );
  };

  beforeEach(() => {
    setupMocks();
  });

  it("renders application summary with correct details", () => {
    render(<ReviewSection onBack={mockOnBack} />);

    expect(screen.getByText(/Review Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Type/i)).toBeInTheDocument();
    expect(screen.getByText("legal")).toBeInTheDocument();
    expect(screen.getByText(/Selected Benefit Package/i)).toBeInTheDocument();
    expect(screen.getByText("KSH 100,000")).toBeInTheDocument();
    expect(screen.getByText(/Principal Member/i)).toBeInTheDocument();
    expect(screen.getByText("Alice Doe")).toBeInTheDocument();
    expect(screen.getByText(/Total Annual Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/KSH 300/i)).toBeInTheDocument();
  });

  it("calls onBack callback when Back button is clicked", () => {
    render(<ReviewSection onBack={mockOnBack} />);
    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("dispatches createPolicy with correct payload when Buy Policy is clicked", () => {
    render(<ReviewSection onBack={mockOnBack} />);
    fireEvent.click(screen.getByRole("button", { name: /Buy Policy/i }));

    expect(createPolicy).toHaveBeenCalledWith({
      productType: "legal",
      principal: {
        fullName: "Alice Doe",
        dateOfBirth: "1990-05-15",
        nationalId: "12345678",
        mobileNumber: "0712345678",
        gender: "Female",
        address: "Nairobi, Kenya",
      },
      dependant: {
        fullName: "Dep1 Doe",
        dateOfBirth: "2010-07-22",
        nationalId: "D123456",
        mobileNumber: "0723456789",
        gender: "Male",
        relationship: "Son",
      },
      amount: 300,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it("displays loading spinner and disables buttons when isLoading is true", () => {
    setupMocks({ Onboarding: { ...mockState.Onboarding, isLoading: true } });
    render(<ReviewSection onBack={mockOnBack} />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: "" })).toBeDisabled(); // Buy Policy button with spinner
  });

  it("renders default principal name when principal data is missing", () => {
    setupMocks({
      Onboarding: { ...mockState.Onboarding, principalAccount: {} },
    });
    render(<ReviewSection onBack={mockOnBack} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders correct benefit package for non-legal product type", () => {
    setupMocks({
      Onboarding: { ...mockState.Onboarding, productType: "health" },
    });
    render(<ReviewSection onBack={mockOnBack} />);

    expect(screen.getByText("KSH 150,000")).toBeInTheDocument();
  });
});
