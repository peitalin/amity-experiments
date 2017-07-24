
import * as React from 'react'
import { Component } from 'react'

import './ManaBar.scss'


interface ManaBarProps {
  height: number
  width: number
  percentage: number
}
const ManaBar = ({ height, width, percentage }: ManaBarProps) => {
  let numPipsFilled = Math.floor(20 * percentage)
  let numPipsUnfilled = Math.ceil(20 * (1 - percentage))
  return (
    <div className="manabar">
      {
        Array.from(Array(numPipsFilled).keys()).map(n =>
          <div className="parallelogram filled" key={n}
            style={{ height: height, width: width }}>
          </div>
        )
      }
      {
        Array.from(Array(numPipsUnfilled).keys()).map(n =>
          <div className="parallelogram unfilled" key={n}
            style={{ height: height, width: width }}>
          </div>
        )
      }
    </div>
  )
}

export default ManaBar;
