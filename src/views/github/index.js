import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { getMembers } from '../../modules/user/actions'
import { getUsersFromOrg } from '../../modules/user/selectors'

const mapStateToProps = (state, { params }) => ({
  members: getUsersFromOrg(state, params.org),
})

const mapDispatchToProps = { getMembers }

class Github extends Component {
  static propTypes = {
    members: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
      name: PropTypes.string,
    })),
    getMembers: PropTypes.func.isRequired,
    params: PropTypes.shape({
      org: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    members: new List(),
    children: null,
  }

  componentWillMount() {
    this.props.getMembers(this.props.params.org)
  }

  componentWillReceiveProps({ params: { org } }) {
    if (org !== this.props.params.org) {
      this.props.getMembers(org)
    }
  }

  renderMember = (member) => (
    <Link key={member.get('login')} to={`/github/${this.props.params.org}/${member.get('login')}`}>
      <img width={40} src={member.get('avatar_url')} alt={`${member.get('name')} 's avatar`} />
    </Link>
  )

  render() {
    const { members, children } = this.props
    return (
      <div>
        <ul>
          <li><Link to="/github/facebook">facebook</Link></li>
          <li><Link to="/github/cheesecakelabs">cheesecakelabs</Link></li>
        </ul>
        <p>{members.map(this.renderMember)}</p>
        {children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Github)
