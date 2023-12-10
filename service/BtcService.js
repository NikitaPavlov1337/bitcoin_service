import DB from '../db/db.js';

/** Класс Сервис, который общается с экземпляром класса БД
 * @param {Object} data
 * @param {String} startDate
 * @param {String} finishDate
 */

class BtcService {
  async create(data) {
    await DB._model.create(data);
  }
  async getAll() {
    const data = await DB._model.find();
    return data;
  }
  async createMany(data) {
    await DB._model.insertMany(data);
  }
  async getLastDate() {
    let result = await DB._model.find().sort({ date: -1 }).limit(1);
    return result ? result[0]?.date : false;
  }
  async getDataByPeriod({ startDate, finishDate }) {
    let fnDate = new Date(finishDate);
    return DB._model.find({
      date: {
        $gte: new Date(startDate).toISOString(),
        $lte: fnDate.setDate(fnDate.getDate() + 1),
      },
    });
  }
}
export default new BtcService();
