import { Alert, Box, Button, Grid, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { useStaffForm } from "../hooks/useStaffForm";
import { useCallback, useEffect, useState } from "react";
import { useStaffContext } from "@/context/staff/staff.context";
import { Staff } from "@/model/Staff";
import { useGradeLevelContext } from "@/context/gradeLevel/gradeLevel.context";
import { CountryState } from "@/model/CountryState";

export function StaffForm() {
  const { updateStaff, createStaff, toggleFlipped, countries, states } = useStaffContext();
  const { gradeLevels } = useGradeLevelContext();
  const { formState, control, reset, trigger, setValue, getValues } = useStaffForm();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [filteredStates, setFilteredStates] = useState<CountryState[]>(states);
  const [selectedState, setSelectedState] = useState<string>("");
  const [gradeValue, setGradeValue] = useState<string>("");

  const handleGradeLevelChange = (event: SelectChangeEvent) => {
    setGradeValue(event.target.value);
  }
  const handleCountryChange = (event: any) => {
    const country = event.target.value;
    setSelectedState("");
    setFilteredStates(states.filter((s) => s.country === country));
  }
  const handleStateChange = (event: any) => {
    setSelectedState(event.target.value as string);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    reset();
    toggleFlipped();
  }
  const handleSave = useCallback(async () => {
    const isValid = await trigger();
    if (!isValid) {
      setMessage("Please fix the errors in the form.");
      setHasError(true);
      setOpen(true);
      return;
    } else {
      if (!getValues("id")) {
        createStaff(getValues() as Staff);
      } else {
        updateStaff(getValues() as Staff);
      }
      reset();
      setOpen(true);
      toggleFlipped();
      setMessage("Staff member saved successfully!");
    }
  }, [])

  useEffect(() => {
    // const formValues = getValues();
    // setValue("name", formValues["name"], { shouldDirty: true});
    // setValue("address", formValues["address"]);
    // setValue("country", formValues["country"]);
    // setValue("state", formValues["state"]);
    // setValue("department", formValues["department"]);
    // setValue("role", formValues["role"]);
  }, [getValues, setValue])

  return (
    <Box className="flex flex gap-4 w-full">
      <Grid container spacing={4} className="w-full">
        <Grid size={{xs: 6, md: 4}}>
          <Box className="w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left pb-2">
                    Name
                  </Typography>
                  <TextField
                    {...field}
                    label="Name"
                    error={Boolean(formState.errors.name)}
                    helperText={formState.errors.name?.message}
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
          <Box className="w-full flex flex-col gap-2">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left pb-2">
                    Role
                  </Typography>
                  <TextField
                    {...field}
                    label="Role"
                    error={Boolean(formState.errors.role)}
                    helperText={formState.errors.role?.message}
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
              name="department"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left pb-2">
                    Department
                  </Typography>
                  <TextField
                    {...field}
                    label="Department"
                    error={Boolean(formState.errors.department)}
                    helperText={formState.errors.department?.message}
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
              name="country"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left pb-2">
                    Country
                  </Typography>
                  <Select
                    {...field}
                    className="text-left"
                    error={Boolean(formState.errors.country)}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCountryChange(e);
                    }}
                    fullWidth
                  >
                    <MenuItem disabled value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      countries.map((c, i) => (
                        <MenuItem key={c + i} value={c}>{c}</MenuItem>
                      ))
                    }
                  </Select>
                </Box>
              )}
            ></Controller>
          </Box>
        </Grid>
        <Grid size={{xs: 6, md: 4}}>
          <Box className="w-full">
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left pb-2">
                    State
                  </Typography>
                  <Select
                    className="text-left"
                    {...field}
                    value={selectedState}
                    error={Boolean(formState.errors.state)}
                    onChange={(e) => {
                      field.onChange(e);
                      handleStateChange(e);
                    }}
                    fullWidth
                  >
                    <MenuItem disabled value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      filteredStates.map((s, i) => (
                        <MenuItem key={s.name + i} value={s.name}>{s.name}</MenuItem>
                      ))
                    }
                  </Select>
                </Box>
              )}
            ></Controller>
          </Box>
        </Grid>
        <Grid size={{xs: 6, md: 4}}>
          <Box className="w-full">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left pb-2">
                    Address
                  </Typography>
                  <TextField
                    {...field}
                    label="Address"
                    error={Boolean(formState.errors.address)}
                    helperText={formState.errors.address?.message}
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
              name="gradeLevel"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p" className="text-left pb-2">
                    Grade Level
                  </Typography>
                  <Select
                    {...field}
                    className="text-left"
                    label="Grade Level"
                    error={Boolean(formState.errors.gradeLevel)}
                    variant="outlined"
                    value={gradeValue}
                    onChange={(e) => {
                      field.onChange(e);
                      handleGradeLevelChange(e);
                    }}
                    fullWidth
                  >
                    <MenuItem disabled value="">
                      <em>None</em>
                    </MenuItem>
                    {gradeLevels.map((g, i) => (
                      <MenuItem key={g.id + i} value={g.id}>{g.level}</MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            ></Controller>
          </Box>
        </Grid>
        <Grid size={{xs: 12}}>
          <Box className="flex justify-center items-center gap-8 mt-2">
            <Button variant="outlined" size="medium" color="error" onClick={handleCancel}>Cancel</Button>
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