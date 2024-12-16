import { render, waitFor } from "@testing-library/react";
import Students from "@components/Students";
import api from "@services/Api";
import { AxiosError, AxiosHeaders } from "axios";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("@services/Api", () => ({
  get: jest.fn(),
}));

const mockStudents = [{ name: "John Doe" }, { name: "Jane Doe" }];

describe("Students Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading and data", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockStudents });

    const { getByText, findByText } = render(<Students />);

    expect(getByText(/loading/i)).toBeInTheDocument();

    expect(await findByText(/john doe/i)).toBeInTheDocument();
    expect(await findByText(/jane doe/i)).toBeInTheDocument();
  });

  it("renders students after fetching data", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockStudents });

    const { getByText } = render(<Students />);

    await waitFor(() => {
      expect(getByText("John Doe")).toBeInTheDocument();
      expect(getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  it("handles API errors", async () => {
    const request = { path: "/foo" };
    const headers = new AxiosHeaders();
    const config = {
      url: "http://localhost:3000",
      headers,
    };
    const error = new AxiosError("Boom!", "ESOMETHING", config, request, {
      status: 200,
      data: { errors: [{ title: "API Error" }] },
      statusText: "ok",
      config,
      headers,
    });

    (api.get as jest.Mock).mockRejectedValueOnce(error);

    const { findByText, getByText } = render(<Students />);

    expect(getByText(/loading/i)).toBeInTheDocument();

    expect(await findByText(/API Error/i)).toBeInTheDocument();
  });
});
