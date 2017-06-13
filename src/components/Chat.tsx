

import * as React from 'react'
import 'styles/Chat.scss'
import ChatterMessageBox from './ChatterMessageBox'
import ChatterTextBox from './ChatterTextBox'
import ChatterSessions from './ChatterSessions'


interface DispatchProps {
}
interface StateProps {
}
interface ReactProps {
  data?: any
}

class Chat extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {}

  render() {
    return (
      <div className='chat__container'>
        <ChatterSessions/>
        <ChatterMessageBox/>
        <ChatterTextBox/>
      </div>
    )
  }
}

export default Chat;
