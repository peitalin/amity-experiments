

import { ActionType, Actions } from './reduxActions'
import { iArticle, iUserProfile } from '../typings/interfaceDefinitions'


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxUser: ReduxStateUser
}
/////////////
export interface ReduxStateUser {
  userProfile?: iUserProfile // my userprofile
  newsCategory?: string
  newsPublisher?: string
}

const initialReduxStateUser = {
  userProfile: {
    id: 'cx12312graphcool'
    emailAddress: 'test@amity.io',
    upvotes: 123,
    downvotes: 91,
    name: 'tester',
    newsArticles: [],
  }
  newsCategory: 'tech',
  newsPublisher: 'techcrunch',
}

export const reduxReducerUser = (
    state: ReduxStateUser = initialReduxStateUser,
    action: ActionType
  ): ReduxStateUser => {

  let A = Actions.User
  switch ( action.type ) {

    case A.UPDATE_USER_PROFILE:
      return { ...state, userProfile: action.payload }

    case A.UPDATE_NEWS_CATEGORY:
      return { ...state, newsCategory: action.payload }

    case A.UPDATE_NEWS_PUBLISHER:
      return { ...state, newsPublisher: action.payload }

    case A.UPDATE_LIKED_ARTICLES:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          newsArticles: action.payload
        }
      }

    default: {
      return state
    }
  }
}



