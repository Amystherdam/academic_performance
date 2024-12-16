import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Ranking from "@components/Ranking";
import api from "@services/Api";
import { AxiosError, AxiosHeaders } from "axios";

jest.mock("@services/Api", () => ({
  get: jest.fn(),
}));

describe("Ranking Component", () => {
  it("renders loading state initially", () => {
    render(<Ranking />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders error state when API call fails", async () => {
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

    render(<Ranking />);

    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });

  it("renders message when ranking is empty", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<Ranking />);

    await waitFor(() => {
      expect(
        screen.getByText(/Overall average not calculated/i)
      ).toBeInTheDocument();
    });
  });

  it("renders ranking table with data", async () => {
    const mockData = [
      { student_id: 1, student_name: "John Doe", obtained: 95 },
      { student_id: 2, student_name: "Jane Smith", obtained: 90 },
    ];

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<Ranking />);

    await waitFor(() => {
      expect(screen.getByText(/Top Bests/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });

  it("fetches new data when filter buttons are clicked", async () => {
    const mockData = [
      { student_id: 1, student_name: "John Doe", obtained: 95 },
    ];

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    render(<Ranking />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });

    const mockNewData = [
      { student_id: 2, student_name: "Jane Smith", obtained: 90 },
    ];
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockNewData });

    const button = screen.getByText("10");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });
});
