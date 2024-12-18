import { render, screen, waitFor } from "@testing-library/react";
import GradesHistory from "@components/GradesHistory";
import { useParams } from "react-router";
import api from "@services/Api";
import { AxiosError, AxiosHeaders } from "axios";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

jest.mock("@services/Api", () => ({
  get: jest.fn(),
}));

describe("GradesHistory", () => {
  it("should display loading state initially", async () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });

    await waitFor(() => {
      render(<GradesHistory />);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display an error message if the API call fails", async () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });

    (api.get as jest.Mock).mockRejectedValueOnce(
      new AxiosError("Network Error")
    );

    await waitFor(() => {
      render(<GradesHistory />);
    });

    await waitFor(() => {
      expect(screen.getByText("Network Error")).toBeInTheDocument();
    });
  });

  it("should display no history message if gradesHistory is empty", async () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    await waitFor(() => {
      render(<GradesHistory />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("No history registered for this student")
      ).toBeInTheDocument();
    });
  });

  it("should display the grades table when data is fetched successfully", async () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          student_id: 123,
          student_name: "John Doe",
          subject_name: "Math",
          obtained: 85,
        },
      ],
    });
    await waitFor(() => {
      render(<GradesHistory />);
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Math")).toBeInTheDocument();
      expect(screen.getByText("85")).toBeInTheDocument();
    });
  });

  it("should handle error in fetching grades correctly", async () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
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

    render(<GradesHistory />);

    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument();
    });
  });
});
