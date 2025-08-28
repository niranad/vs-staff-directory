import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCallback, useState } from "react";
import { GradeLevel } from "@/model/GradeLevel";
import { useGradeLevelContext } from "@/context/gradeLevel/gradeLevel.context";
import { useGradeLevelForm } from "../hooks/useGradeLevelForm";

export function GradeLevelForm() {
  const { updateGradeLevel, createGradeLevel, toggleLevelFlipped } = useGradeLevelContext();
  const { isValid, control, getValues } = useGradeLevelForm();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleSave = useCallback(() => {
    if (!isValid) {
      setMessage("Please fix the errors in the form.");
      setHasError(true);
      setOpen(true);
      return;
    } else {
      if (!getValues("id")) {
        createGradeLevel(getValues() as GradeLevel);
      } else {
        updateGradeLevel(getValues() as GradeLevel);
      }
      setMessage("Grade level saved successfully!");
    }
  }, [])

  return (
    <Box className="flex flex gap-4 w-full">
      <Grid container spacing={2} className="w-full">
        <Grid size={{xs: 6, md: 4}}>
          <Box className="w-full">
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p">
                    Level
                  </Typography>
                  <TextField
                    {...field}
                    label="Level"
                    variant="outlined"
                    fullWidth
                    margin="none"
                  />
                </Box>
              )}
            ></Controller>
          </Box>
        </Grid>
        <Grid size={{xs: 6, md: 4}}>
          <Box className="w-full">
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Box className="flex flex-col gap-2 w-full">
                  <Typography component="p">
                    Sort
                  </Typography>
                  <TextField
                    {...field}
                    type="number"
                    label="Role"
                    variant="outlined"
                    fullWidth
                    margin="none"
                  />
                </Box>
              )}
            ></Controller>
          </Box>
        </Grid>
        <Grid size={{xs: 12}}>
          <Box className="flex justify-center items-center gap-8 mt-2">
            <Button variant="outlined" size="medium" color="error" onClick={() => toggleLevelFlipped()}>Cancel</Button>
            <Button variant="contained" size="medium" className="bg-[#1e1e1e]" onClick={handleSave}>Save</Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={hasError ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >{message}</Alert>
      </Snackbar>
    </Box>
  );
}