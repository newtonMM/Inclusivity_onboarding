/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  logRoles,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserDetailsForm from "@/components/onboarding-workflow/principleDetails";

// mock redux hooks
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// import after mocking
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

    expect(screen.getByPlaceholderText(/Full Names/i)).toBeInTheDocument();
    expect(screen.getByText(/Date Of Birth/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/National ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Address/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<UserDetailsForm />);

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

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
        screen.getByText(/Gender must be at least 2 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Address must be at least 2 characters/i)
      ).toBeInTheDocument();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  //   it("dispatches data when valid form is submitted", async () => {
  //     const user = userEvent.setup();
  //     render(<UserDetailsForm />);

  //     await user.type(screen.getByPlaceholderText(/Full Names/i), "John Doe");

  //     // Open datepicker and pick a date
  //     await user.click(screen.getByText(/Date Of Birth/i));
  //     await user.click(screen.getByRole("button", { name: /August 6th, 2025/i }));

  //     await user.type(screen.getByPlaceholderText(/National ID/i), "12345678");
  //     await user.type(
  //       screen.getByPlaceholderText(/Mobile Number/i),
  //       "0712345678"
  //     );

  //     const combo = screen.getByRole("combobox");
  //     await user.click(combo);

  //     const femaleOption = await screen.findByRole("option", { name: /Female/i });
  //     await user.click(femaleOption);

  //     await user.type(screen.getByPlaceholderText(/Address/i), "123 Main St");

  //     await user.click(screen.getByRole("button", { name: /next/i }));

  //     await waitFor(() => {
  //       expect(mockDispatch).toHaveBeenCalledWith(
  //         handlePrincipalAccount(
  //           expect.objectContaining({
  //             fullName: expect.any(String),
  //             dob: expect.any(String),
  //             nationalId: expect.any(String),
  //             gender: expect.any(String),
  //             address: expect.any(String),
  //             mobileNumber: expect.any(String),
  //           })
  //         )
  //       );
  //       expect(mockDispatch).toHaveBeenCalledWith(handleNextStep());
  //     });
  //   });

  it("dispatches handlePreviousStep when back button is clicked", () => {
    render(<UserDetailsForm />);
    fireEvent.click(screen.getByRole("button", { name: /back/i }));

    expect(mockDispatch).toHaveBeenCalledWith(handlePreviousStep());
  });
});
