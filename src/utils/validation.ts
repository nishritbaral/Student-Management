import type { Students } from "../models/students.js";

export const validateUserData = (data: Students) => {
  const emailRegex = /^.+@.+\..+$/;

  if (typeof data.name !== "string") console.error("Name cannot be a Number");

  if (typeof data.email !== "string") console.error("Email cannot be a Number");
  if (!emailRegex.test(data.email)) console.error("Not a Valid Email");

  if (typeof data.age !== "number" || data.age <= 8)
    console.error("Age cannot be less than 8");

  if (typeof data.course !== "string")
    console.error("Course cannot be a number");

  if (typeof data.marks !== "number") console.error("Marks should be a Number");
};

