import React, { forwardRef } from 'react'
import { ButtonTag } from './styles'

export const Button = forwardRef((props, ref) => {
  const Icon = props.icon ? props.icon : null

  return (
    <ButtonTag ref={ref} {...props} onClick={props.onClick} className={props.extraClass}>
      {Icon && <Icon size={props.iconSize ? props.iconSize : '18px'} />}
      {props.text}
    </ButtonTag>
  )
})
