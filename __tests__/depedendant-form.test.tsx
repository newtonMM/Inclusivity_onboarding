import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DependantDetails from "@/components/onboarding-workflow/dependantDetails";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleDependants,
  handleNextStep,
  handlePreviousStep,
} from "@/features/handleOboarding.slice";

// --- mocks ---
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

describe("DependantDetails form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({});
  });

  it("renders all input fields", () => {
    render(<DependantDetails />);

    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/National ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Date Of Birth/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Relationship/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("dispatches dependants data on valid submit", async () => {
    const user = userEvent.setup();
    render(<DependantDetails />);

    await user.type(screen.getByPlaceholderText(/Full Name/i), "Jane Doe");

    // open calendar and pick today
    await user.click(screen.getByText(/Date Of Birth/i));
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const dayButton = screen.getByRole("button", { name: new RegExp(today) });
    await user.click(dayButton);

    await user.type(screen.getByPlaceholderText(/National ID/i), "87654321");
    await user.type(
      screen.getByPlaceholderText(/Mobile Number/i),
      "0712345678"
    );

    // gender select
    await user.click(screen.getByRole("combobox", { name: /Gender/i }));
    await user.click(await screen.findByRole("option", { name: /Female/i }));

    // relationship select
    await user.click(screen.getByRole("combobox", { name: /Relationship/i }));
    await user.click(await screen.findByRole("option", { name: /Child/i }));

    // submit
    await user.click(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        handleDependants(
          expect.objectContaining({
            fullName: "Jane Doe",
            nationalId: "87654321",
            dateOfBirth: expect.any(String),
            mobileNumber: "0712345678",
            gender: "female",
            relationship: "child",
          })
        )
      );
      expect(mockDispatch).toHaveBeenCalledWith(handleNextStep());
    });
  });

  it("dispatches previous step on Back button", async () => {
    const user = userEvent.setup();
    render(<DependantDetails />);

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(mockDispatch).toHaveBeenCalledWith(handlePreviousStep());
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<DependantDetails />);

    // Click next without filling fields
    await user.click(screen.getByRole("button", { name: /next/i }));

    // Assert validation errors from zod schema
    expect(
      await screen.findByText(/Full name must be at least 2 characters\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Date of birth is required\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/National ID must be at least 6 characters\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Mobile number must be at least 10 digits\./i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Please select a gender\./i)).toBeInTheDocument();

    expect(
      screen.getByText(/Please select a relationship\./i)
    ).toBeInTheDocument();
  });
});
