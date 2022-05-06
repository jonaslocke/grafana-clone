import { Pagination, Stack } from "@mui/material";
import { useContext } from "react";
import { alarms } from "../../dao/DaoAlarms";
import { AlarmsContext } from "../../src/AlarmsContext";

const GrafPagination = () => {
  const count = alarms.pages;
  const handleChange = (_, value) => {
    setPage(value);
  };
  const { page, setPage } = useContext(AlarmsContext);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={1}
      sx={{ padding: 2 }}
    >
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default GrafPagination;
