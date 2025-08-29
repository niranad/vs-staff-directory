import { Alert, Box, Button, IconButton, Menu, MenuItem, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { StaffForm } from "./forms/StaffForm";
import { useStaffContext } from "@/context/staff/staff.context";
import { HourglassEmptyOutlined, MoreHoriz } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useStaffForm } from "./hooks/useStaffForm";
import { Staff } from "@/model/Staff";
import { FlippedSideState } from "@/context/staff/staff.reducer";
import { useGradeLevelContext } from "@/context/gradeLevel/gradeLevel.context";
import TableFilter from "@/shared/components/TableFilter";


const flippedSideStateTitle: Record<FlippedSideState, string> = {
  create: "Add New Staff",
  edit: "Edit Staff",
  view: "View Staff",
}

type StaffFilterColumn = "name" | "department" | "role" | "country" | "state" | "address"
const columns = [
  "name", 
  "department",
  "role",
  "country",
  "state",
  "address",
  "gradeLevel",
]

export default function StaffDirectoryTable() {
  const { 
    staff,
    flipped, 
    deleteStaff, 
    toggleFlipped, 
    flippedSideState, 
    setFlippedSideState,
    fetchStaffById,
  } = useStaffContext();
  const { gradeLevels } = useGradeLevelContext();
  const { reset } = useStaffForm();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Staff | null>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const open = Boolean(anchorEl);

  const gradeLookup = useMemo(() => {
    const lookup = new Map(gradeLevels.map((g) => [g.id, g.level]));
    return lookup;
  }, [gradeLevels]);

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
    fetchStaffById(selectedRow!.id);
    reset(selectedRow!);
    handleMenuClose();
    toggleFlipped();
  }

  const handleDelete = () => {
    deleteStaff(selectedRow!.id);
    setMessage("Staff deleted successfully!");
    handleMenuClose();
  }

  const handleColumnChange = (event: any) => {
    setSelectedColumn(event.target.value);
  }
  const handleFilterChange = (event: any) => {
    const _filterValue = event.target.value?.toLowerCase();
    setFilterValue(_filterValue);
    if (Boolean(selectedColumn)) {
      const key: StaffFilterColumn = selectedColumn as any;
      setFilteredStaff(staff.filter((s) => ("" + s[key]).toLowerCase().includes(_filterValue)))
    }
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

  useEffect(() => {
    setFilteredStaff(staff);
  }, [staff])

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

          <TableFilter
            columns={columns}
            filterValue={filterValue}
            selectedColumn={selectedColumn}
            onColumnChange={handleColumnChange} 
            onInputChange={handleFilterChange} 
          />

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
                filteredStaff.length > 0 ? filteredStaff.map((s, i) => (
                  <TableRow key={s.id + i}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.department}</TableCell>
                    <TableCell>{s.role}</TableCell>
                    <TableCell>{s.country}</TableCell>
                    <TableCell>{s.state}</TableCell>
                    <TableCell>{s.address}</TableCell>  
                    <TableCell>{s.gradeLevel ? gradeLookup.get(s.gradeLevel) : 'N/A'}</TableCell>
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