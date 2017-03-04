import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { getUser } from '../../modules/user/actions'

const mapStateToProps = ({ user }, { params }) =>
  ({ user: user[params.user] })
const mapDispatchToProps = { getUser }

class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
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
    user: {},
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
        <h1><a href={user.html_url}>{user.name}</a></h1>
        <img src={user.avatar_url} alt={`${user.name} 's avatar`} />
        <p>@{user.login}</p>
        <p>{user.email}</p>
        <p>{user.location}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
