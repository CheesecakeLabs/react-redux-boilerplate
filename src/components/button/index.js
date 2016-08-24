import React, { PropTypes } from 'react'


const Button = ({ btnType, btnClicked, children }) => (
  <button type={btnType || 'button'} onClick={btnClicked}>
    {children}
  </button>
)


Button.propTypes = {
  btnType: PropTypes.string,
  btnClicked: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}


export default Button
