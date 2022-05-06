import { Pagination, Stack } from "@mui/material";
import { useContext } from "react";
import { AlarmsContext } from "../../src/AlarmsContext";

const GrafPagination = () => {
  const handleChange = (_, value) => {
    setPage(value);
  };
  const { page, setPage, pages } = useContext(AlarmsContext);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={1}
      sx={{ padding: 2 }}
    >
      <Pagination
        count={pages}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default GrafPagination;
