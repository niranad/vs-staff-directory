
import React, { memo } from 'react'
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'

interface TableFilterProps {
  columns: string[];
  selectedColumn: string;
  filterValue: string;
  onColumnChange: (event: SelectChangeEvent) => void;
  onInputChange: (event: any) => void;
}

function TableFilter({
  columns, 
  selectedColumn,
  filterValue,
  onColumnChange, 
  onInputChange
}: TableFilterProps) {
  return (
    <Box className="w-full !text-lg">
      <Box className="flex gap-8 ">
        <Select
          className="w-[150px]"
          aria-placeholder="select column"
          value={selectedColumn}
          onChange={onColumnChange}
        >
          <MenuItem value="" disabled selected>
            <em>Select column</em>
          </MenuItem>
          {
            columns.map((c, i) => (
              <MenuItem key={c + i} value={c}>{c}</MenuItem>
            ))
          }
        </Select>
        <TextField
          className="w-[150px] !text-lg"
          name="Value"
          value={filterValue}
          placeholder='Filter value'
          onChange={onInputChange}
        />
      </Box>
    </Box>
  )
}

export default memo(TableFilter);