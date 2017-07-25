
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
    let demoDate = new Date('27 July 2017 13:30:00 GMT+10:00')
    return (
      <div className="collections__container">
        <br/>

        <ManaBar height={20} width={20} percentage={0.7}/>
        <RegenBar regenPips={5} style={{ marginTop: '4px' }}/>
        <CountdownTimer date={demoDate} holdDuration={500} onHoldComplete={() => alert("KUDOS")} />

      </div>
    )
  }
}





export default Collections
