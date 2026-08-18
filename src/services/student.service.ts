import fs from "fs/promises";
import {
  type Students,
  oldStudentsData,
  StudentModel,
} from "../models/students.ts";
import { inputFunction } from "../utils/readline.ts";

import {
  validateId,
  validateName,
  validateEmail,
  validateAge,
  validateCourse,
  validateMarks,
} from "../utils/validation.ts";

export const addStudent = async () => {
  const name: string = await inputFunction("Name:");
  const nameValidation = validateName(name);
  if (!nameValidation.check) {
    return { message: nameValidation.message };
  }

  const email: string = await inputFunction("Email:");
  const emailValidation = validateEmail(email);
  if (!emailValidation.check) {
    return { message: emailValidation.message };
  }

  const age: number = Number(await inputFunction("Age:"));
  const ageValidation = validateAge(age);
  if (!ageValidation.check) {
    return { message: ageValidation.message };
  }

  let course: string = await inputFunction(
    "Courses:\n1. OS, 2. OOP, 3. CN, 4. WEB, 5. DBMS, 6. DSA:\nChoose one of the Courses above:",
  );
  course = course.toUpperCase();
  const courseValidation = validateCourse(course);
  if (!courseValidation.check) {
    return { message: courseValidation.message };
  }

  const marks: number = Number(await inputFunction("Marks:"));
  const marksValidation = validateMarks(marks);
  if (!marksValidation.check) {
    return { message: marksValidation.message };
  }

  const ids: number[] = StudentModel.map((student: Students) => {
    return student.id;
  });
  const index: number = ids.length - 1;

  let id: number;

  if (ids.length === 0) {
    id = 1;
  } else {
    id = ids[index]! + 1;
  }

  const newStudent: Students = { id, name, email, age, course, marks };
  StudentModel.push(newStudent);

  return { message: "Student addded Successfully." };
};

export const viewAllStudents = async () => {
  const allStudents: Students[] = StudentModel.map((students: Students) => {
    return students;
  });
  return { message: "Student List:", studentList: allStudents };
};

export const findStudent = async () => {
  const studentId: number = Number(await inputFunction("Enter Student id:"));
  const idValidation = validateId(studentId);
  if (!idValidation.check) {
    return { message: idValidation.message };
  }

  const requiredStudent: Students = StudentModel.find((student: Students) => {
    return student.id === studentId;
  });

  if (!requiredStudent) {
    return { message: "Student doesnt Exist" };
  }

  return {
    message: "Student found Successfully",
    studentList: requiredStudent,
  };
};

export const updateStudent = async () => {
  const studentId: number = Number(await inputFunction("Enter Student id:"));
  const idValidation = validateId(studentId);
  if (!idValidation.check) {
    return { message: idValidation.message };
  }
  const index: number = StudentModel.findIndex((student: Students) => {
    return student.id === studentId;
  });
  if (index === -1) {
    return { message: "Student doesnt Exist" };
  }
  console.log(StudentModel[index]);

  let name: string = StudentModel[index].name;
  let email: string = StudentModel[index].email;
  let age: number = StudentModel[index].age;
  let course: string = StudentModel[index].course;
  let marks: number = StudentModel[index].marks;
  while (true) {
    console.log(
      "Which fields would you like to edit.\n1.Name, 2. Email, 3.Age, 4.CourseName, 5.Marks, 6. Done",
    );
    const choice: number = Number(await inputFunction("Choose a Number:"));
    if (choice === 1) {
      name = await inputFunction(`Name(${name}):`);
      const nameValidation = validateName(name);
      if (!nameValidation.check) {
        return { message: nameValidation.message };
      }
    }
    if (choice === 2) {
      email = await inputFunction(`Email(${email}):`);
      const emailValidation = validateEmail(email);
      if (!emailValidation.check) {
        return { message: emailValidation.message };
      }
    }
    if (choice === 3) {
      age = Number(await inputFunction(`Age(${age}):`));
      const ageValidation = validateAge(age);
      if (!ageValidation.check) {
        return { message: ageValidation.message };
      }
    }
    if (choice === 4) {
      course = await inputFunction(
        `Courses:\n1. OS, 2. OOP, 3. CN, 4. WEB, 5. DBMS, 6. DSA:\nChoose one of the Courses above.\nCourse Name:(${course}):`,
      );
      course = course.toUpperCase();
      const courseValidation = validateCourse(course);
      if (!courseValidation.check) {
        return { message: courseValidation.message };
      }
    }
    if (choice === 5) {
      marks = Number(await inputFunction(`Marks(${marks}):`));
      const marksValidation = validateMarks(marks);
      if (!marksValidation.check) {
        return { message: marksValidation.message };
      }
    }
    if (choice === 6) break;
    if (choice < 1 || choice > 6) {
      console.log("Invalid Choice");
    }
  }

  const updatedStudent: Students = {
    id: studentId,
    name,
    email,
    age,
    course,
    marks,
  };

  StudentModel[index] = updatedStudent;
  return { message: "Student updated Successfully" };
};

export const deleteStudent = async () => {
  const studentId = Number(await inputFunction("Enter Student id:"));
  const idValidation = validateId(studentId);
  if (!idValidation.check) {
    return { message: idValidation.message };
  }

  const index: number = StudentModel.findIndex((student: Students) => {
    return student.id === studentId;
  });
  if (index === -1) {
    return { message: "Student doesnt Exist" };
  }

  console.log(
    `Would you like to Delete ${JSON.stringify(StudentModel[index])}?\n Type yes to comfirm.`,
  );
  const choice: string = await inputFunction("");
  if (choice.toLowerCase() === "yes") {
    StudentModel.splice(index, 1);
    return { message: "Student deleted Successfully" };
  }
  return { message: "Student deletion Cancelled" };
};

