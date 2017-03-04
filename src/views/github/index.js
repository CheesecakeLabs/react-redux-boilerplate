import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { getMembers } from '../../modules/user/actions'

const mapStateToProps = ({ member }, { params }) =>
  ({ member: member[params.org] })
const mapDispatchToProps = { getMembers }

class Github extends Component {
  static propTypes = {
    member: PropTypes.arrayOf(PropTypes.shape({
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
    member: [],
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
    <Link key={member.login} to={`/github/${this.props.params.org}/${member.login}`}>
      <img width={40} src={member.avatar_url} alt={`${member.name} 's avatar`} />
    </Link>
  )

  render() {
    const { member, children } = this.props
    return (
      <div>
        <p>{member.map(this.renderMember)}</p>
        {children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Github)
