

import { ActionType, Actions } from './reduxActions'
import { userGQL, geoData, iPrediction } from './typings/interfaceDefinitions'


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxUser: ReduxStateUser
}
/////////////

export interface ReduxStateUser {
  userGQL?: userGQL
  currentSessionId: string
  filterKey: string
  sessions: iAllSessions
}
export interface iAllSessions {
  [index: string]: iSessionType
}
export interface iSessionType {
  id?: string
  userGQL?: userGQL
  messages?: iMessageType[]
}
export interface iMessageType {
  content?: string
  date?: Date
  userSelf?: boolean
}

const initialReduxStateUser: ReduxStateUser = {
  userGQL: {
    emailAddress: 'sandra@sully.com',
    username: 'Sandra Sully',
    img: 'https://s3-ap-southeast-2.amazonaws.com/amitylandingpage/chat/danawhite.png'
    id: 'cxj1234',
    upvotes: 100,
    downvotes: 20,
    streams: ['Ace'],
  },
  currentSessionId: '1',
  filterKey: '',
  sessions: {
    '1': {
      id: '1',
      userGQL: {
        name: 'Chael P.',
        img: 'http://www.chicagonow.com/reflections-chicago-life/files/2016/12/hi-res-87fbf2b3a25a1499e8fe696c596872df_crop_north.jpg'
      },
      messages: [
        {
          content: 'I once saw Nogueira trying to feed a bus a carrot',
          userSelf: false,
          date: new Date()
        },
        {
          content: 'Big Nog was petting it. He thought it was a horse. Big Nog was petting it. He thought it was a horse.',
          userSelf: false,
          date: new Date()
        },
        {
          content: 'Big Nog was petting it. He thought it was a horse. Big Nog was petting it. He thought it was a horse.Big Nog was petting it. He thought it was a horse. Big Nog was petting it. He thought it was a horse.',
          userSelf: false,
          date: new Date()
        }
      ]
    },
    '2': {
      id: '2',
      userGQL: {
        name: 'Edgy Brah',
        img: 'http://lolmma.com/wp-content/uploads/2010/08/eddy_bravo_on_pot_lolmma.jpg'
      },
      messages: [
        {
          content: "Get in my crucifix!",
          userSelf: false,
          date: new Date()
        },
      ]
    },
    '3': {
      id: '3',
      user: {
        nameGQL: 'Joe Rogan',
        img: 'http://49.media.tumblr.com/0678c6c727c1c2dc46062a1a41bba6c7/tumblr_o0x4anfUf11ry1rm7o4_r1_500.gif'
      },
      messages: [
        {
          content: 'I agree 100%',
          userSelf: false,
          date: new Date()
        },
        {
          content: "I shouldn't have said Ronda Rousey could beat half the male UFC bantamweights",
          userSelf: false,
          date: new Date()
        }
      ]
    }
  },
}

export const reduxReducerUser = (
    state: ReduxStateUser = initialReduxStateUser,
    action: ActionType
  ): ReduxStateUser => {

  let A = Actions.User
  switch ( action.type ) {

    case A.USER_GQL:
      return { ...state, userGQL: action.payload }

    case A.UPDATE_MESSAGES:
      console.info(action.payload)
      let sessionId = state.currentSessionId
      let session = state.sessions[sessionId]
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [sessionId]: {
            ...session,
            messages: [ ...session.messages, action.payload ]
          }
        }
      }

    default: {
      return state
    }
  }
}


