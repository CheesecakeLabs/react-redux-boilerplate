import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Map, List } from 'immutable'

import { login, AUTH_LOGIN } from '../../modules/auth/actions'

const mapStateToProps = ({ loading, error, auth }) => ({
  isLoading: loading.get(AUTH_LOGIN.ACTION),
  errors: error.get(AUTH_LOGIN.ACTION),
  auth,
})

const mapDispatchToProps = { login }

class User extends Component {
  static propTypes = {
    login: PropTypes.func,
    isLoading: PropTypes.bool,
    errors: ImmutablePropTypes.map,
  }

  static defaultProps = {
    login: () => {},
    isLoading: false,
    errors: new Map(),
  }

  state = {
    username: '',
    password: '',
  }

  componentWillReceiveProps({ auth }) {
    if (auth.get('key')) {
      console.info('🙋 parabéns!')
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.login(username, password)
  }

  getErrors = () => {
    const { errors, isLoading } = this.props
    if (errors.size > 0 && !isLoading) {
      return errors.get('non_field_errors', new List(['unknown error'])).first()
    }
    return null
  }

  handleInput = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { username, password } = this.state
    const { isLoading } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Login: </h2>
        <div>
          <p>Username:</p>
          <input name="username" value={username} onChange={this.handleInput} />
        </div>
        <div>
          <p>Password:</p>
          <input type="password" name="password" value={password} onChange={this.handleInput} />
        </div>
        <button type="submit" disabled={isLoading}>Login</button>
        {this.getErrors()}
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
