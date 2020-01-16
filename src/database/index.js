import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection, Sequelize.DataTypes))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const MONGO_URL = `mongodb://${process.env.APP_MONGO_USER}:${process.env.APP_MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.APP_MONGO_DB}`;
    this.mongoConnection = mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
