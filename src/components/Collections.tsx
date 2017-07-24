
import * as React from 'react'
import { Component } from 'react'

import 'styles/Collections.scss'
import { TweenMax } from 'gsap'

import ManaBar from './ManaBar'
import RegenBar from './RegenBar'


interface ReduxDispatchProps {
}
interface ReduxProps {
}
interface ReactProps {
}

class Collections extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {}

  componentDidMount() {
    TweenMax.staggerFrom('.parallelogram', 0.08, { opacity: 0.1 }, 0.04)
  }

  render() {

    let arr = Array.apply(null, Array(5)).map((_, i) => i)
    // let arr = [...Array(5).keys()]
    console.info(arr)

    return (
      <div className="collections__container">
        <br/>

        <ManaBar height={20} width={20} percentage={0.7}/>
        <RegenBar regenPips={5} style={{ marginTop: '4px' }}/>

        <div className="trap_container">
        {
          Array.from(Array(15).keys()).map(n =>
            <div key={n} className="trapezoid filled">{  }</div>
          )
        }
        {
          Array.from(Array(5).keys()).map(n =>
            <div key={n} className="trapezoid unfilled">{  }</div>
          )
        }
        </div>


      </div>
    )
  }
}





export default Collections
