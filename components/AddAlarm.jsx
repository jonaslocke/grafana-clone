import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Alarm } from "../src/Alarm.js";

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
      <AddIcon />
    </Fab>
  );
};

export default AddAlarm;
