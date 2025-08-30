/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import { useRouter } from "next/navigation";
import React from "react";

jest.mock("next/link", () => {
  // Define the types for the props of the mock component
  const MockedLink: React.FC<{ children: React.ReactNode; href: string }> = ({
    children,
    href,
  }) => {
    return <a href={href}>{children}</a>;
  };
  return MockedLink;
});

// 2. Mock `next/navigation`'s `useRouter` hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Embedded Insurance Solutions/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

describe("Home", () => {
  it("navigates to the purchase-product page when the button is clicked", () => {
    const mockUseRouter = useRouter as jest.Mock;
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    render(<Home />);

    const linkElement = screen.getByRole("link", {
      name: /Issue a Policy/i,
    });

    fireEvent.click(linkElement);

    expect(linkElement).toHaveAttribute("href", "/purchase-product");
    // expect(mockPush).toHaveBeenCalledWith("/purchase-product");
  });
});
