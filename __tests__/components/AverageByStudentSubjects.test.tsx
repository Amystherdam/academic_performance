import { render, screen, waitFor } from "@testing-library/react";
import AverageByStudentSubjects from "@components/AverageByStudentSubjects";
import { useParams } from "react-router";
import api from "@services/Api";
import { AxiosError } from "axios";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

jest.mock("@services/Api", () => ({
  get: jest.fn(),
}));

describe("AverageByStudentSubjects", () => {
  it("should show loading initially", async () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    await waitFor(() => {
      render(<AverageByStudentSubjects />);
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display data when API call is successful", async () => {
    const mockData = [
      {
        student_id: 123,
        student_name: "John",
        subject_name: "Math",
        obtained: 90,
      },
      {
        student_id: 123,
        student_name: "Doe",
        subject_name: "Science",
        obtained: 85,
      },
    ];

    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    await waitFor(() => {
      render(<AverageByStudentSubjects />);
    });

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText(/john/i)).toBeInTheDocument();
    expect(screen.getByText(/math/i)).toBeInTheDocument();
    expect(screen.getByText(/90/i)).toBeInTheDocument();
  });

  it("should display an error message if the API call fails", async () => {
    const errorMessage = "Something went wrong";
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });

    (api.get as jest.Mock).mockRejectedValueOnce(new AxiosError(errorMessage));

    await waitFor(() => {
      render(<AverageByStudentSubjects />);
    });

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should display 'Average by subjects are not calculated' if no data is returned", async () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    await waitFor(() => {
      render(<AverageByStudentSubjects />);
    });

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(
      screen.getByText(/average by subjects are not calculated/i)
    ).toBeInTheDocument();
  });
});
