import { Alert, Box, Button, Grid, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { useStaffForm } from "../hooks/useStaffForm";
import { useCallback, useState } from "react";
import { useStaffContext } from "@/context/staff/staff.context";
import { Staff } from "@/model/Staff";
import { useGradeLevelContext } from "@/context/gradeLevel/gradeLevel.context";
import { GradeLevel } from "@/model/GradeLevel";
import { CountryState } from "@/model/CountryState";

export function StaffForm() {
  const { updateStaff, createStaff, toggleFlipped, countries, states } = useStaffContext();
  const { gradeLevels } = useGradeLevelContext();
  const { isValid, control, errors, getValues } = useStaffForm();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [filteredStates, setFilteredStates] = useState<CountryState[]>(states);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [gradeValue, setGradeValue] = useState<string>("");

  const handleGradeLevelChange = (event: SelectChangeEvent) => {
    setGradeValue(event.target.value);
  }
  const handleCountryChange = (event: SelectChangeEvent) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setFilteredStates(states.filter((s) => s.country === country));
  }
  const handleStateChange = (event: SelectChangeEvent) => {
    setSelectedState(event.target.value);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = useCallback(() => {
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
      setMessage("Staff member saved successfully!");
    }
  }, [])

  return (
    <Box className="flex flex gap-4 w-full">
      <Grid container spacing={2} className="w-full">
        <Grid size={{xs: 6, md: 4}}>
          <Box className="w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p">
                    Name
                  </Typography>
                  <TextField
                    {...field}
                    label="Name"
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
                <Box className="w-full">
                  <Typography component="p">
                    Role
                  </Typography>
                  <TextField
                    {...field}
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
        <Grid size={{xs: 6, md: 4}}>
          <Box className="w-full">
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <Box className="w-full flex flex-col gap-2">
                  <Typography component="p">
                    Department
                  </Typography>
                  <TextField
                    {...field}
                    label="Department"
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
                  <Typography component="p">
                    Country
                  </Typography>
                  <Select
                    {...field}
                    label="Country"
                    variant="outlined"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    fullWidth
                    margin="none"
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
                  <Typography component="p">
                    State
                  </Typography>
                  <Select
                    {...field}
                    label="State"
                    variant="outlined"
                    value={selectedState}
                    onChange={handleStateChange}
                    fullWidth
                    margin="none"
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
                  <Typography component="p">
                    Address
                  </Typography>
                  <TextField
                    {...field}
                    label="Address"
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
                  <Typography component="p">
                    Grade Level
                  </Typography>
                  <Select
                    {...field}
                    label="Grade Level"
                    variant="outlined"
                    value={gradeValue}
                    onChange={handleGradeLevelChange}
                    fullWidth
                    margin="none"
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
            <Button variant="outlined" size="medium" color="error" onClick={() => toggleFlipped()}>Cancel</Button>
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