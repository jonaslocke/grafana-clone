import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useContext } from "react";
import { GlobalContext } from "../../src/GlobalContext";
import GrafTooltip from "../GrafTooltip";

const Notifications = () => {
  const {
    notifications: { active },
  } = useContext(GlobalContext);
  return (
    <GrafTooltip text="Active alarms">
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{active}</Avatar>
    </GrafTooltip>
  );
};

export default Notifications;
