import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Helmet from 'react-helmet'

import { getUser, GET_USER } from '_modules/user/actions'
import { user as userReducer } from '_modules/user/reducers'
import { get } from '_services/user'

const mapStateToProps = ({ user }, { params }) => ({
  user: user.get(params.user),
})

const mapDispatchToProps = { getUser }

class User extends Component {
  static propTypes = {
    user: ImmutablePropTypes.contains({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
      html_url: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      location: PropTypes.string,
    }),
    getUser: PropTypes.func.isRequired,
    params: PropTypes.shape({
      user: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    user: new Map(),
  }

  static getData({ user }) {
    return [
      get(user).then(payload => ({
        user: userReducer(undefined, {
          type: GET_USER.FULFILLED,
          payload,
        }),
      })),
    ]
  }

  componentWillMount() {
    this.props.getUser(this.props.params.user)
  }

  componentWillReceiveProps({ params: { user } }) {
    if (user !== this.props.params.user) {
      this.props.getUser(user)
    }
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Helmet>
          <title>{user.get('name')}</title>
        </Helmet>
        <h1>
          <a href={user.get('html_url')}>{user.get('name')}</a>
        </h1>
        <img src={user.get('avatar_url')} alt={`${user.get('name')} 's avatar`} />
        <p>@{user.get('login')}</p>
        <p>{user.get('email')}</p>
        <p>{user.get('location')}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
