/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductSelection } from "@/components/onboarding-workflow/productSelection";

// mock redux hooks
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// import after mocking
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleProductType,
  handleNextStep,
} from "@/features/handleOboarding.slice";

describe("ProductSelection form", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation(
      (selectorFn) => selectorFn({ Onboarding: { productType: "" } }) // initial state
    );
    jest.clearAllMocks();
  });

  it("renders heading and options", () => {
    render(<ProductSelection />);
    expect(
      screen.getByText(/What Product would you like/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Legal Insurance")).toBeInTheDocument();
    expect(screen.getByText("Medical Cash Plan")).toBeInTheDocument();
  });

  it("shows validation error if no option selected", async () => {
    render(<ProductSelection />);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/please select a product/i)).toBeInTheDocument();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("selects Legal Insurance and dispatches on submit", async () => {
    render(<ProductSelection />);
    fireEvent.click(screen.getByText("Legal Insurance"));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(handleProductType("legal"));
      expect(mockDispatch).toHaveBeenCalledWith(handleNextStep());
    });
  });

  it("selects Medical Cash Plan and dispatches on submit", async () => {
    render(<ProductSelection />);
    fireEvent.click(screen.getByText("Medical Cash Plan"));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(handleProductType("medical"));
      expect(mockDispatch).toHaveBeenCalledWith(handleNextStep());
    });
  });
});
