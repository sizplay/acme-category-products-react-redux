import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct } from './store';

const Products = ({ products, categories, deleteProduct }) => {
  if(!products){
    return null;
  }
  return (
    <div>
      <ul>
        {
         products && products.map(product => {
            return (
              <li key={product.id}>
                <div>
                  {product.name}
                  <button onClick={()=> deleteProduct({id: product.id})}>Delete Product</button>
                  <br />
                  {
                    categories ? categories.find(category => category.id === product.categorizedId).name : ''
                  }
                </div>
              </li>
            );
          })
        }
      </ul>
      <Link to='/'>Main menu</Link>
    </div>
  );
}

const mapStateToProps = ({ products, categories }) => {
  return {
    products,
    categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (product) => dispatch(deleteProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
