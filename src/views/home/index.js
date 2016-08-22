import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { increment, decrement } from '../../modules/counter/actions';
import Button from '../../components/button';


const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    increment,
    decrement,
  }, dispatch);
};


class Home extends Component {
  render() {
    const {counter, increment, decrement} = this.props;

    return (
      <div>
        <Button btnClicked={increment}>Increment</Button>
        <div>{counter}</div>
        <Button btnClicked={decrement}>Decrement</Button>
      </div>
    );
  }
}


Home.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
