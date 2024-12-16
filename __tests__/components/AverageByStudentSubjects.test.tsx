import { render, screen, waitFor } from "@testing-library/react";
import AverageByStudentSubjects from "@components/AverageByStudentSubjects"; // Ajuste o caminho do componente conforme necessário
import { useParams } from "react-router";
import api from "@services/Api";
import { AxiosError } from "axios";

// Mocking useParams
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

// Mocking the API call
jest.mock("@services/Api", () => ({
  get: jest.fn(),
}));

describe("AverageByStudentSubjects", () => {
  it("should show loading initially", () => {
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    render(<AverageByStudentSubjects />);

    // Assert that the loading text is displayed
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

    // Mock the API response
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<AverageByStudentSubjects />);

    // Wait for the component to re-render after the API call
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Assert that the data is rendered correctly
    expect(screen.getByText(/john/i)).toBeInTheDocument();
    expect(screen.getByText(/math/i)).toBeInTheDocument();
    expect(screen.getByText(/90/i)).toBeInTheDocument();
  });

  it("should display an error message if the API call fails", async () => {
    const errorMessage = "Something went wrong";
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    // Mock the API to throw an error
    (api.get as jest.Mock).mockRejectedValueOnce(new AxiosError(errorMessage));

    render(<AverageByStudentSubjects />);

    // Wait for the component to display the error
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Assert that the error message is displayed
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should display 'Average by subjects are not calculated' if no data is returned", async () => {
    // Mock the API response to return empty data
    (useParams as jest.Mock).mockReturnValue({ studentId: "123" });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<AverageByStudentSubjects />);

    // Wait for the component to re-render after the API call
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Assert that the message for no data is displayed
    expect(
      screen.getByText(/average by subjects are not calculated/i)
    ).toBeInTheDocument();
  });
});
