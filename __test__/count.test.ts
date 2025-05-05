import { studentStorage } from "@/storage/student";
import { countTotalStudents } from "@/utilities";

describe("countTotalStudents", () => {
  it("should return 0 for empty array", () => {
    expect(countTotalStudents([])).toBe(0);
  });

  it("should return correct count for a list of students", async () => {
    const students = await studentStorage.getStudents();
    expect(countTotalStudents(students)).toBe(students.length);
  });
});
