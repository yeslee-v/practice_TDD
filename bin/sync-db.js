const models = require("../models");

module.exports = () => {
  return models.sequelize.sync({ force: true }); // 기존에 db가 남아있어도 새로 만들 시 다 날아간다
};
