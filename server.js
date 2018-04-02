const express = require('express');
const app = express();
const db = require('./db');
const { Category, Products } = db.models;
const path = require('path');

app.use(require('body-parser').json());
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/api/products', (req, res, next)=> {
  Products.findAll()
  .then( products => res.send(products))
  .catch(next);
});

app.get('/api/categories', (req, res, next)=> {
  Category.findAll({
    include: [
      { model: Products, as: 'categories' }//model => products, but alias name is category name
    ]
  })
  .then( categories => res.send(categories))
  .catch(next);
});

app.post('/api/categories', (req, res, next) => {
  Category.create(req.body)
  .then( category => res.send(category))
  .catch(next);
});

app.post('/api/products', (req, res, next) => {
  Products.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

app.delete('/api/categories/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => {
      return category.destroy();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next) => {
  Products.findById(req.params.id)
    .then(product => {
      return product.destroy();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));


db.sync()
  .then(()=> db.seed());

