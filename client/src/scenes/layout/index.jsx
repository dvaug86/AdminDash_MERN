import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom" //allows us to have template layouts
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";


const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");  //true or false  for mobile vs desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); //boolean to determine if sidebar is open
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);


  return (
    <Box  display={isNonMobile ? "flex" : "block"} width='100%' height='100%'>
      <Sidebar
        user={data || {}} //the {} is placed so when there isn't any data available it'll send an empty set instead of undefined
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;



/////////////////////////////////////////////////////////
