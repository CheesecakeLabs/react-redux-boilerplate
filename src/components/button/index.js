import React, { Component } from 'react'


class Button extends Component {
  render() {
    const { btnType, btnLabel, btnClicked } = this.props

    <button type={btnType} className="button" onClick={btnClicked}>
      {btnLabel}
    </button>
  }
}


Button.propTypes = {
  btnType: PropTypes.string,
  btnLabel: PropTypes.string.isRequired,
  btnClicked: PropTypes.func.isRequired,
}


export default Button
