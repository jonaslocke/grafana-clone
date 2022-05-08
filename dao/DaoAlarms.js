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
    })
  );
}
data.push(
  new Alarm({
    id: "5985d811-7db3-4853-836d-b4050882d9dc",
    name: `My alarm 99`,
    source: `Server 99`,
    metric: "CPU usage",
    trigger: 99,
  })
);

alarms.data = data;
alarms.pages = Math.ceil(alarms.data.length / alarmsPerPage);

export { alarms };
