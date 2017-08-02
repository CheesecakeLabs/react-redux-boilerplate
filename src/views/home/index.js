import React, { PureComponent } from 'react'

import Button, { ButtonType, ButtonTheme, ButtonSize } from '_components//button'

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
          <div>
            <Button
              type={ButtonType.BUTTON}
              theme={ButtonTheme.POSITIVE}
              onClick={this.incrementCounter}
            >
              Increment
            </Button>
          </div>
          <div>
            {<div className={styles.counter}>{counter}</div>}
          </div>
          <div>
            <Button
              type={ButtonType.BUTTON}
              theme={ButtonTheme.DANGER}
              onClick={this.decrementCounter}
            >
              Decrement
            </Button>
          </div>
        </div>
        <br />
        <div className={styles.grid}>
          <div>
            <Button>Default</Button>
          </div>
          <div>
            <Button size={ButtonSize.SMALL}>Small</Button>
          </div>
          <div>
            <Button size={ButtonSize.LARGE}>Larger</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
