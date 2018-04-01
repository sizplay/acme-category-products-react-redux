const conn = require('./conn');
const { Sequelize } = conn;

const Products = conn.define('products', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = Products;
