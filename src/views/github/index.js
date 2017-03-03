import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { getUser, getMembers } from '../../modules/user/actions'

const mapStateToProps = ({ user, member }, { params }) =>
  ({ user: user[params.user], member: member[params.org] })
const mapDispatchToProps = { getUser, getMembers }

class Github extends Component {
  static propTypes = {
    user: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
      html_url: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      location: PropTypes.string,
    }),
    member: PropTypes.arrayOf(PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
      name: PropTypes.string,
    })),
    getUser: PropTypes.func.isRequired,
    getMembers: PropTypes.func.isRequired,
    params: PropTypes.shape({
      org: PropTypes.string,
      user: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    user: {},
    member: [],
  }

  componentWillMount() {
    this.props.getMembers(this.props.params.org)
    this.props.getUser(this.props.params.user)
  }

  componentWillReceiveProps({ params: { user } }) {
    if (user !== this.props.params.user) {
      this.props.getUser(user)
    }
  }

  renderMember = (member) => (
    <Link key={member.login} to={`/github/${this.props.params.org}/${member.login}`}>
      <img width={40} src={member.avatar_url} alt={`${member.name} 's avatar`} />
    </Link>
  )

  render() {
    const { user, member } = this.props
    return (
      <div>
        <p>{member.map(this.renderMember)}</p>
        <div>
          <h1><a href={user.html_url}>{user.name}</a></h1>
          <img src={user.avatar_url} alt={`${user.name} 's avatar`} />
          <p>@{user.login}</p>
          <p>{user.email}</p>
          <p>{user.location}</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Github)
