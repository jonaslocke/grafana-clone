import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const AddAlarm = () => {
  const router = useRouter();
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "absolute",
        bottom: 32,
        right: 32,
      }}
      onClick={() => router.push("notifications/add")}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddAlarm;
