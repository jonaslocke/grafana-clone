import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useContext } from "react";

import { GlobalContext } from "../../src/GlobalContext";

const Notifications = () => {
  const { notificationsCount } = useContext(GlobalContext);

  return (
    <Avatar sx={{ bgcolor: deepOrange[500] }}>{notificationsCount}</Avatar>
  );
};

export default Notifications;
