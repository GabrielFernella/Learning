import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // add apenas as colunas que serão alteradas pelo user
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // campo que não será inserido no banco
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Relacionando com o model de file
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); // id de arquivo sendo armazenado no model de usuário // pertence a um
  }

  // Métodos da classe
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // retorna true ou false
  }
}

export default User;
