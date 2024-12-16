import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "@components/NavBar";
import { useNavigate } from "react-router";

// Mock do useNavigate
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("NavBar Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("should render all paths passed as props", () => {
    const paths = [
      { label: "Home", path: "/home" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ];

    render(<NavBar paths={paths} />);

    paths.forEach((path) => {
      expect(screen.getByText(path.label)).toBeInTheDocument();
    });
  });

  it("should navigate to the correct path on button click", () => {
    const paths = [
      { label: "Home", path: "/home" },
      { label: "About", path: "/about" },
    ];

    render(<NavBar paths={paths} />);

    // Simular clique no botão "Home"
    const homeButton = screen.getByRole("button", { name: /home/i });
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/home");

    // Simular clique no botão "About"
    const aboutButton = screen.getByRole("button", { name: /about/i });
    fireEvent.click(aboutButton);

    expect(mockNavigate).toHaveBeenCalledWith("/about");
  });

  it("should not call navigate if no path is provided", () => {
    const paths = [];

    render(<NavBar paths={paths} />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
