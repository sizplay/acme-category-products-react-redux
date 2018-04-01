
const conn = require('./conn');
const Category = require('./Category');
const Products = require('./Products');


Products.belongsTo(Category, { as: 'categorized' });
Category.hasMany(Products, { as: 'categories', foreignKey: 'categorizedId', onDelete: 'CASCADE' });


const sync = () => {
  return conn.sync({ force: true })
};

const seed = () => {
  return Promise.all([
    Products.create({ name: '1-Product' }),
    Products.create({ name: '2-Product' }),
    Products.create({ name: '3-Product' }),
    Products.create({ name: '4-Product' }),
    Products.create({ name: '5-Product' }),
    Products.create({ name: '6-Product' }),
    Products.create({ name: '7-Product' }),
    Products.create({ name: '8-Product' }),
    Products.create({ name: '9-Product' }),
    Category.create({ name: '123-Category' }),
    Category.create({ name: '234-Category' }),
    Category.create({ name: '345-Category' }),
  ])
    .then(([one, two, three, four, five, six, seven, eight, nine, oneCategory, twoCategory, threeCategory]) => {
      return Promise.all([
        one.setCategorized(oneCategory),
        two.setCategorized(oneCategory),
        three.setCategorized(oneCategory),
        four.setCategorized(oneCategory),
        five.setCategorized(threeCategory),
        six.setCategorized(twoCategory),
        seven.setCategorized(threeCategory),
        eight.setCategorized(twoCategory),
        nine.setCategorized(threeCategory),
      ])
    })
};

module.exports = {
  sync,
  seed,
  models: {
    Category,
    Products
  }
};

