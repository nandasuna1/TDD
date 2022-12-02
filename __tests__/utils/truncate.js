/**
 * Esse arquivo é responsável por limpar os dados da tabela
 * para que os dados criados num teste não interfiram uns nos outros
    
obs: o truncate retorna promises, por isso ultilizamos o 
Promise all, pois assim iremos encapissular todas as promises em uma só
*/
const { sequelize } = require("../../src/app/models");

module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map((key) => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
};
