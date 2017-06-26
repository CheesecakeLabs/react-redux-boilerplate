import React, { PureComponent } from 'react'

import Button, { ButtonType, ButtonTheme, ButtonSize } from '../../components/button'

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
      <div>
        <div className={styles.grid}>
          <div class={styles.grid_cel}>
            <Button type={ButtonType.BUTTON} theme={ButtonTheme.POSITIVE} onClick={this.incrementCounter}>Increment</Button>
          </div>
          <div class={styles.grid_cel}>
            {<div className={styles.counter}>{counter}</div>}
          </div>
          <div class={styles.grid_cel}>
            <Button type={ButtonType.BUTTON} theme={ButtonTheme.DANGER} onClick={this.decrementCounter}>Decrement</Button>
          </div>
        </div>
        <br/>
        <div className={styles.grid}>
          <div class={styles.grid_cel}>
            <Button>Default</Button>
          </div>
          <div class={styles.grid_cel}>
            <Button size={ButtonSize.SMALL}>Small</Button>
          </div>
          <div class={styles.grid_cel}>
            <Button size={ButtonSize.LARGE}>Larger</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
