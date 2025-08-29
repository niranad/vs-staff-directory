'use client';

import { GradeLevelProvider } from "@/context/gradeLevel/gradeLevel.context";
import { SnackBarProvider } from "@/context/snackbar/snackbar.context";
import { StaffProvider } from "@/context/staff/staff.context";
import StaffDirectory from "@/features/StaffManagement/StaffDirectory";

export default function Home() {
  return (
    <SnackBarProvider>
      <StaffProvider>
        <GradeLevelProvider>
          <StaffDirectory />
        </GradeLevelProvider>
      </StaffProvider>
    </SnackBarProvider>
  );
}
