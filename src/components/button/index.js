import React, { Component, PropTypes } from 'react';


class Button extends Component {
  render() {
    const { btnType, btnClicked, children } = this.props;

    return (
      <button type={btnType || 'button'} onClick={btnClicked}>
        {children}
      </button>
    )
  }
}


Button.propTypes = {
  btnType: PropTypes.string,
  btnClicked: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};


export default Button;
