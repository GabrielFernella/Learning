module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // Qual a tabela
      'avatar_id', // nome da coluna
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' }, // Referenciando a tabela files da coluna id
        onUpdate: 'CASCADE', // faz com que a alteração tbm ocorra aqui dentro
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
