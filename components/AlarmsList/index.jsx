import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { alarms as alarmsData } from "../../dao/DaoAlarms";
import { AlarmsContext } from "../../src/AlarmsContext";
import { alarmsPerPage, headers } from "../../src/Constants";
import { GlobalContext } from "../../src/GlobalContext";
import { fetchAlarms } from "../../src/HttpServer";
import { capitalize } from "../../src/util";
import GrafPagination from "./GrafPagination";

const AlarmsList = () => {
  const router = useRouter();
  const { page, setPage, setPages, nameSearch, statusSearch } =
    useContext(AlarmsContext);
  const { alarms, setAlarms } = useContext(GlobalContext);

  const [paginatedAlarms, setPaginatedAlarms] = useState([]);

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
      {
        label: "edit",
        color: "primary",
        callback: editAlarm,
        variant: "outlined",
        icon: null,
        size: 80,
      },
      {
        label: "del",
        color: "error",
        callback: deleteAlarm,
        variant: "outlined",
        icon: null,
        size: 80,
      },
      {
        label: paused ? "resume" : "pause",
        color: paused ? "success" : "error",
        callback: togglePause,
        variant: "contained",
        icon: paused ? (
          <PlayCircleFilledWhiteIcon fontSize="small" />
        ) : (
          <PauseCircleIcon fontSize="small" />
        ),
        size: 110,
      },
    ];
    return (
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        {actions.map(({ label, color, callback, variant, icon, size }, id) => (
          <Button
            key={id}
            color={color}
            onClick={() => callback(alarm)}
            sx={{ width: size }}
            variant={variant}
            startIcon={icon}
          >
            {label}
          </Button>
        ))}
      </Stack>
    );
  };

  const loadAlarms = () =>
    setAlarms(alarmsData.data.filter(({ deletedOn }) => !deletedOn));

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
    setPages(Math.ceil(filteredAlarms.length / alarmsPerPage));
  }, [nameSearch]);

  useEffect(() => {
    if (statusSearch !== "") {
      const filteredAlarms = alarmsData.data.filter(
        ({ paused }) => paused === statusSearch
      );
      setAlarms(filteredAlarms);
      setPages(Math.ceil(filteredAlarms.length / alarmsPerPage));
    }
  }, [statusSearch]);

  useEffect(() => {
    setPage(1);
    if (!nameSearch && !statusSearch.toString()) loadAlarms();
  }, [nameSearch, statusSearch]);

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
