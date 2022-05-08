import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const AlarmsForm = () => {
  const route = useRouter();
  const slug = route.query.id;
  const isEditing = slug !== "create";
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  const formInputs = [
    { input: "id", label: "ID", disabled: true },
    { input: "name", label: "Name", disabled: false },
    { input: "source", label: "Source", disabled: false },
    { input: "metric", label: "Metric", disabled: false },
    { input: "trigger", label: "Trigger", disabled: false },
  ];

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {formInputs.map(({ input, label, disabled }) => (
            <Grid item key={input} xs={6}>
              <TextField
                id={input}
                label={label}
                variant="outlined"
                disabled={disabled}
                {...register(input)}
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
