import { v4 as uuidv4 } from "uuid";

export class Alarm {
  constructor({ name, source, metric, trigger, paused }) {
    this.id = uuidv4();
    this.name = name;
    this.source = source;
    this.metric = metric;
    this.trigger = trigger;
    this.paused = paused;
  }
  togglePause() {
    this.paused = !this.paused;
  }
}
