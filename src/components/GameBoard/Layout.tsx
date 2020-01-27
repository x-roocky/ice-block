import React from 'react'
import { Ice, Color } from './Ice'
import classes from './style'

export interface LayoutProps {
  colors: Color[][];
}

export function Layout (props: LayoutProps) {
  const { colors } = props

  const ices = colors.map((row, i) => {
    const rowIce = row.map((color, j) => (
      <div key={j}>
        <Ice color={color} />
      </div>
    ))

    return (
      <div
        key={i}
        className={classes['crood-x']}
        style={{
          position: 'absolute',
          left: i % 2 === 0 ? '3em' : '0em',
          top: `${i * 1.732051}em`
        }}
      >
        {rowIce}
      </div>
    )
  })

  return (
    <div>
      {ices}
    </div>
  )
}
