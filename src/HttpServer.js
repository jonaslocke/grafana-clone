import { alarms } from "../dao/DaoAlarms";
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
    const _id = payload.id;
    const { data } = alarms;
    alarms.data = data.map((alarm) => (alarm.id === _id ? payload : alarm));
    return this.getOne(_id);
  }
  async delete(_id) {}
  _responseMessage({ payload, sucess }) {
    return {
      data: payload,
      status: sucess ? 200 : 400,
    };
  }
}

const fetchAlarms = new HttpServer({ uri: `http://localhost:3000` });

export { fetchAlarms };
