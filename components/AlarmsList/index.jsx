import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { alarms as alarmsData } from "../../dao/DaoAlarms";
import { AlarmsContext } from "../../src/AlarmsContext";
import { alarmsPerPage } from "../../src/Constants";
import { capitalize } from "../../src/util";
import GrafPagination from "./GrafPagination";
import { fetchAlarms } from "../../src/HttpServer";
import { useRouter } from "next/router";

const headers = [
  "id",
  "name",
  "source",
  "metric",
  "trigger",
  "paused",
  "actions",
];

const AlarmsList = () => {
  const router = useRouter();
  const togglePause = async (alarm) => {
    const response = await fetchAlarms.update({
      ...alarm,
      paused: !alarm.paused,
    });
    const { status } = response;
    if (status !== 200) {
      return alert(
        `Error trying to ${alarm.paused ? "resume" : "pause"} the alarm`
      );
    }
    loadAlarms();
  };

  const deleteAlarm = async (alarm) => {
    const confirm = window.confirm(`Delete alarm ${alarm.id}`);
    if (confirm) {
      const response = await fetchAlarms.delete(alarm);
      const { status } = response;
      if (status !== 200) return alert("Error trying to delete the alarm");
      loadAlarms();
    }
  };
  const editAlarm = async (alarm) => {
    const { id } = alarm;
    router.push(`/alarms/${id}`);
  };

  const getStatusIcon = (alarm) => {
    const { paused } = alarm;
    return paused ? "true" : "false";
  };
  const getActions = (alarm) => {
    const { paused } = alarm;
    const actions = [
      { label: "edit", color: "primary", callback: editAlarm },
      { label: "del", color: "error", callback: deleteAlarm },
      {
        label: paused ? "resume" : "pause",
        color: "secondary",
        callback: togglePause,
      },
    ];
    return (
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        {actions.map(({ label, color, callback }, id) => (
          <Button
            key={id}
            color={color}
            onClick={() => callback(alarm)}
            sx={{ width: 80 }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    );
  };

  const loadAlarms = () =>
    setAlarms(alarmsData.data.filter(({ deletedOn }) => !deletedOn));
  const { page, setPage, setPages, nameSearch, statusSearch } =
    useContext(AlarmsContext);
  const [alarms, setAlarms] = useState([]);
  const [paginatedAlarms, setPaginatedAlarms] = useState([]);

  useEffect(() => {
    setPages(Math.ceil(alarmsData.data.length / alarmsPerPage));
  }, []);

  useEffect(() => {
    const end = page * alarmsPerPage - 1;
    const start = end - alarmsPerPage + 1;
    setPaginatedAlarms(alarms.slice(start, end));
  }, [alarms, page]);

  useEffect(() => {
    const filteredAlarms = alarmsData.data.filter(({ name }) => {
      const searchTerms = nameSearch.split(" ");
      return searchTerms.every((term) => name.match(new RegExp(term, "i")));
    });
    setAlarms(filteredAlarms);
    setPage(1);
    setPages(Math.ceil(filteredAlarms.length / alarmsPerPage));
  }, [nameSearch]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 6 }}>
      <Table aria-label="List of alarms">
        <TableHead>
          <TableRow>
            {headers
              .filter((head) => head != "id")
              .map((head, id) => (
                <TableCell key={id} align={id != 0 ? "right" : "left"}>
                  {capitalize(head)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedAlarms.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers
                .filter((head) => head != "id")
                .map((head, id) => (
                  <TableCell
                    component="th"
                    scope="row"
                    key={id}
                    align={id != 0 ? "right" : "left"}
                  >
                    {head === "paused"
                      ? getStatusIcon(row)
                      : head === "actions"
                      ? getActions(row)
                      : row[head]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <GrafPagination />
    </TableContainer>
  );
};

export default AlarmsList;
