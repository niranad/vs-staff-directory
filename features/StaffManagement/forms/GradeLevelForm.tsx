import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { GradeLevel } from "@/model/GradeLevel";
import { useGradeLevelContext } from "@/context/gradeLevel/gradeLevel.context";
import { useGradeLevelForm } from "../hooks/useGradeLevelForm";
import { useSnackBarContext } from "@/context/snackbar/snackbar.context";

export function GradeLevelForm() {
  const { 
    updateGradeLevel, 
    createGradeLevel, 
    toggleLevelFlipped,
    flippedSideState,
    currentGradeLevel,
  } = useGradeLevelContext();
  const { formState, control, reset, trigger, getValues } = useGradeLevelForm();
  const { openSnackBar } = useSnackBarContext();

  const handleSave = useCallback(async () => {
    const isValid = await trigger();
    if (!isValid) {
      openSnackBar({message: "Please fix the errors in the form.", severity: "error"});
      return;
    } else {
      if (!getValues("id")) {
        createGradeLevel(getValues() as GradeLevel);
      } else {
        updateGradeLevel(getValues() as GradeLevel);
        console.log("I am called")
      }
      reset();
      openSnackBar({message: "Grade level saved successfully!", severity: "success"});
      toggleLevelFlipped();
    }
  }, [])
  const handleCancel = () => {
    reset();
    toggleLevelFlipped();
  }

  useEffect(() => {
    if (["view", "edit"].includes(flippedSideState) && currentGradeLevel !== null) {
      reset(currentGradeLevel);
    }
    if (flippedSideState === "create") reset();
  }, [flippedSideState, currentGradeLevel, reset])

  return (
    <Box className="flex flex gap-4 w-full">
      <Grid container spacing={4} className="w-full">
        <Grid size={{xs: 12, md: 6}}>
          <Box className="w-full">
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left" gutterBottom>
                    Level
                  </Typography>
                  <TextField
                    {...field}
                    label="Level"
                    error={Boolean(formState.errors.level)}
                    helperText={formState.errors.level?.message}
                    variant="outlined"
                    fullWidth
                    disabled={flippedSideState === "view"}
                  />
                </Box>
              )}
            ></Controller>
          </Box>
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
          <Box className="w-full">
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Box className="flex flex-col gap-2 w-full">
                  <Typography component="p" className="text-left" gutterBottom>
                    Sort
                  </Typography>
                  <TextField
                    {...field}
                    type="number"
                    label="Sort"
                    error={Boolean(formState.errors.sort)}
                    helperText={formState.errors.sort?.message}
                    variant="outlined"
                    fullWidth
                    disabled={flippedSideState === "view"}
                  />
                </Box>
              )}
            ></Controller>
          </Box>
        </Grid>
        {
          flippedSideState !== "view" ? (
            <Grid size={{xs: 12}}>
              <Box className="flex justify-center items-center gap-8 mt-2">
                <Button variant="outlined" size="medium" color="error" onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" size="medium" className="bg-[#1e1e1e]" onClick={handleSave}>Save</Button>
              </Box>
            </Grid>
          ) : null
        }
      </Grid>
    </Box>
  );
}