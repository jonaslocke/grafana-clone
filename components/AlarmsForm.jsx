import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const AlarmsForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const inError = Object.values(data).every((value) => !value);
    if (inError) return alert("Fill at least one field");
    console.log(data);
  };
  const formInputs = [
    { input: "name", label: "Name Filter" },
    { input: "status", label: "Status Filter" },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2} sx={{ paddingTop: 2 }}>
        {formInputs.map(({ input, label }) => (
          <TextField
            id={input}
            key={input}
            label={label}
            variant="outlined"
            {...register(input)}
            size="small"
          />
        ))}

        <Button variant="contained" component="label" htmlFor="submit">
          Submit
        </Button>
      </Stack>
      <input id="submit" type="submit" hidden />
    </form>
  );
};

export default AlarmsForm;
