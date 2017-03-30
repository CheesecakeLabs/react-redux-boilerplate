import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Map, List, fromJS } from 'immutable'
import { browserHistory } from 'react-router'

import { login, AUTH_LOGIN } from '../../modules/auth/actions'

const mapStateToProps = ({ loading, error, auth, routing }) => {
  const nextRoute = fromJS(routing).getIn(['locationBeforeTransitions', 'state', 'next'])
  return {
    isLoading: loading.get(AUTH_LOGIN.ACTION),
    errors: error.get(AUTH_LOGIN.ACTION),
    auth,
    nextRoute: nextRoute && nextRoute.toJS(),
  }
}

const mapDispatchToProps = { login }

class User extends Component {
  static propTypes = {
    login: PropTypes.func,
    isLoading: PropTypes.bool,
    errors: ImmutablePropTypes.map,
    nextRoute: PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.object,
    }),
  }

  static defaultProps = {
    login: () => {},
    isLoading: false,
    errors: new Map(),
    nextRoute: undefined,
  }

  state = {
    username: '',
    password: '',
  }

  componentWillReceiveProps({ auth, nextRoute }) {
    if (auth.get('key')) {
      console.info('🙋 parabéns!')
      if (nextRoute) {
        browserHistory.replace(nextRoute)
      }
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
