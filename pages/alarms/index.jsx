import { Typography } from "@mui/material";
import { useState } from "react";
import AddAlarm from "../../components/AddAlarm";
import AlarmsList from "../../components/AlarmsList";
import AlarmsSearch from "../../components/AlarmsSearch";
import { AlarmsContext } from "../../src/AlarmsContext";

const Alarms = () => {
  const [page, setPage] = useState(1);
  const [nameSearch, setNameSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [pages, setPages] = useState(0);

  return (
    <>
      <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
        Alarms
      </Typography>
      <AlarmsContext.Provider
        value={{
          page,
          setPage,
          nameSearch,
          setNameSearch,
          statusSearch,
          setStatusSearch,
          pages,
          setPages,
        }}
      >
        <AlarmsSearch />
        <AlarmsList />
      </AlarmsContext.Provider>
      <AddAlarm />
    </>
  );
};

export default Alarms;
