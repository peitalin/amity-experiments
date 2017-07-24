

import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { ReduxStateUser, ReduxState } from '../reducer'

import { Link, withRouter, Location, Redirect } from 'react-router-dom'

import { slide as Menu } from 'react-burger-menu'


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
          <span className='categories'>—</span>
          <p className='categories'>
            <Link className="menu-item" to='/News'>News</Link>
          </p>
          <span className='categories'>—</span>
          <p className='categories' onClick={() => this.setCategory("Galleries")}>
            <a>Galleries</a>
          </p>
          <span className='categories'>—</span>
          <p className='categories' onClick={() => this.setCategory("collections")}>
            <a>Collections</a>
          </p>
        </div>

        <div className="Nav__userprofile">
          <p className='categories' onClick={() => this.setCategory("collections")}>
            Username: <a><span>{ this.props.username }</span></a>
          </p>
        </div>

      </div>
    )
  }
}


const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    upvotes: state.reduxUser.userGQL.upvotes,
    downvotes: state.reduxUser.userGQL.downvotes
    username: state.reduxUser.userGQL.username
  }
}

export default connect(mapStateToProps, null)(withRouter( Navbar ))


