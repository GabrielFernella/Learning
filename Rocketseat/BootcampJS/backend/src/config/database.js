require('dotenv').config();

// use a sintaxe do coomomjs pois o sequelize ainda n entende o import e export
module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // Define por padrão para criar a data de criação de cada registro
    underscored: true,
    underscoredAll: true, // passando a nomeação de tabelas e colunas por andercor, ex: user_groups
  },
};
/*
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // Define por padrão para criar a data de criação de cada registro
    underscored: true,
    underscoredAll: true, // passando a nomeação de tabelas e colunas por andercor, ex: user_groups
  },
};

//instale as dependencias pg & pg-hstore
*/
