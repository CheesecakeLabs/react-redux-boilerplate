import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.css'

export const ButtonType = {
  BUTTON: 'button',
  RESET: 'reset',
  SUBMIT: 'submit',
}

export const ButtonTheme = {
  DEFAULT: 'default',
  POSITIVE: 'positive',
  DANGER: 'danger',
}

export const ButtonSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
}

const Button = ({ type, onClick, children, theme, size }) => {
  const className = `${styles.button} ${styles[theme]} ${styles[size]}`
  return (<button type={type} onClick={onClick} className={className}>{children}</button>)
}

Button.propTypes = {
  type: PropTypes.oneOf(Object.keys(ButtonType)),
  theme: PropTypes.oneOf(Object.keys(ButtonTheme)),
  size: PropTypes.oneOf(Object.keys(ButtonSize)),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  type: ButtonType.BUTTON,
  theme: ButtonTheme.DEFAULT,
  size: ButtonSize.MEDIUM,
}

export default Button
