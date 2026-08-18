import fs from "fs/promises";

export interface Students {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
  marks: number;
}

export const StudentModel: Students[] = [];

export let oldStudentsData: Students[] = [];

export const loadFromFile = async () => {
  try {
    const data = await fs.readFile("src/database.json", "utf-8");

    oldStudentsData = JSON.parse(data);

    StudentModel.push(...oldStudentsData);

    return {
      message: "Students loaded successfully",
    };
  } catch {
    return {
      message: "No student file found",
    };
  }
};
