import { Alert, Box, Button, IconButton, Menu, MenuItem, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { StaffForm } from "./forms/StaffForm";
import { useStaffContext } from "@/context/staff/staff.context";
import { HourglassEmptyOutlined, MoreHoriz } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useStaffForm } from "./hooks/useStaffForm";
import { Staff } from "@/model/Staff";
import { FlippedSideState } from "@/context/staff/staff.reducer";


const flippedSideStateTitle: Record<FlippedSideState, string> = {
  create: "Add New Staff",
  edit: "Edit Staff",
  view: "View Staff",
}

export default function StaffDirectoryTable() {
  const { staff, flipped, deleteStaff, toggleFlipped, flippedSideState, setFlippedSideState } = useStaffContext();
  const { reset, getValues } = useStaffForm();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Staff | null>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setOpenSnackBar(false);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  }

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>, row: Staff) => {
    setAnchorEl(e.currentTarget);
    setSelectedRow(row);
  }

  const handleAdd = () => {
    setFlippedSideState("create");
    toggleFlipped();
  }

  const handleView = () => {
    setFlippedSideState("view");
  }
  
  const handleEdit = () => {
    setFlippedSideState("edit");
    reset(selectedRow!);
    console.log("populated values: ", selectedRow, " actual values: ", getValues());
    handleMenuClose();
    toggleFlipped();
  }

  const handleDelete = () => {
    deleteStaff(selectedRow!.id);
    setMessage("Staff deleted successfully!");
    handleMenuClose();
  }

  const frontSideCss = useMemo(() => ({
    position: 'absolute',
    width: '100%',
    backfaceVisibility: 'hidden',
    bgcolor: 'white',
    borderRadius: 2,
    p: 2,
  }), [])
  const flipContainerCss = useMemo(() => ({
    width: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.4s',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  }), [flipped])
  const containerCss = useMemo(() => ({
    perspective: '1000px',
    width: '100%',
  }), [])

  return (
    <Box sx={containerCss}>
      <Box sx={flipContainerCss}>
        {/* Front Side - Staff Table */}
        <Box sx={frontSideCss}>
          <Box className="flex items-center justify-between mt-4 mb-2">
            <Button></Button>
            <Button 
              variant="outlined" 
              className="border-2 border-black rounded-md text-black" 
              onClick={handleAdd}
              startIcon={<AddIcon />}
            >  
              Add Staff
            </Button>
          </Box>

          <Table className="shadow-md" aria-label="staff table">
            <TableHead>
              <TableRow>
                {/* Table Headers */}
                <TableCell>S/N</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Grade Level</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="min-h-full shadow-lg">
              {
                staff.length > 0 ? staff.map((s, i) => (
                  <TableRow key={s.id + i}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.department}</TableCell>
                    <TableCell>{s.role}</TableCell>
                    <TableCell>{s.country}</TableCell>
                    <TableCell>{s.state}</TableCell>
                    <TableCell>{s.address}</TableCell>  
                    <TableCell>{s.gradeLevel ? s.gradeLevel : 'N/A'}</TableCell>
                    <TableCell>
                      <Box>
                        <IconButton onClick={(e) => {
                          handleMenuOpen(e, s)
                        }}>
                          <MoreHoriz />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Box className="w-full h-[250px] flex flex-col justify-center items-center">
                        <HourglassEmptyOutlined />
                        <Typography component="h5">No data available</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>

          <Menu
            id="grade-level-action-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            slotProps={{
              list: {
                'aria-labelledby': 'gradelevel-actions',
              },
            }}
          >
            <MenuItem onClick={handleView} className="!text-lg">View</MenuItem>
            <MenuItem onClick={handleEdit} className="!text-lg !text-blue-500">Edit</MenuItem>
            <MenuItem onClick={handleDelete} className="!text-lg !text-red-500">Delete</MenuItem>
          </Menu>
        </Box>

        {/* Back Side */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          backfaceVisibility: 'hidden',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          transform: 'rotateY(180deg)',
        }}>
          <Button 
            className="border-2 rounded-md" 
            size="medium" 
            onClick={() => toggleFlipped()}
          >
            Back to List
          </Button>
          <Box className="flex flex-col items-center justify-center h-full">
            <Typography component="h4" className="!text-xl !font-bold my-4">
              {flippedSideStateTitle[flippedSideState]}
            </Typography>
            <Box className="flex justify-center items-center">
              <StaffForm />
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >{message}</Alert>
      </Snackbar>
    </Box>
  )
}