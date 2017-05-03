import PropTypes from 'prop-types'
import React from 'react'

const Button = ({ btnType, btnClicked, children }) => (
  <button type={btnType} onClick={btnClicked}>
    {children}
  </button>
)

Button.propTypes = {
  btnType: PropTypes.string,
  btnClicked: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  btnType: 'button',
}

export default Button
