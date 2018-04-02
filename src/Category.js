import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, createProduct, deleteProductsInCategory } from './store';

const Category = ({ category, deleteCategory, createProduct, products, deleteProductsInCategory }) => {
  if (!category || !products) {
    return null;
  }
  return (
    <div>
      <h1>{category.name}</h1>
      <div>
        <button onClick={() => deleteCategory({ id: category.id }, products)}>Delete Category</button>
        <button onClick={() => createProduct({ id: category.id })}>Create Product</button>
      </div>
      <div>
        <ul>
          {
            products && products.map(product => {
              return (
                <li key={product.id}>
                  {product.name}
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ categories, products }, { id }) => {
  const category = categories.find(category => category.id * 1 === id * 1);
  const filteredProducts = products.filter(product => product.categorizedId * 1 === id * 1);
  return {
    category,
    products: filteredProducts
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCategory: (category, products) => {
      dispatch(deleteCategory(category, history))
      dispatch(deleteProductsInCategory(category, products))
    },
    createProduct: (category) => dispatch(createProduct(category, history))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
