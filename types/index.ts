import { studentSchema } from "@/utilities/validation";
import { z } from "zod";

enum EnrollmentStatus {
  enrolled = "Enrolled",
  graduated = "Graduated",
  alumni = "Alumni",
}

type Student = {
  id: string;
  email: string;
  name: string;
  enrollmentStatus: EnrollmentStatus;
  profilePhoto: string;
  gender: "male" | "female";
};

type StudentFormData = z.infer<typeof studentSchema>;

export { Student, StudentFormData };
