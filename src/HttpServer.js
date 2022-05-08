import { alarms } from "../dao/DaoAlarms";
import { Alarm } from "../src/Alarm";

class HttpServer {
  constructor({ uri }) {
    this.uri = uri;
  }
  async getOne(_id) {
    const { data } = alarms;
    const payload = data.find(({ id }) => id === _id);
    return this._responseMessage({ payload, sucess: true });
  }
  async getAll() {}
  async update(payload) {
    try {
      const _id = payload.id;
      alarms.data = alarms.data.map((alarm) =>
        alarm.id === _id ? payload : alarm
      );
      return this.getOne(_id);
    } catch (error) {
      return this._responseMessage({ payload: error, sucess: false });
    }
  }
  async delete(payload) {
    try {
      const _id = payload.id;
      alarms.data = alarms.data.map((alarm) =>
        alarm.id === _id ? { ...payload, deletedOn: new Date() } : alarm
      );
      return this.getOne(_id);
    } catch (error) {
      return this._responseMessage({ payload: error, sucess: false });
    }
  }
  async create({ id, name, source, metric, trigger }) {
    const payload = new Alarm({
      id,
      name,
      source,
      metric,
      trigger,
    });

    alarms.data.push(payload);

    return this._responseMessage({ payload, sucess: true });
  }
  _responseMessage({ payload, sucess }) {
    return {
      data: payload,
      status: sucess ? 200 : 400,
    };
  }
}

const fetchAlarms = new HttpServer({ uri: `http://localhost:3000` });

export { fetchAlarms };
