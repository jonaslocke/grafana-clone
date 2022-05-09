import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useContext } from "react";
import { GlobalContext } from "../../src/GlobalContext";

const Notifications = () => {
  const {
    notifications: { active },
  } = useContext(GlobalContext);
  return <Avatar sx={{ bgcolor: deepOrange[500] }}>{active}</Avatar>;
};

export default Notifications;
