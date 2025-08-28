
import React, { useState } from 'react'
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'

interface TableFilterProps {
  columns: string[];
  selectedColumn: string;
  onColumnChange: (event: SelectChangeEvent) => void;
  onInputChange: (event: any) => void;
}

export default function TableFilter({
  columns, 
  selectedColumn,
  onColumnChange, 
  onInputChange
}: TableFilterProps) {

  return (
    <Box className="w-full">
      <Box className="flex gap-8 ">
        <Select
          className="w-[150px]"
          aria-placeholder="select column"
          value={selectedColumn}
          onChange={onColumnChange}
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          {
            columns.map((c, i) => (
              <MenuItem key={c + i}>{c}</MenuItem>
            ))
          }
        </Select>
        <TextField
          className="w-[150px]"
          name="Value"
          placeholder='Filter value'
          onChange={onInputChange}
        />
      </Box>
    </Box>
  )
}
