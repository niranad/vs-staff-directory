import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import StaffDirectoryTable from './StaffDirectory.table'
import GradeLevelTable from './GradeLevel.table';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `directory-tab-${index}`,
    'aria-controls': `directory-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`directory-tabpanel-${index}`}
      aria-labelledby={`directory-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function StaffDirectory() {
  const [value, setValue] = React.useState(0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="min-h-screen bg-white">
      <Box component="main" className="min-h-screen">
        <Box 
          sx={{background: 'linear-gradient(135deg, #0f111a 0%, #1a1d2b 100%)'}} 
          className="flex items-center justify-center min-h-[30vh] h-[250px]"
        >
          <Typography 
            variant="h3"
            className="text-white p-8" 
            sx={{
              background: 'linear-gradient(90deg, #00c6ff, #0072ff, #8e2de2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}
          >
            Welcome to Staff Directory
          </Typography>
        </Box>
        <Box className="w-full overflow-none mt-[-50px] px-12">
          <Box className="bg-white shadow-lg rounded-tr-[28px] rounded-tl-[28px] p-8 z-50 min-h-screen">
            <Typography variant="h5" className="text-gray-700 mt-4">
              Manage and view your organization's staff information with ease.
            </Typography>
 
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="staff directory tabs">
                <Tab label="Staff Directory" {...a11yProps(0)} />
                <Tab label="Grade Level" {...a11yProps(1)} />
              </Tabs>
            </Box>

            <Box>
              <CustomTabPanel value={value} index={0}>
                <StaffDirectoryTable />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <GradeLevelTable />
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
