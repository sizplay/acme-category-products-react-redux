const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_category_products_react_redux', {
  logging: false
});

module.exports = conn;
