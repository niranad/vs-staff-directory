import { GradeLevel } from "@/model/GradeLevel";
import { Staff } from "@/model/Staff";
import { v4 as uuidv4 } from "uuid";

const STAFF_KEY = "staff-records";
const GRADE_LEVEL_KEY = "grade-levels";

export const localStorageClient = {
  getAllStaff: (): Staff[] => {
    let staff = localStorage.getItem(STAFF_KEY);
    return staff !== null ? JSON.parse(staff) : [];
  },
  getStaffById: (id: string): Staff | null => {
    let staff = localStorage.getItem(STAFF_KEY);
    if (staff !== null) {
      const staffList: Staff[] = JSON.parse(staff);
      return staffList.find(s => s.id === id) || null;
    }
    return null;
  },
  saveStaff: (staffData: Staff) => {
    if (!staffData.id) {
      staffData.id = uuidv4();
    }
    let staff = localStorage.getItem(STAFF_KEY);
    if (staff === null) {
      localStorage.setItem(STAFF_KEY, JSON.stringify([staffData]));
      return;
    }
    const staffList: Staff[] = JSON.parse(staff);
    const existingIndex = staffList.findIndex(s => s.id === staffData.id);
    if (existingIndex !== -1) {
      staffList[existingIndex] = staffData;
    } else {
      staffList.push(staffData);
    }
    localStorage.setItem(STAFF_KEY, JSON.stringify(staffList));
  },
  deleteStaff: (id: string) => {
    const staff = localStorage.getItem(STAFF_KEY);
    if (staff !== null) {
      let staffList: Staff[] = JSON.parse(staff);
      staffList = staffList.filter(s => s.id !== id);
      localStorage.setItem(STAFF_KEY, JSON.stringify(staffList));
    }
  },
  getAllGradeLevels: (): GradeLevel[] => {
    const grades = localStorage.getItem(GRADE_LEVEL_KEY);
    return grades !== null ? JSON.parse(grades) : [];
  },
  getGradeLevelById: (id: string): GradeLevel | null => {
    let gradeLevel = localStorage.getItem(GRADE_LEVEL_KEY);
    if (gradeLevel !== null) {
      const gradeLevels: GradeLevel[] = JSON.parse(gradeLevel);
      return gradeLevels.find(l => l.id === id) || null;
    }
    return null;
  },
  saveGradeLevel: (grade: GradeLevel) => {
    if (!grade.id) {
      grade.id = uuidv4();
    }
    let grades = localStorage.getItem(GRADE_LEVEL_KEY);
    if (grades === null) {
      localStorage.setItem(GRADE_LEVEL_KEY, JSON.stringify([grade]));
      return;
    }
    const gradeList: GradeLevel[] = JSON.parse(grades);
    const existingIndex = gradeList.findIndex(g => g.id === grade.id);
    if (existingIndex !== -1) {
      gradeList[existingIndex] = grade;
    } else {
      gradeList.push(grade);
      localStorage.setItem(GRADE_LEVEL_KEY, JSON.stringify(gradeList));
    }
  },
  deleteGradeLevel: (id: string) => {
    let grades = localStorage.getItem(GRADE_LEVEL_KEY);
    if (grades !== null) {
      let gradeList: GradeLevel[] = JSON.parse(grades);
      gradeList = gradeList.filter(g => g.id !== id);
      localStorage.setItem(GRADE_LEVEL_KEY, JSON.stringify(gradeList));
    }
  }
}