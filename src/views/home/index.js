import React, { PureComponent } from 'react'

import Button from '../../components/button'

import styles from './styles.css'

class Home extends PureComponent {

  state = {
    counter: 0,
  }

  incrementCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  decrementCounter = () => {
    this.setState({
      counter: this.state.counter - 1,
    })
  }

  render() {
    const { counter } = this.state
    return (
      <div className={styles.grid}>
        <Button btnClicked={this.incrementCounter}>Increment</Button>
        {<div className={styles.counter}>{counter}</div>}
        <Button btnClicked={this.decrementCounter}>Decrement</Button>
      </div>
    )
  }
}

export default Home
