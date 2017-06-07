

import { ActionType, Actions } from './reduxActions'
import { userGQL, geoData, iPrediction } from './typings/interfaceDefinitions'

import * as Immutable from 'immutable'

import { isParcelNear } from './utils/worker'
let MyWorker = require('worker-loader!./utils/worker.ts')


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxParcels: ReduxStateParcels
  reduxUser: ReduxStateUser
  apollo: Object
}
//////////////////////////////////////
////// Mapbox state reducer //////////


////// Mapbox state reducer //////////
export interface ReduxStateUser {
  userGQL?: userGQL
  isUpdatingMyPredictions?: boolean
}

const initialReduxStateUser: ReduxStateUser = {
  userGQL: {
    emailAddress: 'sandra@sully.com',
    username: 'Sandra Sully',
    id: 'cxj1234',
    upvotes: 100,
    downvotes: 20,
    streams: ['Ace'],
    bids: [],
    predictions: [],
  },
  isUpdatingMyPredictions: false,
}

export const reduxReducerUser = (
    state: ReduxStateUser = initialReduxStateUser,
    action: ActionType
  ): ReduxStateUser => {

  let A = Actions.User
  switch ( action.type ) {

    case A.USER_GQL:
      return { ...state, userGQL: action.payload }

    case A.IS_UPDATING_MY_PREDICTIONS:
      return { ...state, isUpdatingMyPredictions: action.payload }

    default: {
      return state
    }
  }
}


