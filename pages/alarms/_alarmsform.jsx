import ErrorIcon from "@mui/icons-material/Error";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { formInputs } from "../../src/FormInputs";
import { fetchAlarms } from "../../src/HttpServer";

const AlarmsForm = ({ close }) => {
  const route = useRouter();
  const slug = route.query.id;
  const isEditing = slug !== "create";

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
    let isValid = true;
    for (const prop in alarm) {
      const { rules } = formInputs.find(({ input }) => input === prop);
      isValid = isValid && !rules(alarm[prop]);
      if (!isValid) return;
    }
    if (!isValid) return alert("form not valid");
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
    const { name, value } = event.target;
    setAlarm({ ...alarm, [name]: value });
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
        {formInputs.map(
          ({
            input,
            label,
            disabled,
            type,
            rules,
            errorMessage,
            size,
            select,
            selectOptions,
          }) => (
            <Grid item key={input} xs={size}>
              <TextField
                onChange={handleChange}
                value={alarm[input]}
                id={input}
                name={input}
                label={label}
                variant="outlined"
                disabled={disabled}
                sx={{ width: 1 }}
                required={true}
                type={type}
                error={rules(alarm[input])}
                helperText={rules(alarm[input]) && errorMessage}
                select={select}
              >
                {select && selectOptions}
              </TextField>
            </Grid>
          )
        )}
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
