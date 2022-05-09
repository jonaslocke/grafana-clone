import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { useEffect, useState } from "react";
import GrafAppBar from "../components/GrafAppBar";
import GrafDrawerHeader from "../components/GrafDrawerHeader";
import GrafSidebar from "../components/GrafSidebar";
import { alarms as alarmsData } from "../dao/DaoAlarms";
import { GlobalContext } from "../src/GlobalContext";
import "../styles/globals.css";
import "../styles/graftooltip.scss";

export default function GrafanaClone({ Component, pageProps }) {
  const [alarms, setAlarms] = useState(alarmsData.data);
  const [drawer, setDrawer] = useState(false);
  const [notifications, setNotifications] = useState({ active: 0, total: 0 });
  const handleDrawerOpen = () => {
    setDrawer(true);
  };
  const handleDrawerClose = () => {
    setDrawer(false);
  };

  useEffect(() => {
    const data = alarmsData.data.filter(({ deletedOn }) => !deletedOn);
    const active = data.filter(({ paused }) => !paused).length;
    const total = data.length;
    setNotifications({ active, total });
  }, [alarms]);

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
          alarms,
          setAlarms,
          notifications,
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
