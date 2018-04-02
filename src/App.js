import React, { Component } from 'react';
import { loadCategories, loadProducts } from './store';
import { connect } from 'react-redux';
import Category from './Category';
import Categories from './Categories';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './Products';

class App extends Component {

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadProducts();
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <div>
              <Route exact component={Categories} />
              <Route exact path='/:id' render={({ match, history }) => <Category id={match.params.id * 1} history={history} />} />
              <Route exact path='/products' render={() => <Products />} />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadProducts: () => dispatch(loadProducts())
  };
}

export default connect(null, mapDispatchToProps)(App);
