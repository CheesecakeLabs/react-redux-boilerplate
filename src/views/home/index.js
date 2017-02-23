import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { incrementCounter, decrementCounter } from '../../modules/counter/actions'
import Button from '../../components/button'

const mapStateToProps = (state) => ({
  counter: state.counter,
})

const mapDispatchToProps = {
  increment: incrementCounter,
  decrement: decrementCounter,
}

const Home = ({ counter, increment, decrement }) => (
  <div>
    <Button btnClicked={increment}>Increment</Button>
    <div>{counter}</div>
    <Button btnClicked={decrement}>Decrement</Button>
  </div>
)

Home.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
