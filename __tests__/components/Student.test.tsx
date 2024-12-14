import { render, waitFor } from "@testing-library/react";
import Students from "@components/Students";
import api from "@services/Api";

// Mock do módulo de API
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
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const { findByText, getByText } = render(<Students />);

    expect(getByText(/loading/i)).toBeInTheDocument();

    expect(await findByText(/Query error/i)).toBeInTheDocument();
  });
});
