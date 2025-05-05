import { Student } from "@/types";
import React from "react";
import { Text } from "react-native";

type Props = {
  students: Student[];
};

const StudentCount: React.FC<Props> = ({ students }) => {
  return <Text testID="student-count">Total Students: {students.length}</Text>;
};

export default StudentCount;
