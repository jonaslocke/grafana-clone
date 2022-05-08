import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Alarm } from "../src/Alarm.js";

const AddAlarm = () => {
  // const router = useRouter();
  const handleClick = () => {
    // router.push("notifications/add");
    const alarm = new Alarm({
      name: `My alarm 99`,
      source: `Server 99`,
      metric: "CPU usage",
      trigger: 80,
      paused: false,
    });
    console.log(alarm.delete());
    console.log(alarm.delete());
  };
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
