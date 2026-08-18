import type { Students } from "../models/students.js";

export const validateId = (id: Students["id"]) => {
  if (typeof id !== "number" || Number.isNaN(id) || id <= 0) {
    return {
      check: false,
      message: "ID must be a number greater than 0",
    };
  }

  return {
    check: true,
    message: "ID is valid",
  };
};

export const validateName = (name: Students["name"]) => {
  if (typeof name !== "string") {
    return {
      check: false,
      message: "Name must be a string",
    };
  }

  return {
    check: true,
    message: "Name is valid",
  };
};

export const validateEmail = (email: Students["email"]) => {
  const emailRegex = /^.+@.+\..+$/;

  if (typeof email !== "string") {
    return {
      check: false,
      message: "Email must be a string",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      check: false,
      message: "Not a valid email",
    };
  }

  return {
    check: true,
    message: "Email is valid",
  };
};

export const validateAge = (age: Students["age"]) => {
  if (typeof age !== "number" || age <= 8) {
    return {
      check: false,
      message: "Age must be greater than 8",
    };
  }

  return {
    check: true,
    message: "Age is valid",
  };
};

export const validateCourse = (course: Students["course"]) => {
  const courses = ["OS", "OOP", "CN", "WEB", "DBMS", "DSA"];

  if (typeof course !== "string") {
    return {
      check: false,
      message: "Course must be a string",
    };
  }

  if (!courses.includes(course)) {
    return {
      check: false,
      message: "Please choose a valid course",
    };
  }

  return {
    check: true,
    message: "Course is valid",
  };
};

export const validateMarks = (marks: Students["marks"]) => {
  if (typeof marks !== "number" || Number.isNaN(marks) || marks <= 0) {
    return {
      check: false,
      message: "Marks must be a number",
    };
  }

  return {
    check: true,
    message: "Marks are valid",
  };
};
