const drawerWidth = 240;
const alarmsPerPage = 7;
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

export {
  drawerWidth,
  alarmsPerPage,
  metricOptions,
  triggerConditions,
  alarmStatus,
};