export const searchStudent = async () => {
  console.log(
    "Which fields would you like to edit.\n1.Name, 2. Email, 3.CourseName",
  );
  const choice: number = Number(await inputFunction("Choose a Number:"));
  if (choice === 1) {
    const name: string = await inputFunction("Name:");
    const nameValidation = validateName(name);
    if (!nameValidation.check) {
      return { message: nameValidation.message };
    }
    const studentsData: Students[] = StudentModel.filter(
      (student: Students) => {
        return student.name.toLowerCase() === name.toLocaleLowerCase();
      },
    );
    return { message: `Students with name: ${name}`, students: studentsData };
  }
  if (choice === 2) {
    const email: string = await inputFunction("Email:");
    const emailValidation = validateEmail(email);
    if (!emailValidation.check) {
      return { message: emailValidation.message };
    }

    const studentsData: Students[] = StudentModel.filter(
      (student: Students) => {
        return student.email === email;
      },
    );
    return { message: `Students with email: ${email}`, students: studentsData };
  }
  if (choice === 3) {
    let course: string = await inputFunction("Course Name:");
    course = course.toUpperCase();
    const courseValidation = validateCourse(course);
    if (!courseValidation.check) {
      return { message: courseValidation.message };
    }
    const studentsData: Students[] = StudentModel.filter(
      (student: Students) => {
        return student.course === course;
      },
    );
    return {
      message: `Students with course: ${course}`,
      studentList: studentsData,
    };
  }
};

export const filterStudent = async () => {
  console.log(
    "Choose one of the Courses to filter Students:\n 1. OS, 2. OOP, 3. CN, 4. WEB, 5. DBMS, 6. DSA",
  );
  let course: string = await inputFunction("Course Name:");
  course = course.toUpperCase();
  const courseValidation = validateCourse(course);
  if (!courseValidation.check) {
    return { message: courseValidation.message };
  }

  if (
    course !== "OS" &&
    course !== "OOP" &&
    course !== "CN" &&
    course !== "WEB" &&
    course !== "DBMS" &&
    course !== "DSA"
  ) {
    return { message: "Choose One of the Existing Courses" };
  }
  const studentData: { name: string; course: string; result: string }[] =
    StudentModel.filter((student: Students) => {
      return student.course === course;
    }).map((student: Students) => {
      let result: string;

      if (student.marks >= 40) {
        result = "pass";
      } else {
        result = "fail";
      }
      return { name: student.name, course: student.course, result: result };
    });

  return {
    message: `Students with course, ${course}:`,
    studentList: studentData,
  };
};

export const studentStatistics = async () => {
  if (StudentModel.length === 0) {
    return { message: "Student List is Empty" };
  }

  let sumOfMarks: number = 0;
  let totalStudents: number = 0;
  let avgMarks: number = 0;
  let highestMarks: number = StudentModel[0].marks;
  let lowestMark: number = StudentModel[0].marks;
  let passedStudents: number = 0;
  let failedStudents: number = 0;

  StudentModel.forEach((student: Students) => {
    sumOfMarks += student.marks;
    totalStudents++;
    if (highestMarks < student.marks) {
      highestMarks = student.marks;
    }
    if (lowestMark > student.marks) {
      lowestMark = student.marks;
    }
    if (student.marks >= 40) {
      passedStudents++;
    }
    if (student.marks < 40) {
      failedStudents++;
    }
  });
  avgMarks = sumOfMarks / totalStudents;
  const studentStatistics = {
    avgMarks,
    highestMarks,
    lowestMark,
    passedStudents,
    failedStudents,
  };

  return {
    message: "Student Statistics:",
    studentStatistics: studentStatistics,
  };
};

export const sortStudent = async () => {
  console.log("Would you like to sort students by, \n1. Name, 2. Marks");
  const sortBy: number = Number(await inputFunction("Choose a Number:"));
  if (sortBy === 1) {
    console.log("Would you like to sort in, \n1. Ascending, 2. Descending");
    const sortIn: number = Number(await inputFunction("Choose a Number:"));
    if (sortIn === 1) {
      const sortedStudents: Students[] = [...StudentModel].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return {
        message: "Students sorted by Name in Ascending order:",
        studentList: sortedStudents,
      };
    } else if (sortIn === 2) {
      const sortedStudents: Students[] = [...StudentModel].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      return {
        message: "Students sorted by Name in Descending order:",
        studentList: sortedStudents,
      };
    } else {
      return { message: "Wrong Choice" };
    }
  } else if (sortBy === 2) {
    console.log("Would you like to sort in, \n1. Ascending, 2. Descending");
    const sortIn: number = Number(await inputFunction("Choose a Number:"));
    if (sortIn === 1) {
      const sortedStudents: Students[] = [...StudentModel].sort((a, b) => {
        return a.marks - b.marks;
      });
      return {
        message: "Students sorted by Marks in Ascending order:",
        studentList: sortedStudents,
      };
    } else if (sortIn === 2) {
      const sortedStudents: Students[] = [...StudentModel].sort((a, b) => {
        return b.marks - a.marks;
      });
      return {
        message: "Students sorted by Marks in Descending order:",
        studentList: sortedStudents,
      };
    } else {
      return { message: "Wrong Choice" };
    }
  } else {
    return { message: "Wrong Choice" };
  }
};

export const saveToFile = async () => {
  if (JSON.stringify(StudentModel) === JSON.stringify(oldStudentsData)) {
    return {
      message: "There are no changes to save",
    };
  }

  await fs.writeFile(
    "src/database.json",
    JSON.stringify(StudentModel, null, 2),
    "utf-8",
  );

  return {
    message: "Changes saved successfully",
  };
};
