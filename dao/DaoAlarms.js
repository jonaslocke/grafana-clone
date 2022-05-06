import { Alarm } from "../src/Alarm";
import { alarmsPerPage } from "../src/Constants";

const alarms = {};
const data = [];
for (let i = 0; i < 22; i++) {
  data.push(
    new Alarm({
      name: `My alarm ${i + 1}`,
      source: `Server ${i + 1}`,
      metric: "CPU usage",
      trigger: 80,
      paused: i % 2 == 0,
    })
  );
}

alarms.data = data;
alarms.pages = Math.ceil(alarms.data.length / alarmsPerPage);

export { alarms };
