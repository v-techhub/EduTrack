import type { Student } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STUDENTS_STORAGE_KEY = "@student_profiles";

export const studentStorage = {
  // Save all students
  saveStudents: async (students: Student[]): Promise<boolean> => {
    try {
      const jsonValue = JSON.stringify(students);
      await AsyncStorage.setItem(STUDENTS_STORAGE_KEY, jsonValue);
      return true;
    } catch (error) {
      console.error("Error saving students:", error);
      return false;
    }
  },

  // Get all students
  getStudents: async (): Promise<Student[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STUDENTS_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error retrieving students:", error);
      return [];
    }
  },

  // Add a single student
  addStudent: async (student: Student): Promise<boolean> => {
    try {
      const students = await studentStorage.getStudents();
      students.push(student);
      await studentStorage.saveStudents(students);
      return true;
    } catch (error) {
      console.error("Error adding student:", error);
      return false;
    }
  },

  // Delete a student
  deleteStudent: async (studentId: string): Promise<boolean> => {
    try {
      const students: Student[] = await studentStorage.getStudents();
      const filteredStudents = students.filter((s) => s.id !== studentId);
      await studentStorage.saveStudents(filteredStudents);
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      return false;
    }
  },
};
