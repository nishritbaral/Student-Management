import {
  addStudent,
  viewAllStudents,
  findStudent,
  updateStudent,
  deleteStudent,
  searchStudent,
  filterStudent,
  studentStatistics,
  sortStudent,
  saveToFile,
} from "../services/student.service.ts";
import { inputFunction, rl } from "./readline.ts";

export const featuresChoice = async () => {
  let continueChoice: number;

  console.log("Student Management System");
  do {
    console.log("Choose a Number for the following operations:");
    console.log(
      " 1. Add Student \n 2. View all Students \n 3. Find Student \n 4. Update Student \n 5. Delete Student \n 6. Search Student \n 7. Filter Student \n 8. Sudent Statistics \n 9. Sort Student \n 10. Save to File \n 0.Exit",
    );

    const choice: number = Number(await inputFunction("Enter a Choice:"));

    switch (choice) {
      case 0:
        console.log("Program Exited Successfully");
        rl.close();
        process.exit(1);
        break;

      case 1: {
        const output: { message: string } = await addStudent();
        console.log(output);
        break;
      }

      case 2: {
        const output: { message: string } = await viewAllStudents();
        console.log(output);
        break;
      }

      case 3: {
        const output: { message: string } = await findStudent();
        console.log(output);
        break;
      }

      case 4: {
        const output: { message: string } = await updateStudent();
        console.log(output);
        break;
      }

      case 5: {
        const output: { message: string }= await deleteStudent();
        console.log(output);
        break;
      }

      case 6: {
        const output: { message: string } = await searchStudent();
        console.log(output);
        break;
      }

      case 7: {
        const output: { message: string } = await filterStudent();
        console.log(output);
        break;
      }

      case 8: {
        const output: { message: string } = await studentStatistics();
        console.log(output);
        break;
      }

      case 9: {
        const output: { message: string } = await sortStudent();
        console.log(output);
        break;
      }

      case 10: {
        const output: { message: string } = await saveToFile();
        console.log(output);
        break;
      }
      default:
        console.log("Invalid choice");
    }
    continueChoice = Number(await inputFunction("Enter 1 to continue:"));
  } while (continueChoice === 1);

  console.log("Program Exited Successfully");

  rl.close();
};
