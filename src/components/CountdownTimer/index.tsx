


import * as React from 'react'
import { Component } from 'react'
import './CountdownTimer.scss'


interface ReduxDispatchProps {
}
interface ReduxProps {
}
interface ReactProps {
  onHoldComplete?(any): void
  holdDuration: number
  date: Date()
}
interface ReactState {
  totalms: number
  hours: number
  minutes: number
  seconds: number
  mousedown: boolean
}

class CountdownTimer extends Component<ReduxProps & ReduxDispatchProps & ReactProps, ReactState> {

  state = {
    initTimer: 0,
    ETA: {
      totalms: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    mousedown: false,
  }

  componentDidMount() {
    let timer = document.getElementById('timer')
    timer.onmousedown = this.onMouseDown
    window.addEventListener("mouseup", this.onMouseUp)

    // update timer every second
    setInterval(() => {
      this.getETA()
    }, 1000)
  }

  onMouseDown = () => {
    let timer = document.getElementById('timer')
    timer.className += ' mousedown'
    this.setState({
      initTimer: Date.now(),
      mousedown: true,
    })
  }

  onMouseUp = () => {
    let timer = document.getElementById('timer')
    timer.className = timer.className.replace(' mousedown', '')
    this.setState({
      initTimer: Date.now(),
      mousedown: false,
    })

    if ((Date.now() - this.state.initTimer) > this.props.holdDuration) {
      // need to hold down button X ms before onHoldComplete will fire
      this.props.onHoldComplete()
    }
  }

  getETA = () => {
    let a = this.props.date

    let millisecondsInHours = 1000*60*60
    let millisecondsInMinutes = 1000*60
    let millisecondsInSeconds = 1000
    let deltaT = a - Date.now()

    let hours = Math.floor(deltaT / millisecondsInHours)
    let minutes = Math.floor(deltaT % millisecondsInHours / millisecondsInMinutes)
    let seconds = Math.floor(deltaT % millisecondsInHours % millisecondsInMinutes / millisecondsInSeconds)

    this.setState({
      ETA: { totalms: deltaT, hours, minutes, seconds }
    })
  }

  render() {
    let countDown = 168 * 60 * 60 * 1000 // 168 hrs (7days) in milliseconds
    let numPipsFilled = Math.floor(20 * (1 -  this.state.ETA.totalms/countDown ) )
    let numPipsUnfilled = Math.ceil(20 * (this.state.ETA.totalms/countDown))

    return (
      <div className="countdown_timer">
        <div id='timer' className="timer disable-select">
          <div className="time">
            <span>
              {( `${this.state.ETA.hours}:` )}
            </span>
            <span>
              {( `${this.state.ETA.minutes}:` )}
            </span>
            <span>
              {( `${this.state.ETA.seconds}` )}
            </span>
          </div>
          <div className="subscribe">Hold to Subscribe!</div>
        </div>
        {
          Array.from(Array(numPipsFilled).keys()).map(n =>
            <div key={n} className="trapezoid filled">{  }</div>
          )
        }
        {
          Array.from(Array(numPipsUnfilled).keys()).map(n =>
            <div key={n} className="trapezoid unfilled">{  }</div>
          )
        }
      </div>
    )
  }
}





export default CountdownTimer
