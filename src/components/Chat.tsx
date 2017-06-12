

import * as React from 'react'
import 'styles/Chat.scss'
import ChatterMessageBox from './ChatterMessageBox'
import ChatterTextBox from './ChatterTextBox'

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
        <ChatterMessageBox/>
        <ChatterTextBox/>
      </div>
    )
  }
}

export default Chat;
