import React from 'react';
import { Box } from '@mui/system';
import Header from 'components/Header';
import BreackdownChart from 'components/BreackdownChart';

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="BREAKDOWN" subtitle="Breakdown of sales by Category" />
        <Box mt="40px" height="75vh">
            <BreackdownChart />
        </Box>
    </Box>
  )
}

export default Breakdown