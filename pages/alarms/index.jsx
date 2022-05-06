import { Typography } from "@mui/material";
import { useState } from "react";
import AddAlarm from "../../components/AddAlarm";
import AlarmsForm from "../../components/AlarmsForm";
import AlarmsList from "../../components/AlarmsList";
import { AlarmsContext } from "../../src/AlarmsContext";

const Notifications = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
        Alarms
      </Typography>
      <AlarmsContext.Provider
        value={{
          page,
          setPage,
        }}
      >
        <AlarmsForm />
        <AlarmsList />
      </AlarmsContext.Provider>
      <AddAlarm />
    </>
  );
};

export default Notifications;
