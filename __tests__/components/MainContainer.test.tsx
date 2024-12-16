import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainContainer from "@components/MainContainer";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Outlet: jest.fn(() => <div data-testid="outlet-mock">Mocked Outlet</div>),
}));

jest.mock("@components/NavBar", () =>
  jest.fn(() => <nav data-testid="navbar-mock">Mocked NavBar</nav>)
);

describe("MainContainer", () => {
  it("renders NavBar with the correct paths", () => {
    render(
      <MemoryRouter>
        <MainContainer />
      </MemoryRouter>
    );

    const navBar = screen.getByTestId("navbar-mock");
    expect(navBar).toBeInTheDocument();

    const outlet = screen.getByTestId("outlet-mock");
    expect(outlet).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    render(
      <MemoryRouter>
        <MainContainer />
      </MemoryRouter>
    );

    const mainContainer = screen.getByLabelText("main");
    expect(mainContainer).toBeInTheDocument();

    const section = screen.getByLabelText("section");
    expect(section).toBeInTheDocument();
  });
});
