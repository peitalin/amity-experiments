
import * as React from 'react'
import { Component } from 'react'

import './RegenBar.scss'

interface RegenBarProps {
  regenPips: number
  style: Object
}
const RegenBar = ({ regenPips, style }: RegenBarProps) => (
  <div className="regen" style={style}>
    {
      Array.from(Array(regenPips).keys()).map((n, i) =>
        <div
          key={i}
          className="regen__pip"
          style={{
            animation: `blink ${Array(regenPips).length * 0.4}s infinite`,
            animationDelay: `${i * 0.2}s`
        }}>
          ▶
        </div>
      )
    }
    <div className="regen__text">{( `${regenPips}min / hr` )}</div>
  </div>
)

export default RegenBar;
