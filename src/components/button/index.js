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

const Button = ({ type, onClick, onClickWith, children, theme, size }) => {
  const handleClick = () => onClick(onClickWith)
  const className = `${styles.button} ${styles[theme]} ${styles[size]}`
  return (
    <button type={type} onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(Object.values(ButtonType)),
  theme: PropTypes.oneOf(Object.values(ButtonTheme)),
  size: PropTypes.oneOf(Object.values(ButtonSize)),
  onClick: PropTypes.func.isRequired,
  onClickWith: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  type: ButtonType.BUTTON,
  theme: ButtonTheme.DEFAULT,
  size: ButtonSize.MEDIUM,
  onClickWith: undefined,
}

export default Button
