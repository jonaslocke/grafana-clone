import { Grid } from "@mui/material";
import Widget from "../components/Widget";

const Dashboard = () => {
  const widgets = [{ text: "2/10 Alarms turned on", to: "alarms" }];
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
