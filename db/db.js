import mongoose from 'mongoose';
import config from '../config/config.js';

// Инициализация класса БД, модели и методов

const db = mongoose;
const Btc = new mongoose.Schema({
  price: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
});

let model = mongoose.model('Btc', Btc);

class DB {
  constructor(db, Btc, config, model) {
    this.db = db;
    this._schema = Btc;
    this._config = config;
    this._model = model;
  }
  async dbConnecting() {
    return this.db.connect(this._config.get('mongo.url'));
  }

  async dbClose() {
    return this.db.disconnect();
  }
}

export default new DB(db, Btc, config, model);
