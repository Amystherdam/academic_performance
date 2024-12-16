import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "@components/NavBar";
import { useNavigate } from "react-router";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

const user = userEvent.setup();

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

  it("should navigate to the correct path on button click", async () => {
    const paths = [
      { label: "Home", path: "/home" },
      { label: "About", path: "/about" },
    ];

    render(<NavBar paths={paths} />);

    const homeButton = screen.getByRole("button", { name: /home/i });

    await waitFor(async () => {
      await user.click(homeButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/home");

    const aboutButton = screen.getByRole("button", { name: /about/i });

    await waitFor(async () => {
      await user.click(aboutButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/about");
  });

  it("should not call navigate if no path is provided", () => {
    const paths = [];

    render(<NavBar paths={paths} />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
