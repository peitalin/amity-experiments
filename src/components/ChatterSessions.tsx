
import * as React from 'react'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, iSessionType, iAllSessions } from '../reducer'
import { Actions as A } from '../reduxActions'

import * as className from 'classnames'
import 'styles/ChatterSessions.scss'


interface DispatchProps {
  updateSessionId(sessionId: string)?: Dispatch<A>
}
interface StateProps {
  sessions: iAllSessions
  sessionId: string
  nbaTeams: {
    [index: string]: {
      teamName: string
      teamLogo: string
    }
  }
}
interface ReactProps {
  data?: any
}


class ChatterSessions extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {}

  onKeyUp = () => {
  }

  selectSession = (sessionId: string) => {
    this.props.updateSessionId(sessionId)
  }

  render() {
    return (
      <div className="chatter-list">
        <input className="search" type="text" placeholder="Find a Forum Thread" onKeyUp={this.onKeyUp}></input>
        <div className="now_playing"><h2>Now Playing</h2></div>

        <ul>
          {( this.props.sessions &&
            Object.entries(this.props.sessions).map(session => {
              let idKey: string = session[0]
              let item: iSessionType = session[1]
              let active: boolean = item.id == this.props.sessionId
              return (
                <li key={idKey} className={className({ 'active': active })}
                  onClick={() => this.selectSession(item.id) }
                >
                  <p className="name">
                    <img className="teamLogo" src={this.props.nbaTeams[item.teams[0]].teamLogo}/>
                    {(
                      !active &&
                      <span>{item.teams[0]}</span>
                    )}
                  </p>
                  <p className="name">
                    <span>{ " vs. " }</span>
                  </p>
                  <p className="name">
                    <img className="teamLogo" src={this.props.nbaTeams[item.teams[1]].teamLogo}/>
                    {(
                      !active &&
                      <span>{item.teams[1]}</span>
                    )}
                  </p>
                  <p className={className({
                    'forum-thread': true, 'name': true,
                    'active-thread': active
                  })}>
                    <span>Watch ranked number #2 </span><b>{item.teams[0]}</b>
                    <span> showdown against ranked number #4</span>
                    <span>{" "}<b>{item.teams[1]}</b>{" "}</span>
                    <span>in the quarter final matchup of this summer season.</span>
                  </p>
                </li>
              )
            })
          )}
        </ul>
        <div className="upcoming">Upcoming Matches</div>
      </div>
    )
  }
}


const mapStateToProps = ( state: ReduxState ) => {
  return {
    myUserProfile: state.reduxUser.userGQL,
    sessions: state.reduxUser.sessions,
    sessionId: state.reduxUser.currentSessionId,
    nbaTeams: state.reduxUser.nbaTeams,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateSessionId: (sessionId: string) => dispatch(
      { type: A.User.SWITCH_SESSION, payload: sessionId }
    )
    dispatch: dispatch,
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( ChatterSessions )

