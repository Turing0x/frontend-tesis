import { Exercise } from "./exercise.interface";

export type User = {
  _id?: string;
  full_name: string;
  email: string;
  group: string;
  password: string;
  type: string;
  pending_exercises?: Exercise[];
}
