
import * as React from 'react'
import "styles/ImgOverlay.scss"
import * as className from 'classnames'
import { TweenLite } from 'gsap'


interface ImgOverlayProps {
  className: string
  src: string
  title: string
  subtitle: string
  header: string
}

export default class ImgOverlay extends React.Component<ImgOverlayProps, any> {

  state = {
    clicked: false,
    watchVideo: false
  }

  static defaultProps = {
    title: "Game Name",
    subtitle: "Multiplayer Online Battler",
    players: ['Red player', 'Blue player'],
  }

  handleClick = (event) => {
    console.info("clicked")
    this.setState({ clicked: !this.state.clicked })
    if (this.state.watchVideo === true) {
      this.setState({ watchVideo: false })
    }
    // TweenLite.to('.img-overlay__clickedTwice', 0.2, { rotate: '90deg' })
  }

  handleWatch = () => {
    this.setState({ watchVideo: true })
  }

  render() {
    return (
      <div className={className({
        'img-overlay-container': true,
        'img-overlay__clicked': this.state.clicked,
        'watchVideo': this.state.watchVideo,
      })}
      onClick={this.handleClick}
      >
        <div className='clear-img-overlay'></div>

        {(
          !this.state.watchVideo &&
          <div className='img-overlay'>
            <img className='img-overlay-img'
              src={this.props.src}
            />
          </div>
        )}

        {(
          !this.state.watchVideo &&
          <div className='stream-description'>
            <div className='stream-header'>
              <div><h1>{ this.props.title }</h1></div>
              <div><h2>{ this.props.players[0] }</h2></div>
              <div><h2>vs. { this.props.players[1] }</h2></div>
            </div>
            <div className='stream-subheader'>
              <h3>{ this.props.subtitle }</h3>
              <button onClick={this.handleWatch}>Watch Video</button>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        )}

        {(
          this.state.watchVideo &&
          <div className='twitch-container'>
            <iframe
               src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
               height="360"
               width="640"
               frameBorder="0"
               scrolling="no"
               allowFullScreen="true">
            </iframe>
          </div>
        )}

      </div>
    )
  }
}

