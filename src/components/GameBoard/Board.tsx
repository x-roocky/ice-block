import React from 'react'
import { Layout } from './Layout'

const colors: (0 | 1 | 2)[][] = [
  [0, 2, 2, 0, 0],
  [0, 2, 1, 1, 0],
  [1, 2, 2, 1, 0],
  [0, 2, 1, 1, 0],
  [2, 1, 1, 1, 0],
  [1, 1, 2, 1, 1],
  [2, 2, 2, 2, 0],
  [0, 1, 1, 1, 0],
  [2, 2, 2, 1, 0],
  [0, 1, 2, 1, 0],
  [0, 1, 2, 0, 0]
]

export function Board () {
  return (
    <div>
      <Layout colors={colors}/>
    </div>
  )
}
