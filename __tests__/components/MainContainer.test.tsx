import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainContainer from "@components/MainContainer";

// Mock do Outlet
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

    // Verificar se o NavBar foi renderizado
    const navBar = screen.getByTestId("navbar-mock");
    expect(navBar).toBeInTheDocument();

    // Verificar se o Outlet foi renderizado
    const outlet = screen.getByTestId("outlet-mock");
    expect(outlet).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    render(
      <MemoryRouter>
        <MainContainer />
      </MemoryRouter>
    );

    // Verificar se o contêiner principal foi renderizado
    const mainContainer = screen.getByLabelText("main");
    expect(mainContainer).toBeInTheDocument();

    // Verificar se a seção foi renderizada corretamente
    const section = screen.getByLabelText("section");
    expect(section).toBeInTheDocument();
  });
});
