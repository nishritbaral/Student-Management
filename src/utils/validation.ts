import type { Students } from "../models/students.js";

export const validateUserData = (data: Students) => {
  const emailRegex = /^.+@.+\..+$/;

  if (typeof data.name !== "string") {
    return {
      check: false,
      message: "Name must be a string",
    };
  }

  if (typeof data.email !== "string") {
    return {
      check: false,
      message: "Email must be a string",
    };
  }

  if (!emailRegex.test(data.email)) {
    return {
      check: false,
      message: "Not a valid email",
    };
  }

  if (typeof data.age !== "number" || data.age <= 8) {
    return {
      check: false,
      message: "Age must be greater than 8",
    };
  }

  if (typeof data.course !== "string") {
    return {
      check: false,
      message: "Course must be a string",
    };
  }

  if (typeof data.marks !== "number") {
    return {
      check: false,
      message: "Marks must be a number",
    };
  }

  return {
    check: true,
    message: "Student data is valid",
  };
};
