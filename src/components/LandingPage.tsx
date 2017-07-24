

import * as React from 'react'
import YouTube from 'react-youtube'

import ImgOverlay from './ImgOverlay'
import Carousel from './Carousel'
import CarouselTile from './CarouselTile'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, iSessionType } from '../reducer'
import { Actions as A } from '../reduxActions'


import { Line, Circle } from 'rc-progress';

import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import * as gsap from 'gsap'

import 'styles/LandingPage.scss'

import * as Rxjs from 'rxjs'




interface DispatchProps {
  updateSessionId(sessionId: string)?: Dispatch<A>
}
interface StateProps {
  youtubeURL: string
  session: iSessionType
  whoWillWin: {
    [index: string]: number
  }
  nbaTeams: {
    teamName: string
    teamLogo: string
  }
}
interface ReactProps {
  data?: any
}




class LandingPage extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {
    category: 'games'
    youtubeOptions: {
      height: (window.innerWidth - (180 + 360)) * 2/3,
      width: window.innerWidth - (180 + 360),
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)

    var button = document.getElementById('butt')
    Rxjs.Observable.fromEvent(button, 'click').subscribe(() => {
      console.log('from OBSERVABLE!')
    })

  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state === nextState) && (this.props === nextProps)) {
      return false
    }
    return true
  }

  handleScroll = (event) => {
    console.info('scroll', event)
  }

  handleResize = () => {
    this.setState((state) => {
      return {
        youtubeOptions: {
          height: (window.innerWidth - (180 + 360)) * 2/3,
          width: window.innerWidth - (180 + 360),
          playerVars: { autoplay: 1 }
        }
      }
    }
  }

  handleClick = (sessionId: number) => {
    let numSessions = 4
    // mod 4, sincethere's only 4 sessions, so that carousel img > 4 will
    // redirect to session 1, 2, 3, 4
    this.props.updateSessionId(String(sessionId % numSessions + 1))
  }

  handleVote = (teamName: string) => {
    this.props.dispatch({
      type: A.User.VOTE_FOR_TEAM,
      payload: { ...this.props.whoWillWin, [teamName]: this.props.whoWillWin[teamName] + 5 }
    })
  }


  render() {
    let props = this.props
    let totalVotes = props.whoWillWin[props.session.teams[0]] + props.whoWillWin[props.session.teams[1]]
    return (
      <div className='hero-outer-container'>
        <div className='hero-container'>

          <div className="cn-cover cn-cover--withimage js-cn-cover">
          </div>

          <div className="landing-page-listings-container">
            <div className='twitch-container'>
              <YouTube
                videoId={this.props.youtubeURL}
                opts={this.state.youtubeOptions}
              />
            </div>

            {/* <ImgOverlay src={require("../img/game2.jpg")} */}
            {/*   title="Overwatch" */}
            {/*   subtitle="Multiplayer Online Battler" */}
            {/*   players={["PinkEye", "Urgoz"]} */}
            {/* /> */}
            {/* <ImgOverlay src={require("../img/game3.jpg")} */}
            {/*   title="World of Warcraft" */}
            {/*   subtitle="HearthStone" */}
            {/*   players={["TheLastTauren", "Nerchio"]} */}
            {/* /> */}
          </div>
        </div>

        <button id="butt" style={{ position: 'fixed', zIndex: 11, top: 0, left 0 }}>button</button>

        <div className="landing-page-listings-container">
          <div className='main-container2'>
            <img className="teamLogo" src={props.nbaTeams[props.session.teams[0]].teamLogo}
              onClick={() => this.handleVote(props.session.teams[0])}
            />
            <img className="teamLogo" src={props.nbaTeams[props.session.teams[1]].teamLogo}
              onClick={() => this.handleVote(props.session.teams[1])}
            />
          </div>
          <div className='main-container3'>
            <h2>WHO WILL WIN</h2>
          </div>
          <div className='main-container3 percentage_votes'>
            <h2>
              <span>{"%"}</span>{ String(props.whoWillWin[props.session.teams[0]] / totalVotes * 100).slice(0,4) }
            </h2>
            <h2>
              <span>{"%"}</span>{ String(props.whoWillWin[props.session.teams[1]] / totalVotes * 100).slice(0,4) }
            </h2>
          </div>
        </div>


        <div className='hero-container'>
          <div className="landing-page-listings-container fixed--carousel">
            <div className='landing-page-listings-flex'>
              <Carousel className='prediction__listings__carousel'>
              {(
                [9,10,11,1,2,3,4,5,6,7,8,9,10].map((n, i) => {
                  return (
                    <CarouselTile key={i}
                      onClick={() => this.handleClick(i+1)}
                      img={require(`../img/pic${n}_compressed.jpg`)}
                    >
                      <div>Cool</div>
                      <div>Beans</div>
                    </CarouselTile>
                  )
                })
              )}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    youtubeURL: state.reduxUser.sessions[state.reduxUser.currentSessionId].youtubeURL,
    session: state.reduxUser.sessions[state.reduxUser.currentSessionId],
    whoWillWin: state.reduxUser.sessions[state.reduxUser.currentSessionId].whoWillWin
    nbaTeams: state.reduxUser.nbaTeams,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserGQL: (userGQL: userGQL) => dispatch(
      { type: A.User.USER_GQL, payload: userGQL }
    ),
    updateSessionId: (sessionId: string) => dispatch(
      { type: A.User.SWITCH_SESSION, payload: sessionId }
    ),
    dispatch: dispatch
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( LandingPage )
