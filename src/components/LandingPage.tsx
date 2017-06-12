

import * as React from 'react'

import WorldMap from './WorldMap'
import ImgOverlay from './ImgOverlay'
import Carousel from './Carousel'
import CarouselTile from './CarouselTile'



import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import * as gsap from 'gsap'

import 'styles/LandingPage.scss'




export default class LandingPage extends React.Component<any, any> {

  state = {
    category: 'games'
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state === nextState) && (this.props === nextProps)) {
      return false
    }
    return true
  }

  setCategory = (category: string): void => {
    this.setState({ category: category })
  }

  languageNav = (): JSX.Element => {
    return (
      <div className="content-categories">
        <p className='categories' onClick={() => this.setCategory("games")}><a>Games</a></p>
        <span className='categories'>—</span>
        <p className='categories' onClick={() => this.setCategory("news")}><a>News</a></p>
        <span className='categories'>—</span>
        <p className='categories' onClick={() => this.setCategory("vod")}><a>VOD: Live Streams</a></p>
      </div>
    )
  }

  handleScroll = (event) => {
    console.info('scroll', event)
  }

  render() {
    return (
      <div className='hero-outer-container'>
        <div className='hero-container'>
          { this.languageNav() }

          <div className="cn-cover cn-cover--withimage js-cn-cover"
            style={{ backgroundImage: "url(https://static-cdn.jtvnw.net/jtv_user_pictures/twitch-profile_banner-6936c61353e4aeed-480.png)"}}>
          </div>

          <div className="landing-page-listings-container">
            <div className='landing-page-listings-flex'>
              <ImgOverlay src={require("../img/game2.jpg")}
                title="Overwatch"
                subtitle="Multiplayer Online Battler"
                players={["PinkEye", "Urgoz"]}
              />
              {/* <ImgOverlay src={require("../img/game3.jpg")} */}
              {/*   title="World of Warcraft" */}
              {/*   subtitle="HearthStone" */}
              {/*   players={["TheLastTauren", "Nerchio"]} */}
              {/* /> */}
              <ImgOverlay src={require("../img/game4.jpg")}
                title="GTA V"
                subtitle="Capture the Hill"
                players={["Vinny El Capo", "Don Donburry"]}
              />
              {/* <ImgOverlay src={require("../img/game5.jpg")} */}
              {/*   title="Destiny" */}
              {/*   subtitle="Bungie Jump" */}
              {/*   players={["TLO", "Day98"]} */}
              {/* /> */}
            </div>
          </div>
        </div>

        <div className='hero-container'>
          <div className="landing-page-listings-container fixed--carousel">
            <div className='landing-page-listings-flex'>
              <Carousel className='prediction__listings__carousel'>
              {(
                [4,5,6,7,8,9,10,11,1 ].map((n, i) => {
                  return (
                    <CarouselTile key={i}
                      onClick={() => this.gotoPredictionLocation(p.house)}
                      img={require(`../img/game${n}.jpg`)}
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




