

import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { ReduxStateUser, ReduxState } from '../redux/reducer'

import { Link, withRouter, Location, Redirect } from 'react-router-dom'


import 'styles/Navbar.scss'




interface NavbarProps {
  location?: Location
  upvotes: number
  downvotes: number
  username: string
}
interface NavbarState {
  menuOpen: boolean
}


export class Navbar extends React.Component<NavbarProps, NavbarState> {

  state = {
    menuOpen: false,
  }

  static getRouterPath = (pathname: string, n: number = 0): string => {
    return (pathname === '') ? '/' : pathname.split('/').slice(0, n+1).join('/')
  }

  showSettings = (event) => {
    event.preventDefault();
    console.info(event)
  }

  setCategory = (category: string): void => {
    this.setState({ category: category })
  }

  render() {
    let { pathname } = this.props.location
    return (
      <nav id="nav-bar" className="navigation-bar">

        <div className="content-categories">
          <p className='categories'>
            <Link className="menu-item" to='/'>Home</Link>
          </p>
          <p className='categories'>
            <Link className="menu-item" to='/FoxSports'>Fox-Sports</Link>
          </p>
          <p className='categories'>
            <Link className="menu-item" to='/CAPI'>NewsCorp-CAPI</Link>
          </p>
          <p className='categories'>
            <Link className="menu-item" to='/Collections'>Collections</Link>
          </p>
        </div>

      </div>
    )
  }
}


const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    upvotes: state.reduxUser.userProfile.upvotes,
    downvotes: state.reduxUser.userProfile.downvotes,
    username: state.reduxUser.userProfile.username,
  }
}

export default connect(mapStateToProps, null)(withRouter( Navbar ))


