import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import Head from "next/head";
import { GlobalContext } from "../src/GlobalContext";
import GrafAppBar from "../components/GrafAppBar";
import GrafSidebar from "../components/GrafSidebar";
import GrafDrawerHeader from "../components/GrafDrawerHeader";

export default function GrafanaClone({ Component, pageProps }) {
  const [drawer, setDrawer] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const handleDrawerOpen = () => {
    setDrawer(true);
  };
  const handleDrawerClose = () => {
    setDrawer(false);
  };

  return (
    <>
      <Head>
        <title>Grafana clone</title>
        <meta name="description" content="powered by Grafana clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalContext.Provider
        value={{
          drawer,
          setDrawer,
          handleDrawerOpen,
          handleDrawerClose,
          notificationsCount,
          setNotificationsCount,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <GrafAppBar />
          <GrafSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <GrafDrawerHeader />
            <Component {...pageProps} />
          </Box>
        </Box>
      </GlobalContext.Provider>
    </>
  );
}
