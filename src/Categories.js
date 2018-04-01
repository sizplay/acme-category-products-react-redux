import React from 'react';
import { connect } from 'react-redux';
import { createCategory } from './store';
import { Link } from 'react-router-dom';

const Categories = ({ categories, createCategory, products }) => {
  return (
    <div>
      <ul>
        <li>
          <button onClick={() => createCategory()}>Create a category</button>
        </li>
        <li>
          <Link to='/products'>All Products ({products.length})
          </Link>
        </li>
        {
          categories.map(category => {
            return (
              <li key={category.id}>
                <Link to={`/${category.id}`} >
                  {`${category.name} (${category.categories ? category.categories.length : 0})`}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = ({ categories, products }) => {
  return {
    categories,
    products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: () => {
      return dispatch(createCategory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
