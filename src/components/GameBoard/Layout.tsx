import React from 'react'
import { Ice, Color } from './Ice'
import classes from './style'

export interface LayoutProps {
  colors: Color[][];
}

function isInHexagon(x: number, y: number, left: number, top: number) {
  const [remX, remY] = [x - left * 3, y - top]
  return  remY > 0        && // 正上横线
          remY < 2        && // 正下横线
         -remX + 1 < remY && // 左上斜线
         -remX + 5 > remY && // 右下斜线
          remX + 1 > remY && // 左下斜线
          remX - 3 < remY    // 右上斜线
}

export function Layout (props: LayoutProps) {
  const [colors, setColors] = React.useState(props.colors)
  const element: React.RefObject<HTMLDivElement> = React.createRef()

  function onClickHandle(e: any) {
    const xsize = 1 * 16
    const ysize = xsize * 1.732051
    const {left, top} = element.current!.getBoundingClientRect()
    const [posX, posY] = [(e.clientX - left) / xsize, (e.clientY - top) / ysize]

    // XXX: 后续要将遍历改为计算的方法
    for (let i = 0; i < colors.length; ++i) {
      for (let j = 0; j < colors[i].length; ++j) {
        if (colors[i][j] && isInHexagon(posX, posY, j, i)) {
          colors[i][j] = colors[i][j] === 1 ? 2 : 1
          setColors([...colors])
        }
      }
    }
  }

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
          left: '0em',
          top: `${i * 1.732051}em`
        }}
      >
        {rowIce}
      </div>
    )
  })

  return (
    <div onClick={onClickHandle} ref={element}>
      {ices}
    </div>
  )
}
