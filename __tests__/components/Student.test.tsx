import { render } from "@testing-library/react";
import Student from "@components/Student";

describe("Student Component", () => {
  it("renders the student name passed as a prop", () => {
    const studentName = "John Doe";

    const { getByText } = render(<Student name={studentName} />);

    expect(getByText(studentName)).toBeInTheDocument();
  });
});
