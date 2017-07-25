


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
  countdownDays: number
}
interface ReactState {
  totalms: number
  hours: string
  minutes: string
  seconds: string
  mousedown: boolean
  subscribed: boolean
}

class CountdownTimer extends Component<ReduxProps & ReduxDispatchProps & ReactProps, ReactState> {

  state = {
    ETA: {
      totalms: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    mousedown: false,
    subscribed: false,
    timerID: null,
  }

  static defaultProps = {
    countdownDays: 7,
    date: Date.now() * 2,
  }

  componentWillMount() {
    this.getETA()
    // update timer every second
    setInterval(() => {
      this.getETA()
    }, 1000)
  }

  componentDidMount() {
    let timer = document.getElementById(this.props.id)
    timer.onmousedown = this.onMouseDown
    window.addEventListener("mouseup", this.onMouseUp)
  }

  onMouseDown = () => {
    let timer = document.getElementById(this.props.id)
    timer.className = timer.className.replace(' subscribed', '')
    timer.className += ' mousedown'
    this.setState({
      mousedown: true,
      subscribed: false,
    })

    // set timeout to detect mousedown hold
    let timerID = setTimeout(() => {
      if ( this.state.mousedown ) {
        this.setState({
          subscribed: true,
        })
        timer.className += ' subscribed'
        // this.props.onHoldComplete()
      }
    }, this.props.holdDuration)
    // get a reference to this particular timeout
    this.setState({
      timerID: timerID,
    })
  }

  onMouseUp = () => {
    let timer = document.getElementById(this.props.id)
    timer.className = timer.className.replace(' mousedown', '')
    // clear previous setTimeout
    clearTimeout(this.state.timerID)
    this.setState({
      mousedown: false,
      timerID: undefined,
    })
  }

  getETA = () => {
    let a = this.props.date

    let millisecondsInHours = 1000*60*60
    let millisecondsInMinutes = 1000*60
    let millisecondsInSeconds = 1000
    let deltaT = a - Date.now()

    let hours = Math.floor(deltaT / millisecondsInHours).toString()
    let minutes = Math.floor(deltaT % millisecondsInHours / millisecondsInMinutes).toString()
    let seconds = Math.floor(deltaT % millisecondsInHours % millisecondsInMinutes / millisecondsInSeconds).toString()

    this.setState({
      ETA: {
        totalms: deltaT,
        hours: hours.length < 2 ? `0${hours}` : hours,
        minutes: minutes.length < 2 ? `0${minutes}` : minutes,
        seconds: seconds.length < 2 ? `0${seconds}` : seconds,
      }
    })
  }

  render() {
    let countDown = this.props.countdownDays * 24 * 60 * 60 * 1000 // days to milliseconds
    let numPipsFilled = Math.floor(20 * (1 -  this.state.ETA.totalms/countDown ) )
    let numPipsUnfilled = Math.ceil(20 * (this.state.ETA.totalms/countDown))

    return (
      <div className="countdown_timer">
        <div id={this.props.id} className={"timer disable-select"}>
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
          <div className="subscribe">
            {(
              this.state.subscribed
              ? <div className="subscribed-text">Subscribed</div>
              : <div className="unsubscribed-text">
                  Unsubscribed
                  <div style={{ fontSize: '0.9rem' }}>Hold to Subscribe</div>
                </div>
            )}
          </div>
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
