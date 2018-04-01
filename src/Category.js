import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, createProduct } from './store';

const Category = ({ category, deleteCategory, createProduct, products }) => {
  if (!category || !products) {
    return null;
  }
  return (
    <div>
      <h1>{category.name}</h1>
      <ul>
        {
          category && category.categories.map( product => {
            return (
              <li key={product.id}>
                {product.name}
              </li>
            );
          })
        }
      </ul>
      <div>
        <button onClick={()=> deleteCategory({id: category.id})}>Delete Category</button>
        <button onClick={()=> createProduct({id: category.id})}>Create Product</button>
      </div>
      <Link to='/'>Main menu</Link>
    </div>
  );
};

const mapStateToProps = ({ categories, products }, { id }) => {
  const category = categories.find(category => category.id*1 === id);
  return {
    category,
    products
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCategory: (category) => dispatch(deleteCategory(category, history)),
    createProduct: (category) => dispatch(createProduct(category, history))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
