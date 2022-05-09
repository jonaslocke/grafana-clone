import { v4 as uuidv4 } from "uuid";

export class Alarm {
  constructor({
    id,
    name,
    source,
    metric,
    triggerCondition,
    trigger,
    paused = false,
  }) {
    this.id = id || uuidv4();
    this.name = name;
    this.source = source;
    this.metric = metric;
    this.triggerCondition = triggerCondition;
    this.trigger = trigger;
    this.paused = paused;
    this.deletedOn = null;
    this.created = new Date().toISOString();
  }
  pause() {
    this.paused = !this.paused;
    return this.toJson();
  }
  delete() {
    if (this.deletedOn != null) throw "Already deleted";
    this.deletedOn = new Date();
    return this.toJson();
  }
  toJson() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      source: this.source,
      metric: this.metric,
      trigger: this.trigger,
      paused: this.paused,
      deletedOn: this.deletedOn,
    });
  }
}
