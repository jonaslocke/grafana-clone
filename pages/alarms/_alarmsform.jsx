import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAlarms } from "../../src/HttpServer";
import ErrorIcon from "@mui/icons-material/Error";
import { v4 as uuidv4 } from "uuid";

const AlarmsForm = ({ close }) => {
  const route = useRouter();
  const slug = route.query.id;
  const isEditing = slug !== "create";

  const formInputs = [
    { input: "id", label: "ID", disabled: true, type: "text" },
    { input: "name", label: "Name", disabled: false, type: "text" },
    { input: "source", label: "Source", disabled: false, type: "text" },
    { input: "metric", label: "Metric", disabled: false, type: "text" },
    { input: "trigger", label: "Trigger", disabled: false, type: "number" },
  ];

  const [alarm, setAlarm] = useState(
    formInputs
      .map(({ input }) => input)
      .reduce((acc, cur) => {
        return { ...acc, [cur]: "" };
      }, {})
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inError = Boolean(error);

  const load = async () => {
    setLoading(true);
    const response = await fetchAlarms.getOne(slug);
    setLoading(false);
    const { status } = response;
    if (status === 200) {
      setAlarm(response.data);
    } else {
      setError(`We tried to load that alarm, but we failed!`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    isEditing ? await updateAlarm() : await createAlarm();
    close();
  };
  const updateAlarm = async () => {
    setLoading(true);
    const response = await fetchAlarms.update(alarm);
    setLoading(false);
    const { data, status } = response;
    if (status === 200) {
      setAlarm(data);
    } else {
      setError(`We tried to update this alarm, but we failed!`);
    }
  };
  const createAlarm = async () => {
    setLoading(true);
    const response = await fetchAlarms.create(alarm);
    setLoading(false);
    const { status } = response;
    if (status !== 200) {
      setError("An error ocurred, the alarm was not created!");
    }
  };

  const handleChange = (event) => {
    const input = event.target.id;
    setAlarm({ ...alarm, [input]: event.target.value });
  };

  useEffect(() => {
    if (slug && isEditing) {
      load();
    }
  }, [slug]);

  useEffect(() => {
    if (!isEditing) {
      setAlarm(
        formInputs
          .map(({ input }) => input)
          .reduce((acc, cur) => {
            return { ...acc, [cur]: cur === "id" ? uuidv4() : "" };
          }, {})
      );
    }
  }, [slug]);

  const form = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {formInputs.map(({ input, label, disabled, type }) => (
          <Grid item key={input} xs={6}>
            <TextField
              onChange={handleChange}
              value={alarm[input]}
              id={input}
              label={label}
              variant="outlined"
              disabled={disabled}
              sx={{ width: 1 }}
              required={true}
              type={type}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        component="label"
        htmlFor="editalarm"
        sx={{ marginTop: 2, float: "right", paddingY: 2, paddingX: 5 }}
      >
        {isEditing ? "Update Alarm" : "Create Alarm"}
      </Button>
      <input id="editalarm" type="submit" hidden />
    </form>
  );

  const errorMessage = () => {
    return (
      <Stack
        direction={"row"}
        height={200}
        justifyContent="center"
        alignItems="center"
        spacing={3}
        onClick={close}
      >
        <ErrorIcon color="error" fontSize={"large"} />
        <Typography variant="h5" noWrap component="div" color={"error"}>
          {error}
        </Typography>
      </Stack>
    );
  };

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
      {inError ? errorMessage() : form()}
    </Box>
  );
};

export default AlarmsForm;
