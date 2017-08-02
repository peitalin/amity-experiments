

import { ActionType, Actions } from './reduxActions'
import { iArticle, iUserProfile } from '../typings/interfaceDefinitions'


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxUser: ReduxStateUser
}
/////////////
export interface ReduxStateUser {
  userProfile?: iUserProfile // my userprofile
}

const initialReduxStateUser = {
  userProfile: {
    id: 'cx12312graphcool'
    emailAddress: 'test@amity.io',
    upvotes: 123,
    downvotes: 91,
    username: 'tester',
  }
}

export const reduxReducerUser = (
    state: ReduxStateUser = initialReduxStateUser,
    action: ActionType
  ): ReduxStateUser => {

  let A = Actions.User
  switch ( action.type ) {

    case A.UPDATE_USER_PROFILE:
      return { ...state, userProfile: action.payload }

    default: {
      return state
    }
  }
}


