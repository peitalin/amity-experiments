

import * as React from 'react'
//// Routing
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import 'styles/AppRoutes.scss'
//// Lazyload
import { SpinnerRectangle } from './components/Spinners'
import Loadable from 'react-loadable'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
          : (<div style={{ position: 'fixed', top: 10, right: 10 }}>asyncComponent Error! Component failed to load</div>)
      },
      delay: 200, // show loader only after 200ms
    })
  )
}
const Title = asyncComponent({ loader: () => System.import('./components/Title.tsx') })
const LoginAuth0 = asyncComponent({ loader: () => System.import('./components/LoginAuth0.tsx') })
const Navbar = asyncComponent({ loader: () => System.import('./components/Navbar.tsx') })
const Parallax = asyncComponent({ loader: () => System.import('./components/Parallax.tsx') })

const NewsHunt = asyncComponent({ loader: () => System.import('./components/NewsHunt.tsx') })
const FoxSports = asyncComponent({ loader: () => System.import('./components/FoxSports.tsx') })
const Chat = asyncComponent({ loader: () => System.import('./components/Chat.tsx') })
const CAPI = asyncComponent({ loader: () => System.import('./components/CAPI.tsx') })
const Collections = asyncComponent({ loader: () => System.import('./components/Collections.tsx') })


const Login = (): JSX.Element => {
  const clientId: string = 'uzVT8nCGaQwjyXC2QYyGCfsJOCn6Q61c'
  const domain: string = 'peitalin.au.auth0.com'
  const redirectUrl: string = '/Collections' // redirect to route on authentication
  return <LoginAuth0 clientId={clientId} domain={domain} redirectOnAuth={redirectUrl}/>
}


export default class AppRoutes extends React.Component {

  render () {
    return (
      <MuiThemeProvider>
        <HashRouter>
          <div>
            <Route path="/" component={ Navbar } />
            <Route path="/" component={ Login } />
            <Route path="/" component={ NewsHunt } />
            {/* <Route exact path="/" component={ Chat } /> */}
            <Route exact path="/FoxSports" component={ FoxSports } />
            <Route exact path="/FoxSports" component={ Chat } />
            <Route path="/CAPI" component={ CAPI } />
            <Route path="/Collections" component={ Collections } />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

