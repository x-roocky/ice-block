import React from 'react'
import classes from './style'

export function Ice (props: { color: 'none' | 'blue' | 'white', style?: React.CSSProperties }) {
  const { color, style } = props

  return (
    <svg width="4em" height="3.4641em" viewBox="0 0 400 346.410" style={style}>
      <polygon
        points="100,0 300,0 400,173.205 300,346.41 100,346.41 0,172.205"
        className={classes[`hexagon-${color}`]}
      />
    </svg>
  )
}
