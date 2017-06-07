

import * as React from 'react'
import 'styles/Chat.scss';


interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<A>
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
        Chat
        <textarea id="" name="" cols="30" rows="10">
         allo text area
        </textarea>
      </div>
    )
  }
}

export default Chat;
