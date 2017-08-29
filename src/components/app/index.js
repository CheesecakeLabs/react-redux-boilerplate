import PropTypes from 'prop-types'
import React, { Component } from 'react'

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <header>This is the app header</header>

        <main>{children}</main>

        <footer>This is the app footer</footer>
      </div>
    )
  }
}

export default App
