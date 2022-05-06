import { Typography } from "@mui/material";
import AddAlarm from "../../components/AddAlarm";
import AlarmsForm from "../../components/AlarmsForm";
import AlarmsList from "../../components/AlarmsList";

const Notifications = () => (
  <>
    <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
      Alarms
    </Typography>
    <AlarmsForm />
    <AlarmsList />
    <AddAlarm />
  </>
);

export default Notifications;
