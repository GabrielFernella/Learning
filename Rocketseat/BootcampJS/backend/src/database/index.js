import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// Importando os Models para passar as conexões para os mesmos
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

// Esse array vai percorrer todos os models da aplicação para passar a conexão para as mesmas
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig); // Realiza a conexão com o banco de dados

    // percorrendo cada um dos models passando a conexão
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
    // Map para pegar as associações entreas tabelas, ele apenas executa se o model de associate existir
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      // 'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
}

export default new Database();
