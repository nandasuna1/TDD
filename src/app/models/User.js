const bcrypt = require("bcryptjs");
const jtw = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );

  //foi usada uma function e não uma arrow func pois era preciso usar
  // o this como variavel a nivel de objeto, a instancia do usuário
  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.generateToken = function () {
    return jtw.sign({ id: this.id }, process.env.APP_SECRET);
  };

  return User;
};
