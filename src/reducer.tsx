

import { ActionType, Actions } from './reduxActions'
import { userGQL, geoData, iPrediction } from './typings/interfaceDefinitions'
import { TweenLite } from 'gsap'


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxUser: ReduxStateUser
}
/////////////

export interface ReduxStateUser {
  userGQL?: userGQL // my userprofile
  users: {
    [index: string]: userGQL
  } // other user profiles
  nbaTeams: {
    teamName: string
    teamLogo: string
  }
  currentSessionId: string
  filterKey: string
  sessions: iAllSessions
}
export interface iAllSessions {
  [index: string]: iSessionType
}
export interface iSessionType {
  id?: string
  teams?: string[]
  youtubeURL: string
  whoWillWin: {
    [index: string]: number
  }
  messages?: iMessageType[]
}
export interface iMessageType {
  userName?: string
  content?: string
  date?: Date
}

const initialReduxStateUser: ReduxStateUser = {
  userGQL: {
    emailAddress: 'dana@ufc.com',
    username: 'Dana_White',
    img: 'https://s3-ap-southeast-2.amazonaws.com/amitylandingpage/chat/danawhite.png'
    upvotes: 100,
    downvotes: 20,
    streams: ['Ace'],
  },
  users: {
    'Chael_P': {
      username: 'Chael_P',
      img: 'http://www.chicagonow.com/reflections-chicago-life/files/2016/12/hi-res-87fbf2b3a25a1499e8fe696c596872df_crop_north.jpg'
      upvotes: 100,
      downvotes: 220,
    },
    'Edgy_Brah': {
      username: 'Edgy_Brah',
      img: 'http://lolmma.com/wp-content/uploads/2010/08/eddy_bravo_on_pot_lolmma.jpg'
      upvotes: 10,
      downvotes: 80,
    },
    'Joe_Rogan': {
      name: 'Joe_Rogan',
      img: 'http://49.media.tumblr.com/0678c6c727c1c2dc46062a1a41bba6c7/tumblr_o0x4anfUf11ry1rm7o4_r1_500.gif'
      upvotes: 110,
      downvotes: 50,
    },
  },
  nbaTeams: {
    'Knicks': {
      teamName: 'New York Knicks',
      teamLogo: 'https://s3-ap-southeast-2.amazonaws.com/amity-experiments/new_york.svg',
    },
    'Lakers': {
      teamName: 'LA Lakers',
      teamLogo: 'https://s3-ap-southeast-2.amazonaws.com/amity-experiments/lakers.svg',
    },
    'Clippers': {
      teamName: 'LA Clippers',
      teamLogo: 'https://s3-ap-southeast-2.amazonaws.com/amity-experiments/clippers.svg',
    },
    'Kings': {
      teamName: 'Sacramento Kings',
      teamLogo: 'https://s3-ap-southeast-2.amazonaws.com/amity-experiments/sacramento.svg',
    },
    'Bulls': {
      teamName: 'Chicago Bulls',
      teamLogo: 'https://s3-ap-southeast-2.amazonaws.com/amity-experiments/chicago.svg',
    },
    'Mavericks': {
      teamName: 'Dallas Mavericks',
      teamLogo: 'https://s3-ap-southeast-2.amazonaws.com/amity-experiments/dallas.svg',
    },
    'Warriors': {
      teamName: 'Golden State Warriors',
      teamLogo: 'https://s3-ap-southeast-2.amazonaws.com/amity-experiments/warriors.svg',
    },
  }
  currentSessionId: '1',
  filterKey: '',
  sessions: {
    '1': {
      id: '1',
      teams: ['Knicks', 'Bulls'],
      whoWillWin: {
        'Knicks': 122,
        'Bulls': 88,
      }
      youtubeURL: 'yOjUV4RYJiM',
      messages: [
        {
          content: 'I once saw Nogueira trying to feed a bus a carrot',
          userName: 'Chael_P',
          date: new Date()
        },
        {
          content: 'Big Nog was petting it. He thought it was a horse. Big Nog was petting it. He thought it was a horse.',
          userName: 'Chael_P',
          date: new Date()
        },
        {
          content: "Get in my crucifix!",
          userName: "Edgy_Brah",
          date: new Date()
        },
        {
          content: 'Big Nog was petting it. He thought it was a horse. Big Nog was petting it. He thought it was a horse.Big Nog was petting it. He thought it was a horse. Big Nog was petting it. He thought it was a horse.',
          userName: 'Chael_P',
          date: new Date()
        }
      ]
    },
    '2': {
      id: '2',
      teams: ['Lakers', 'Clippers'],
      whoWillWin: {
        'Lakers': 222,
        'Clippers': 238,
      }
      youtubeURL: 'UgApy9ax328',
      messages: [
        {
          content: "This is what I call the electric chair",
          userName: "Edgy_Brah",
          date: new Date()
        },
        {
          content: "That's a once in a lifetime athelete right there folks.",
          userName: 'Joe_Rogan',
          date: new Date()
        },
        {
          content: "Pack your shit up, it's time to go Clippers",
          userName: 'Joe_Rogan',
          date: new Date()
        }
      ]
    },
    '3': {
      id: '3',
      teams: ['Mavericks', 'Kings']
      whoWillWin: {
        'Mavericks': 172,
        'Kings': 133,
      }
      youtubeURL: 'IcKEGXIt7Fk',
      messages: [
        {
          content: "Kings won't beat Mavericks, they lil off this season",
          userName: "Edgy_Brah",
          date: new Date()
        },
        {
          content: 'I agree 100%',
          userName: 'Joe_Rogan',
          date: new Date()
        },
        {
          content: "I shouldn't have bet half my paycheck on them tho",
          userName: 'Joe_Rogan',
          date: new Date()
        }
      ]
    },
    '4': {
      id: '4',
      teams: ['Lakers', 'Warriors']
      whoWillWin: {
        'Lakers': 166,
        'Warriors': 233,
      }
      youtubeURL: 'Mi3lZ3AArPY',
      messages: [
        {
          content: "GOLDEN STATE REPRESENT",
          userName: "Edgy_Brah",
          date: new Date()
        },
        {
          content: 'wat.',
          userName: 'Joe_Rogan',
          date: new Date()
        },
        {
          content: "LAKERS HYPE TRAIN DEPARTING>>> CHOO CHOO CHOO WHO COMING",
          userName: 'Joe_Rogan',
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

  // TweenLite.from('.chatter__messagebox', 1, {
  //   x: 300,
  //   ease: Elastic.easeOut.config(1, 1)
  // })


  let A = Actions.User
  switch ( action.type ) {

    case A.USER_GQL:
      return { ...state, userGQL: action.payload }

    case A.UPDATE_MESSAGES:
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

    case A.SWITCH_SESSION:
      console.info(action)
      return {
        ...state,
        currentSessionId: action.payload
      }

    case A.VOTE_FOR_TEAM:
      let sessionId = state.currentSessionId
      let session = state.sessions[sessionId]
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [sessionId]: {
            ...session,
            whoWillWin: action.payload
          }
        }
      }

    case "PING":
      console.info("PING")
      return state

    case "PONG":
      console.info("PONG")
      return state

    default: {
      return state
    }
  }
}


