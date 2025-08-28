import { GradeLevel } from "./GradeLevel";

export interface Staff {
  id: string;
  name: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevel: GradeLevel | null;
}