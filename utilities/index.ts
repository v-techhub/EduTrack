import type { Student } from "@/types";

export function userAvatar(gender: "male" | "female") {
  let avatar: any;
  switch (gender) {
    case "male":
      avatar = require("@/assets/images/maleavatar.jpg");
    default:
      avatar = require("@/assets/images/femaleAvatar.jpg");
      break;
  }
  return avatar;
}

export const countTotalStudents = (students: Student[]): number => {
  return students.length;
};
