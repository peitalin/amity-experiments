

import * as React from 'react'
import { Component } from 'react'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../redux/reducer'
import { Actions } from '../redux/reduxActions'


class MyNewsArticles extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {}

  render() {
    return (
      <div>
      </div>
    )
  }
}

interface ReduxDispatchProps {
}
interface ReduxProps {
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    state.
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( MyNewsArticles )
