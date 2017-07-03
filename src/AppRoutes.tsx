

import * as React from 'react'
//// Routing
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import 'styles/AppRoutes.scss'
//// Lazyload
import { SpinnerRectangle } from './components/Spinners'
import Loadable from 'react-loadable'

//////// Lazy-loading Components by Route /////////
export const asyncComponent = ({ loader }) => {
  return (
    Loadable({
      loader: loader,
      LoadingComponent: ({ isLoading, error, pastDelay }) => {
        let delayLoadingComponent = pastDelay
          ? <div style={{ position: 'fixed', top: 10, right: 10 }}><SpinnerRectangle height='23px' width='6px'/></div>
          : null
        return isLoading
          ? delayLoadingComponent
          : (<div style={{ position: 'fixed', top:10, right: 10 }}>asyncComponent Error! Component failed to load</div>)
      },
      delay: 200, // show loader only after 200ms
    })
  )
}
const Title = asyncComponent({ loader: () => System.import('./components/Title.tsx') })
const LandingPage = asyncComponent({ loader: () => System.import('./components/LandingPage.tsx') })
const Navbar = asyncComponent({ loader: () => System.import('./components/Navbar.tsx') })
const Parallax = asyncComponent({ loader: () => System.import('./components/Parallax.tsx') })
const Chat = asyncComponent({ loader: () => System.import('./components/Chat.tsx') })
const News = asyncComponent({ loader: () => System.import('./components/News.tsx') })


export default class AppRoutes extends React.Component {

  render () {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={ Navbar } />
          <Route exact path="/" component={ LandingPage } />
          <Route exact path="/" component={ Chat } />
          <Route path="/News" component={ News } />
        </div>
      </HashRouter>
    )
  }
}

