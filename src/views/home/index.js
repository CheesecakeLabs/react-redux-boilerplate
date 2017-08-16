import React, { PureComponent } from 'react'
import PropTypes from 'react-proptypes'
import { graphql } from 'react-apollo'

import getUsers from '../../graphql/github/get-users.graphql'

class Home extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    organization: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      members: PropTypes.arrayOf(PropTypes.object),
    }),
  }

  static defaultProps = {
    organization: {
      name: '',
      url: '',
      members: [],
    },
  }

  render() {
    const { isLoading, organization } = this.props
    console.log(this.props.isLoading, this.props.organization)
    return (
      <div>
        {isLoading.toString()} - {organization.name} - {organization.url}
      </div>
    )
  }
}

export default graphql(getUsers, {
  props: (props) => {
    console.log('aqui', props)
    const { data: { loading, organization } } = props
    return {
      isLoading: loading,
      organization,
    }
  },
  options: {
    ssr: true,
  },
})(Home)
