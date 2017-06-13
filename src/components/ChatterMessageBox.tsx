


import * as React from 'react'
import * as className from 'classnames'
import 'styles/ChatterMessageBox.scss'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, iSessionType, iMessageType } from '../reducer'
import { userGQL } from '../typings/interfaceDefinitions'

import { TweenLite, TweenMax } from 'gsap'
import * as swearjar from 'swearjar'


interface DispatchProps {
}
interface StateProps {
  session: iSessionType
  lastMessage: iMessageType
  myUserProfile: userGQL
  users: {
    [index: string]: userGQL
  }
}
interface ReactProps {
  data?: any
}



class ChatterMessageBox extends React.Component<DispatchProps & StateProps & ReactProps, any> {

  state = {}

  convertTime = (date: Date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.getHours() + ':' + date.getMinutes();
  }

  emotionalIntensity = () => {
    // intensity of emotion
    // scale of 1 to 10, 1 being lowest
    let exclamations = this.props.lastMessage.content.match(/[!@#]/g)
    // numExclamations: count number of ! occurances in last message
    let numExclamations = exclamations ? exclamations.length : 0
    // numConsecutiveCaps: count of longest string with consecutive capitals.
    // e.g. 'WHAT THE HELL' => 13 consecutive capitals.
    let numConsecutiveCaps = this.props.lastMessage.content
      .match(/[A-Z\s]*/g) // find substrings with consecutive capitals
      .sort((a,b) => b.length - a.length)[0] // sort by length and take the longest substring
      .length/2  // take the length and weight it by half
    // return sum of numExclamations + numConsecutiveCaps or 10, whichever is larger
    return ((numExclamations + numConsecutiveCaps) > 10) ? 10 : (numExclamations + numConsecutiveCaps)
  }

  emotionalValence = () => {
    // https://en.wikipedia.org/wiki/Emotion_classification
    if (swearjar.profane(this.props.lastMessage.content)) {
      return 'negative'
    } else {
      return 'positive'
    }
  }

  scrollBottom() {
    // this.$el.scrollTop = this.$el.scrollHeight - this.$el.clientHeight;
    let tl = new TimelineMax();
    let msgBox = '.chatter__messagebox'

    tl.to(msgBox, 0.4, {
      scrollTo: 'max',
      ease: Elastic.easeOut.config(this.emotionalIntensity(), 1/this.emotionalIntensity())
    })
    if (this.emotionalIntensity() > 5) {
      if (this.emotionalValence() === 'negative') {
        TweenLite.from(msgBox, 2, { backgroundColor: '#D17B88' })
      } else {
        TweenLite.from(msgBox, 2, { backgroundColor: '#F8BD7F' })
      }
    }
    if (this.emotionalIntensity() > 8) {
      tl.staggerFrom('.myself', 0.8, {
        x: 20,
        ease: Elastic.easeOut.config(this.emotionalIntensity(), 1/this.emotionalIntensity()),
        delay: 0.1,
      }, 0.05)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((new Date - this.props.lastMessage.date) < 100) {
      // call scrollBottom animation only after a new message is sent (100ms)
      // otherwise will animate every time this component re-renders (e.g. session changes)
      this.scrollBottom()
    }
  }

  render() {
    return (
      <div className="chatter__messagebox">
      <div className="chatter__forum_thread"><h2>Forum Thread</h2></div>
      {(
        this.props.session.messages.map((msg, i) => {
          return (
            <div className="text-message-container" key={i}>
              <div className={className({ 'text-message': true, 'self': msg.userSelf })}>
                <p className="time">
                  <span>{ this.convertTime(msg.date) }</span>
                  <span>ID: <span>{ this.props.session.id }</span></span>
                </p>
                <img className="avatar" src={(
                  (msg.userName === this.props.myUserProfile.name)
                  ? this.props.myUserProfile.img
                  : this.props.users[msg.userName].img
                )}/>
                <div className={className({
                  'text-bubble': true,
                  'myself': (msg.userName === this.props.myUserProfile.name),
                  'other': (msg.userName !== this.props.myUserProfile.name),
                })}>
                  { msg.content }
                  <div className="upvote">△</div>
                  <div className="downvote">▽</div>
                </div>
              </div>
            </div>
          )
        })
      )}
      </div>
    )
  }
}


const mapStateToProps = ( state: ReduxState ) => {
  return {
    session: state.reduxUser.sessions[state.reduxUser.currentSessionId],
    myUserProfile: state.reduxUser.userGQL,
    users: state.reduxUser.users,
    lastMessage: state.reduxUser.sessions[state.reduxUser.currentSessionId].messages.slice(-1)[0]
  }
}
export default connect<StateProps, DispatchProps, ReactProps>(
  mapStateToProps, null,
)( ChatterMessageBox )
