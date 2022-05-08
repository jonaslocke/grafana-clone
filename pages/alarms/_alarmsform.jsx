import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAlarms } from "../../src/HttpServer";

const AlarmsForm = () => {
  const route = useRouter();
  const slug = route.query.id;
  const isEditing = slug !== "create";
  const formInputs = [
    { input: "id", label: "ID", disabled: true },
    { input: "name", label: "Name", disabled: false },
    { input: "source", label: "Source", disabled: false },
    { input: "metric", label: "Metric", disabled: false },
    { input: "trigger", label: "Trigger", disabled: false },
  ];

  const [alarm, setAlarm] = useState(
    formInputs
      .map(({ input }) => input)
      .reduce((acc, cur) => {
        return { ...acc, [cur]: "" };
      }, {})
  );

  const load = async () => {
    const response = await fetchAlarms.getOne(slug);
    const { status } = response;
    setAlarm(status === 200 ? response.data : {});
  };

  const handleSubmit = async (event) => event.preventDefault();
  const handleChange = (event) => {
    const input = event.target.id;
    setAlarm({ ...alarm, [input]: event.target.value });
  };

  useEffect(() => {
    if (slug && isEditing) {
      load();
    }
  }, [slug]);

  return (
    <Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, paddingBottom: 2 }}
      >
        {isEditing ? "Edit Alarm" : "Create Alarm"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {formInputs.map(({ input, label, disabled }) => (
            <Grid item key={input} xs={6}>
              <TextField
                onChange={handleChange}
                value={alarm[input]}
                id={input}
                label={label}
                variant="outlined"
                disabled={disabled}
                sx={{ width: 1 }}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          component="label"
          htmlFor="editalarm"
          sx={{ marginTop: 2, float: "right", width: 1 / 3 }}
        >
          {isEditing ? "Update Alarm" : "Create Alarm"}
        </Button>
        <input id="editalarm" type="submit" hidden />
      </form>
    </Box>
  );
};

export default AlarmsForm;
