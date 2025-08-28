import { Alert, Box, Button, IconButton, Menu, MenuItem, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { StaffForm } from "./forms/StaffForm";
import { useStaffContext } from "@/context/staff/staff.context";
import { MoreHoriz } from "@mui/icons-material";
import { useMemo, useState } from "react";


type FORM_ACTION = "create" | "update";
const formActionLabel: Record<FORM_ACTION, string> = {
  create: "Add New Staff",
  update: "Edit Staff",
}

export default function StaffDirectoryTable() {
  const { staff, flipped, deleteStaff, toggleFlipped } = useStaffContext();
  const [formAction, setFormAction] = useState<FORM_ACTION>("create");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setOpenSnackBar(false);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  }
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }
  const handleEdit = () => {
    setFormAction("update");
    handleMenuClose();
    toggleFlipped();
  }
  const handleDelete = (id: string) => {
    deleteStaff(id);
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
    transition: 'transform 0.8s',
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
              onClick={() => toggleFlipped()}
              startIcon={<AddIcon />}
            >  
              Add Staff
            </Button>
          </Box>

          <Table className="shadow-lg min-h-full" aria-label="staff table">
            <TableHead>
              <TableRow>
                {/* Table Headers */}
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
                  <TableRow key={s.id + i} hover onClick={() => toggleFlipped()} style={{ cursor: 'pointer' }}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.department}</TableCell>
                    <TableCell>{s.role}</TableCell>
                    <TableCell>{s.country}</TableCell>
                    <TableCell>{s.state}</TableCell>
                    <TableCell>{s.address}</TableCell>  
                    <TableCell>{s.gradeLevel ? s.gradeLevel.level : 'N/A'}</TableCell>
                    <TableCell>
                      <Box>
                        <IconButton onClick={handleMenuClick}>
                          <MoreHoriz />
                        </IconButton>
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
                          <MenuItem onClick={handleEdit}>Edit</MenuItem>
                          <MenuItem onClick={() => handleDelete(s.id)}>Delete</MenuItem>
                        </Menu>
                      </Box>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>

                  </TableRow>
                )
              }
            </TableBody>
          </Table>
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
            <Box className="text-center">
              <Typography component="h3" className="text-2xl font-bold mb-4">
                {formActionLabel[formAction]}
              </Typography>
              <Box>
                <StaffForm />
              </Box>
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