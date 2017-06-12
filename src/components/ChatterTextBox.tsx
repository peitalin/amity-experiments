
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, iMessageType } from '../reducer'
import { Actions as A } from '../reduxActions'

import { userGQL } from '../typings/interfaceDefinitions'
import 'styles/ChatterTextBox.scss'


interface DispatchProps {
  updateMessages(msg: iMessageType): Dispatch<A>
}
interface StateProps {
  myUserProfile: userGQL
}
interface ReactProps {
  data?: any
}

class ChatterTextBox extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {
    writtenText: ''
  }

  handleTextAreaChange = (event) => {
    this.setState({ writtenText: event.target.value })
  }

  sendMessage = (e) => {
    if (e.type === 'keyup') {
      if (this.isEnter(e) && (this.state.writtenText.trim().length >= 1)) {
        let msg: iMessageType = { content: this.state.writtenText, userSelf: true, date: new Date()}
        this.props.updateMessages(msg)
        this.setState({ writtenText: '' })
      }
    }
    if (e.type === 'click') {
      if (this.state.writtenText.trim().length >= 1) {
        let msg: iMessageType = { content: this.state.writtenText, userSelf: true, date: new Date()}
        this.props.updateMessages(msg)
        this.setState({ writtenText: '' })
      }
    }
  }

  isEnter (e) {
    return (e.keyCode === 13) || (e.key === "Enter")
    TweenMax.to("#mySVG", 4, {
      attr: { d: "M0,0 Q 100,100 200,0" },
      yoyo: true, repeat:-1,
      ease: Elastic.easeOut.config(1.5, 0.2)
    });
  }


  componentDidMount() {
    setTimeout(() => {
      let msg: iMessageType = { content: 'Hey are you there? Wanna hear something funny?', userSelf: false, date: new Date()}
      this.props.updateMessages(msg)
    }, 1100)
    setTimeout(() => {
      let msg: iMessageType = { content: 'OI!!!!!!!!', userSelf: false, date: new Date()}
      this.props.updateMessages(msg)
    }, 6000)

  }

  render() {
    return (
      <div className="chatter__textarea">
        <textarea placeholder="Press Enter to send"
          value={this.state.writtenText}
          onChange={this.handleTextAreaChange}
          onKeyUp={ this.sendMessage }
        ></textarea>

        <div className="social-container">
          <a className="social-footer social-facebook" href="https://www.facebook.com/"></a>
          <a className="social-footer social-twitter" href="https://twitter.com/"></a>
          <a className="social-footer social-instagram" href="https://www.instagram.com/"></a>
          <a className="social-footer social-email" href="mailto:n6378056@gmail.com"></a>
        </div>

        <div className='chatter__send-message'>
          <button className="send-message-button" onClick={ this.sendMessage }>Send Message</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    myUserProfile: state.reduxUser.userGQL
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserGQL: (userGQL: userGQL) => dispatch(
      { type: A.User.USER_GQL, payload: userGQL }
    ),
    updateMessages: (msg: iMessageType) => dispatch(
      { type: A.User.UPDATE_MESSAGES, payload: msg }
    ),
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( ChatterTextBox )
