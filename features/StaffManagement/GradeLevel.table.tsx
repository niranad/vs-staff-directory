
import { Alert, Box, Button, IconButton, Menu, MenuItem, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useGradeLevelContext } from "@/context/gradeLevel/gradeLevel.context";
import { GradeLevelForm } from "./forms/GradeLevelForm";
import { HourglassEmptyOutlined, MoreHoriz } from "@mui/icons-material";
import React, { useCallback, useState } from "react";

type FORM_ACTION = "create" | "update";
const formActionLabel: Record<FORM_ACTION, string> = {
  create: "Add New Grade Level",
  update: "Edit Grade Level",
}

export default function GradeLevelTable() {
  const { levelFlipped, toggleLevelFlipped, gradeLevels, deleteGradeLevel } = useGradeLevelContext();
  const [formAction, setFormAction] = useState<FORM_ACTION>("create");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const open = Boolean(anchorEl);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  }
  const handleClose = () => {
    setOpenSnackBar(false);
  }
  const handleEdit = () => {
    setFormAction("update");
    handleMenuClose();
    toggleLevelFlipped();
  }
  const handleDelete = (id: string) => {
    deleteGradeLevel(id);
    handleMenuClose();
  }

  const handleAddGradeLevel = useCallback(() => {
    setFormAction("create");
    toggleLevelFlipped();
  }, [])

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
      }}
    >
      <Box sx={{
        width: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.8s',
        transform: levelFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Front Side - Staff Table */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          backfaceVisibility: 'hidden',
          bgcolor: 'white',
          borderRadius: 2,
          p: 2,
        }}>
          <Box className="flex items-center justify-between mt-4 mb-2">
            <Button></Button>
            <Button 
              variant="outlined" 
              className="border-2 border-black rounded-md text-black" 
              onClick={handleAddGradeLevel}
              startIcon={<AddIcon />}
            >  
              Add Grade Level
            </Button>
          </Box>

          <Table className="shadow-lg min-h-full" aria-label="staff table">
            <TableHead>
              <TableRow>
                {/* Table Headers */}
                <TableCell>S/N</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Sort</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="min-h-full shadow-lg">
              {
                gradeLevels.length > 0 ? gradeLevels.map((g, i) => (
                  <TableRow key={g.id + i} hover onClick={() => toggleLevelFlipped()} style={{ cursor: 'pointer' }}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{g.level}</TableCell>
                    <TableCell>{g.sort}</TableCell>
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
                          <MenuItem onClick={() => handleDelete(g.id)}>Delete</MenuItem>
                        </Menu>
                      </Box>
                    </TableCell>
                  </TableRow> 
                )) : (
                  <TableRow className="w-full">
                    <TableCell colSpan={4}>
                      <Box className="w-full h-[250px] flex flex-col justify-center items-center">
                        <HourglassEmptyOutlined />
                        <Typography>No data available</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </Box>

        {/* Back Side - Form */}
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
            onClick={() => toggleLevelFlipped()}
          >
            Back to List
          </Button>
          <Box className="flex flex-col items-center justify-center h-full">
            <Typography component="h4" className="!text-xl !font-bold my-4">
              {formActionLabel[formAction]}
            </Typography>
            <Box className="flex justify-center items-center">
              <GradeLevelForm  />
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
