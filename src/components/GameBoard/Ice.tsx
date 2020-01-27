import React from 'react'
import classes from './style'

export type Color = 0 | 1 | 2

export interface IceProps {
  color: Color
  style?: React.CSSProperties
}

export function Ice (props: IceProps) {
  const { color, style } = props

  return (
    <svg width="4em" height="3.46410em" viewBox="0 0 400 346.410" style={style}>
      <polygon
        points="100,0 300,0 400,173.205 300,346.41 100,346.41 0,172.205"
        className={classes[`ice-${color}`]}
      />
    </svg>
  )
}
