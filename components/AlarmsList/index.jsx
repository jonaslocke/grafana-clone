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
import { alarms as alarmsData } from "../../dao/DaoAlarms";
import { capitalize } from "../../src/util";
import GrafPagination from "./GrafPagination";
import { AlarmsContext } from "../../src/AlarmsContext";
import { useContext, useEffect, useState } from "react";
import { alarmsPerPage } from "../../src/Constants";

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
  const pauseAlarm = async (alarm) => {
    console.log("pauseAlarm", alarm.id);
  };
  const resumeAlarm = async (alarm) => {
    console.log("resumeAlarm", alarm.id);
  };
  const deleteAlarm = async (alarm) => {
    console.log("deleteAlarm", alarm.id);
  };
  const getStatusIcon = (alarm) => {
    const { paused } = alarm;
    return paused ? "true" : "false";
  };
  const getActions = (alarm) => {
    const actions = [
      { label: "edit", color: "primary", callback: pauseAlarm },
      { label: "del", color: "error", callback: deleteAlarm },
      { label: "resume", color: "secondary", callback: resumeAlarm },
    ];
    return (
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        {actions.map(({ label, color, callback }, id) => (
          <Button key={id} color={color} onClick={() => callback(alarm)}>
            {label}
          </Button>
        ))}
      </Stack>
    );
  };

  const { page } = useContext(AlarmsContext);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const end = page * alarmsPerPage - 1;
    const start = end - alarmsPerPage + 1;
    setAlarms(alarmsData.data.slice(start, end));
  }, [page]);

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
          {alarms.map((row) => (
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
