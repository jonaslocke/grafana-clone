import { Alarm } from "../src/Alarm";
import {
  alarmsPerPage,
  metricOptions,
  triggerConditions,
} from "../src/Constants";

const randomize = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

const alarms = {};
const data = [];
for (let i = 0; i < 32; i++) {
  const alarm = new Alarm({
    name: `My alarm ${i + 1}`,
    source: `Server ${i + 1}`,
    metric: randomize(metricOptions).value,
    triggerCondition: randomize(triggerConditions).value,
    trigger: 80,
  });
  data.push(alarm);
}

data.push(
  new Alarm({
    id: "a9978861-651f-41a4-80db-8353cdc2c7e1",
    name: `My alarm 99`,
    source: `Server 99`,
    metric: randomize(metricOptions).value,
    triggerCondition: randomize(triggerConditions).value,
    trigger: 80,
  })
);

alarms.data = data;
alarms.pages = Math.ceil(alarms.data.length / alarmsPerPage);

export { alarms };
