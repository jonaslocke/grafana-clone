import { Button, Stack, TextField } from "@mui/material";
import { useContext } from "react";
import { AlarmsContext } from "../src/AlarmsContext";
import { searchFormInputs as formInputs } from "../src/FormInputs";
import DeleteIcon from "@mui/icons-material/Delete";

const AlarmsSearch = () => {
  const { nameSearch, setNameSearch, statusSearch, setStatusSearch } =
    useContext(AlarmsContext);
  const controller = {};
  controller.name = nameSearch;
  controller.status = statusSearch;
  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    name === "status" ? setStatusSearch(value) : setNameSearch(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusSearch(nameSearch);
    setNameSearch(statusSearch);
  };
  const isDirty = nameSearch || statusSearch.toString();
  const clearInputs = () => {
    setStatusSearch("");
    setNameSearch("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} sx={{ paddingTop: 2 }}>
          {formInputs.map(({ input, label, select, selectOptions }) => (
            <TextField
              id={input}
              key={input}
              label={label}
              name={input}
              variant="outlined"
              size="small"
              select={select}
              onChange={handleChange}
              value={controller[input]}
              sx={{ minWidth: 150 }}
            >
              {select && selectOptions}
            </TextField>
          ))}

          <Button variant="contained" component="label" htmlFor="submit">
            Search
          </Button>
          {isDirty && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={clearInputs}
            >
              clear
            </Button>
          )}
        </Stack>
        <input id="submit" type="submit" hidden />
      </form>
    </>
  );
};

export default AlarmsSearch;
