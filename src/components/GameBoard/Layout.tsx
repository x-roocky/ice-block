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

function isExist(colors: Color[][], x: number, y: number) {
  return (colors[y] === undefined || colors[y][x] === undefined || colors[y][x] !== 0) ? 1 : 0
}

function isFirm(dirs: number[]) {
  for (let i = 0; i < dirs.length; ++i) {
    if (dirs[i] && (dirs[(i + 3) % 6] || (dirs[(i + 2) % 6] && dirs[(i + 4) % 6]))) {
      return true;
    }
  }
}

function checkOne(colors: Color[][], x: number, y: number) {
  const dirs = []
  dirs[0] = isExist(colors, x - 1, y - 1, )
  dirs[1] = isExist(colors, x, y - 2)
  dirs[2] = isExist(colors, x + 1, y - 1)
  dirs[3] = isExist(colors, x + 1, y + 1)
  dirs[4] = isExist(colors, x, y + 2)
  dirs[5] = isExist(colors,  x - 1, y + 1)

  return isFirm(dirs)
}

function checkAll(colors: Color[][]) {
  for (let i = 0; i < colors.length; ++i) {
    for (let j = 0; j < colors[i].length; ++j) {
      if (colors[i][j]) {
        if (!checkOne(colors, j, i)) {
          colors[i][j] = 0
          i = 0
          j = 0
        }
      }
    }
  }
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
          colors[i][j] = 0
          checkAll(colors)
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
