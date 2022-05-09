import { Grid, Stack } from "@mui/material";
import { useContext } from "react";
import Widget from "../components/Widget";
import { GlobalContext } from "../src/GlobalContext";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Box } from "@mui/system";

const Dashboard = () => {
  const {
    notifications: { active, total },
  } = useContext(GlobalContext);
  const widgets = [
    {
      text: (
        <Stack direction={"row"}>
          <NotificationsActiveIcon
            color="secondary"
            fontSize="large"
            sx={{ marginRight: 2 }}
          />
          <b>{active}</b>&nbsp; / {total} Alarms turned on
        </Stack>
      ),
      to: "alarms",
    },
  ];
  return (
    <Grid container spacing={3}>
      {widgets.map(({ text, to }, id) => (
        <Widget text={text} to={to} key={id} />
      ))}
      <Widget empty />
    </Grid>
  );
};

export default Dashboard;
