
import * as React from 'react'
import { Component } from 'react'

import 'styles/Collections.scss'
import { TweenMax, TimelineMax } from 'gsap'

import ManaBar from './ManaBar'
import RegenBar from './RegenBar'
import CountdownTimer from './CountdownTimer'


interface ReduxDispatchProps {
}
interface ReduxProps {
}
interface ReactProps {
}

class Collections extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  componentDidMount() {
  }

  render() {
    let demoDate1 = new Date('26 July 2017 13:30:00 GMT+10:00')
    let demoDate2 = new Date('27 July 2017 03:30:00 GMT+10:00')
    let demoDate3 = new Date('28 July 2017 03:30:00 GMT+10:00')

    let size = 200
    let size2 = 250
    let size3 = 300
    return (
      <div className="collections__container">
        <br/>

        <ManaBar height={20} width={20} percentage={0.7}/>
        <RegenBar regenPips={5} style={{ marginTop: '4px' }}/>
        <div className='countdown-timers-container'>

          <CountdownTimer id="timer1"
            height={size}
            width={size}
            date={demoDate1}
            holdDuration={500}
            countdownDays={4}
            onHoldComplete={() => alert("KUDOS")}
          />
          <CountdownTimer id="timer2"
            height={size}
            width={size}
            date={demoDate2}
            holdDuration={500}
            countdownDays={4}
            onHoldComplete={() => alert("KUDOS")}
          />
          <CountdownTimer id="timer3"
            height={size}
            width={size}
            date={demoDate1}
            holdDuration={500}
            countdownDays={4}
            onHoldComplete={() => alert("KUDOS")}
          />

          <CountdownTimer id="timer4"
            height={size2}
            width={size2}
            date={demoDate1}
            holdDuration={500}
            countdownDays={4}
            onHoldComplete={() => alert("KUDOS")}
          />
          <CountdownTimer id="timer5"
            height={size2}
            width={size2}
            date={demoDate2}
            holdDuration={500}
            countdownDays={4}
            onHoldComplete={() => alert("KUDOS")}
          />

        </div>

      </div>
    )
  }
}





export default Collections
