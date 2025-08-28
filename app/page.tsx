'use client';

import { GradeLevelProvider } from "@/context/gradeLevel/gradeLevel.context";
import { StaffProvider } from "@/context/staff/staff.context";
import StaffDirectory from "@/features/StaffManagement/StaffDirectory";

export default function Home() {
  return (
    <StaffProvider>
      <GradeLevelProvider>
        <StaffDirectory />
      </GradeLevelProvider>
    </StaffProvider>
  );
}
