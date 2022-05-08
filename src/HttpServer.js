import { alarms } from "../dao/DaoAlarms";
class HttpServer {
  constructor({ uri }) {
    this.uri = uri;
  }
  async getOne(_id) {
    const { data } = alarms;
    const alarm = data.find(({ id }) => id === _id);
    return {
      data: alarm,
      status: alarm ? 200 : 400,
    };
  }
  async getAll() {}
  async update(_id) {}
  async delete(_id) {}
}

const fetchAlarms = new HttpServer({ uri: `http://localhost:3000` });

export { fetchAlarms };
