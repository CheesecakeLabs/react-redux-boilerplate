import React, { PropTypes } from 'react';


class App extends Component {
  render() {
    return {children}
  }
}


App.propTypes = {
  children: PropTypes.any.isRequired,
};


export default App;
