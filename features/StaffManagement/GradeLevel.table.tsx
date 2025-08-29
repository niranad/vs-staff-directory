
import { Box, Button, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useGradeLevelContext } from "@/context/gradeLevel/gradeLevel.context";
import { GradeLevelForm } from "./forms/GradeLevelForm";
import { HourglassEmptyOutlined, MoreHoriz } from "@mui/icons-material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useGradeLevelForm } from "./hooks/useGradeLevelForm";
import { GradeLevel } from "@/model/GradeLevel";
import { FlippedSideState } from "@/context/staff/staff.reducer";
import { useSnackBarContext } from "@/context/snackbar/snackbar.context";
import TableFilter from "@/shared/components/TableFilter";


const flippedSideStateTitle: Record<FlippedSideState, string> = {
  create: "Add New Grade Level",
  edit: "Edit Grade Level",
  view: "View Grade Level",
}

type GradeFilterColumn = "level" | "sort";
const columns: string[] = ['level', 'sort'];

export default function GradeLevelTable() {
  const { 
    levelFlipped, 
    toggleLevelFlipped, 
    flippedSideState, 
    setFlippedSideState, 
    gradeLevels, 
    deleteGradeLevel,
    fetchGradeLevelById,
  } = useGradeLevelContext();
  const { reset } = useGradeLevelForm();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { openSnackBar } = useSnackBarContext();
  const [selectedRow, setSelectedRow] = useState<GradeLevel | null>(null);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [filteredGrades, setFilteredGrades] = useState<GradeLevel[]>(gradeLevels);
  const [filterValue, setFilterValue] = useState("");
  const open = Boolean(anchorEl);

  const handleColumnChange = (event: any) => {
    setSelectedColumn(event.target.value);
  }

  const handleFilterChange = (event: any) => {
    const _filterValue = event.target.value?.toLowerCase();
    setFilterValue(_filterValue);
    if (Boolean(selectedColumn)) {
      const key: GradeFilterColumn = selectedColumn as any;
      setFilteredGrades(gradeLevels.filter((g) => ("" + g[key]).toLowerCase().includes(_filterValue)))
    }
  }

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>, row: GradeLevel) => {
    setAnchorEl(e.currentTarget);
    setSelectedRow(row);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }
 

  const handleAction = (action: "view" | "edit") => {
    setFlippedSideState(action);
    fetchGradeLevelById(selectedRow!.id);
    reset(selectedRow!);
    handleMenuClose();
    toggleLevelFlipped();
  }

  const handleDelete = () => {
    deleteGradeLevel(selectedRow!.id);
    openSnackBar({message: "Grade level deleted successfully!", severity: "success"});
    handleMenuClose();
  }

  const handleAddGradeLevel = useCallback(() => {
    setFlippedSideState("create");
    fetchGradeLevelById(""); // Set currentGradeLevel to null
    reset();
    toggleLevelFlipped();
  }, [])

  const containerSx = useMemo(() => (
    {
      perspective: '1000px',
      width: '100%',
    }
  ), [])

  const flipContainerSx = useMemo(() => (
    {
      width: '100%',
      position: 'relative',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.4s',
      transform: levelFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    }
  ), [levelFlipped])

  const frontSideSx = useMemo(() => (
    {
      position: 'absolute',
      width: '100%',
      backfaceVisibility: 'hidden',
      bgcolor: 'white',
      borderRadius: 2,
      p: 2,
    }
  ), [])

  useEffect(() => {
    setFilteredGrades(gradeLevels);
  }, [gradeLevels])

  return (
    <Box sx={containerSx}>
      <Box sx={flipContainerSx}>
        {/* Front Side - Staff Table */}
        <Box sx={frontSideSx}>
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

          <TableFilter 
            columns={columns}
            filterValue={filterValue}
            selectedColumn={selectedColumn}
            onColumnChange={handleColumnChange} 
            onInputChange={handleFilterChange} 
          />
          <Table className="shadow-md" aria-label="staff table">
            <TableHead>
              <TableRow className="!font-bold">
                {/* Table Headers */}
                <TableCell>S/N</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Sort</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="min-h-full shadow-lg">
              {
                filteredGrades.length > 0 ? filteredGrades.map((g, i) => (
                  <TableRow key={g.id + i}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{g.level}</TableCell>
                    <TableCell>{g.sort}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => {
                        handleMenuOpen(e, g)
                      }}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow> 
                )) : (
                  <TableRow className="w-full">
                    <TableCell colSpan={4}>
                      <Box className="w-full h-[250px] flex flex-col justify-center items-center">
                        <HourglassEmptyOutlined />
                        <Typography variant="h5" className="!text-lg">No data available</Typography>
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
            <MenuItem onClick={() => handleAction("view")} className="!text-lg">View</MenuItem>
            <MenuItem onClick={() => handleAction("edit")} className="!text-lg !text-blue-500">Edit</MenuItem>
            <MenuItem onClick={handleDelete} className="!text-lg !text-red-500">Delete</MenuItem>
          </Menu>
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
            size="large" 
            onClick={() => toggleLevelFlipped()}
          >
            Back to List
          </Button>
          <Box className="flex flex-col items-center justify-center h-full">
            <Typography component="h4" className="!text-xl !font-bold my-4">
              {flippedSideStateTitle[flippedSideState]}
            </Typography>
            <Box className="flex justify-center items-center">
              <GradeLevelForm  />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
