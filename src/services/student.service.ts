import { inputFunction } from "../utils/readline.ts";

export const addStudent = async () => {
  const studentName = await inputFunction("Student Name:");
  return `Student ${studentName}`;
};

export const viewAllStudents = async () => {
  return `viewAllStudents`;
};

export const findStudent = async () => {
  return `findStudent`;
};

export const updateStudent = async () => {
  return `update student`;
};

export const deleteStudent = async () => {
  return `delete student`;
};

export const searchStudent = async () => {
  return `search`;
};

export const filterStudent = async () => {
  return `filter`;
};

export const studentStatistics = async () => {
  return `statistics`;
};

export const sortStudent = async () => {
  return `sort`;
};

export const saveToFile = async () => {
  return `save`;
};
