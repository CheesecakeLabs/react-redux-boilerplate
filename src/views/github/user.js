import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { selectPage, selectPageResults } from '@cheesecakelabs/boilerplate/selectors/pagination'

import { getUser, getRepos, GET_REPOS } from '_modules/user/actions'
import Button from '_components/button'

const mapStateToProps = (state, { params, location }) => {
  const page = selectPage(state, GET_REPOS.ACTION, {
    user: params.user,
    ...location.query,
  })
  return {
    user: state.user.get(params.user),
    repos: selectPageResults(page, state.repos),
  }
}

const mapDispatchToProps = { getUser, getRepos }

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
    repos: ImmutablePropTypes.list.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    params: PropTypes.shape({
      user: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        page: PropTypes.string,
      }),
    }).isRequired,
  }

  static defaultProps = {
    user: new Map(),
  }

  componentWillMount() {
    this.props.getUser(this.props.params.user)
    this.props.getRepos(this.props.params.user, { ...this.props.location.query })
  }

  componentWillReceiveProps({ params: { user }, location: { query } }) {
    if (user !== this.props.params.user) {
      this.props.getUser(user)
      this.props.getRepos(this.props.params.user, { ...query })
    }
    if (query.page !== this.props.location.query.page) {
      this.props.getRepos(this.props.params.user, { ...query })
    }
  }

  goToPage = page => {
    const currLocation = browserHistory.getCurrentLocation()
    browserHistory.replace({
      pathname: currLocation.pathname,
      query: {
        ...currLocation.query,
        page,
      },
    })
  }

  render() {
    const { user, repos } = this.props
    return (
      <div>
        <h1>
          <a href={user.get('html_url')}>{user.get('name')}</a>
        </h1>

        <p>
          <Button onClick={this.goToPage} onClickWith={1}>
            1
          </Button>
          <Button onClick={this.goToPage} onClickWith={2}>
            2
          </Button>
          <Button onClick={this.goToPage} onClickWith={3}>
            3
          </Button>
        </p>
        {repos.map(repo => <p key={repo.hashCode()}>{repo.get('full_name')}</p>)}

        <img src={user.get('avatar_url')} alt={`${user.get('name')} 's avatar`} />
        <p>@{user.get('login')}</p>
        <p>{user.get('email')}</p>
        <p>{user.get('location')}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
