import "../styles/globals.css";
import Head from "next/head";
import { useState } from "react";
import { GlobalContext } from "../src/GlobalContext";
import { Container } from "@mui/material";
import GrafAppBar from "../components/GrafAppBar";
import GrafSidebar from "../components/GrafSidebar";

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState(false);
  return (
    <>
      <Head>
        <title>Grafana clone</title>
        <meta name="description" content="powered by Grafana clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalContext.Provider
        value={{
          state,
          setState,
        }}
      >
        <GrafAppBar />
        <GrafSidebar />
        <Container maxWidth="xm" sx={{ paddingY: 3 }}>
          <Component {...pageProps} />
        </Container>
      </GlobalContext.Provider>
    </>
  );
}

export default MyApp;
