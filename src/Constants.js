const drawerWidth = 240;
const alarmsPerPage = 8;
const metricOptions = [
  { value: "cpu", label: "CPU" },
  { value: "memory", label: "Memory" },
  { value: "fs", label: "FS usage" },
];
const triggerConditions = [
  { value: "higher", label: "> Higher than" },
  { value: "lower", label: "< Lower than" },
];
const alarmStatus = [
  { value: true, label: "Paused" },
  { value: false, label: "Running" },
];
const headers = [
  "id",
  "name",
  "source",
  "metric",
  "trigger",
  "paused",
  "actions",
];

export {
  drawerWidth,
  alarmsPerPage,
  metricOptions,
  triggerConditions,
  alarmStatus,
  headers,
};
