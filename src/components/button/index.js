import React, { PropTypes } from 'react'

import './button.css'

const Button = ({ btnType, btnClicked, children }) => (
  <button className="button" type={btnType || 'button'} onClick={btnClicked}>
    {children}
  </button>
)

Button.propTypes = {
  btnType: PropTypes.string,
  btnClicked: PropTypes.func,
  children: PropTypes.any.isRequired,
}

export default Button
