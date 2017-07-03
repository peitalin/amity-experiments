

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import AppRoutes from './AppRoutes'


//// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reduxReducerUser } from './reducer'
//// Redux-persist
import { getStoredState, createPersistor, persistStore, autoRehydrate } from 'redux-persist'
// import localforage from 'localforage'
import { SpinnerRectangle } from './components/Spinners'



interface AppApolloState {
  rehydrated: boolean
}

class AppApollo extends React.Component<any, AppApolloState> {

  state = { rehydrated: false }

  componentWillMount() {
    // const GRAPHQL_PROJECT_ID = "cixfj2p7t5esw0111742t44e8"
    // this.initApolloNetworkInterface(GRAPHQL_PROJECT_ID)
    this.persistReduxStore()
  }

  private persistReduxStore = (GRAPHQL_PROJECT_ID) => {

    let persistState = false;

    getStoredState({ storage: localforage }, (err, rehydratedState) => {
      // const initialState = { apollo: { data: rehydratedState.apollo ? rehydratedState.apollo.data : {} }}
      let reduxStore = createStore(
        combineReducers({
          reduxUser: reduxReducerUser,
        }),
        persistState ? rehydratedState : {},
        compose(
          this.registerReduxDevtools(),
        )
      );

      // this.clearStore(persistor)
      if (persistState) {
        const persistor = createPersistor(reduxStore, { storage: localforage })
        console.info('Rehydrating complete. rehydratedState: ', rehydratedState)
      } else {
        console.info('Rehydrating OFF')
      }
      this.reduxStore = reduxStore
      this.setState({ rehydrated: true })
    })
  }

  clearStore = (persistor) => {
    ///// MUST CLEAR STORE WHEN  MODIFYING REDUCERS
    //// otherwise old state shape is persisted
    console.info("Purging redux-persist store!")
    persistor.purge([ 'apollo', 'reduxUser' ]) // only purges redux store, not apollo-client
    localforage.clear()
    ////// must login again after purge to get user profile
  }

  registerReduxDevtools = () => {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
      return window.__REDUX_DEVTOOLS_EXTENSION__()
    } else {
      return f => f
    }
  }

  render() {
    if(!this.state.rehydrated) {
      return (
        <div>
          <div style={{ position: 'fixed', top: 10, right: 10 }}>
            <SpinnerRectangle height='23px' width='6px'/>Rehydrating
          </div>
        </div>
      )
    }
    return (
      <Provider store={this.reduxStore}>
        <AppRoutes />
      </Provider>
    )
  }
}



const render = (AppRoutes) => {
  ReactDOM.render(
    <AppContainer>
      <AppApollo />
    </AppContainer>
    , document.getElementById('root')
  )
}
render(AppRoutes)




// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./AppRoutes', () => {
    const NewApp = require('./AppRoutes.tsx').default
    render(NewApp)
  })
}

