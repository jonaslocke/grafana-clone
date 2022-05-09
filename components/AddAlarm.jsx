import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { Fab } from "@mui/material";
import { useRouter } from "next/router";
import GrafTooltip from "../components/GrafTooltip";

const AddAlarm = () => {
  const router = useRouter();
  const handleClick = () => router.push(`/alarms/create`);
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
      }}
      onClick={() => handleClick()}
    >
      <NotificationAddIcon />
    </Fab>
  );
};

export default AddAlarm;
