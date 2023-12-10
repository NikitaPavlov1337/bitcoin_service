import convict from 'convict';
import fs from 'fs';
import dotenv from 'dotenv';

// Класс конфиг - в него записываются данные необходимые для приложения

dotenv.config();

const PREFIX = 'BTC';
class Config {
  constructor(schema) {
    this.schema = schema;
    this.convict = convict(schema);
    const filePath = `config/${this.convict.get('env')}.json`;
    if (fs.existsSync(filePath)) {
      this.convict.loadFile(filePath);
    }
    this.validate();
  }
  get(path) {
    return this.convict.get(path);
  }

  validate() {
    this.convict.validate({
      allowed: 'strict',
    });
  }
}

const config = new Config({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'production',
    example: 'production',
    env: `${PREFIX}_NODE_ENV`,
  },
  server: {
    port: {
      doc: 'Port of connection to server express',
      format: Number,
      default: process.env.PORT,
      env: `${PREFIX}_SERVER_PORT`,
    },
  },
  mongo: {
    url: {
      doc: 'Full URL of connection to mongodb',
      format: String,
      default: 'mongodb://localhost:27017/btc',
      example: 'mongodb://localhost:27017/btc',
      env: `${PREFIX}_MONGODB_URL`,
    },
  },
  api: {
    key: {
      doc: 'Key for making call',
      format: String,
      default: process.env.API_KEY,
    },
    url: {
      doc: 'Url to making call',
      format: String,
      default: process.env.API_URL,
    },
  },
});

export default config;
