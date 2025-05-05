import endpoints from "@/constants/endpoints";
import { studentStorage } from "@/storage/student";
import { Student } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: URL,
});

export const useGetStudents = () => {
  const [data, setData] = useState<Student[]>([]);

  async function getStudents(): Promise<void> {
    try {
      const data = await studentStorage.getStudents();
      setData(data);
    } catch (error) {
      console.log("error fetching students data => ", error);
    }
  }
  useEffect(() => {
    getStudents();
  }, []);
  return { data, getStudents };
};

export const useCreateStudent = () => {
  async function createStudent(payload: Student): Promise<any> {
    try {
      await axiosInstance({
        url: endpoints.STUDENT,
        method: "POST",
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await studentStorage.addStudent(payload);
    } catch (error) {
      console.log("error creating student => ", error);
    }
  }
  return { createStudent };
};

export const useDeleteStudent = () => {
  async function deleteStudent(payload: Student): Promise<any> {
    try {
      await axiosInstance({
        url: `${endpoints.STUDENT}/${payload.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await studentStorage.deleteStudent(payload.id);
    } catch (error) {
      console.log("error creating student => ", error);
    }
  }
  return { deleteStudent };
};
