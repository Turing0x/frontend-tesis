import { Exercise } from "./exercise.interface";
import { User } from "./user.interface";

export type Solution = {
  _id: string;
  student_id: User;
  exercise_id: Exercise;
  evaluation: number;
  anotations: string;
  file_name: string;
  date: string;
}
