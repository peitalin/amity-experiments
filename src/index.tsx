

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import AppRoutes from './AppRoutes'

//// Graphql
import { createBatchingNetworkInterface, ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
//// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reduxReducerUserFoxSports } from './redux/reducerFoxSports'
import { reduxReducerUser } from './redux/reducer'
//// Redux-persist
import { getStoredState, createPersistor, persistStore, autoRehydrate } from 'redux-persist'
// import localforage from 'localforage'
import { SpinnerRectangle } from './components/Spinners'


////// APOLLO GRAPHQL
const GRAPHQL_PROJECT_ID = "cj5svyhxos1a001606r4jg8wj"
const networkInterface = createBatchingNetworkInterface({
  uri: `https://api.graph.cool/simple/v1/${GRAPHQL_PROJECT_ID}`,
  batchInterval: 40
});
networkInterface.use([
  {
    applyBatchMiddleware: (req, next) => {
      req.options.headers = (req.options.headers) ? req.options.headers : {}
      req.options.headers.authorization = (window.localStorage.getItem('auth0IdToken'))
        ? `Bearer ${window.localStorage.getItem('auth0IdToken')}`
        : undefined // get authentication token from local storage if it exists
      next()
    }
  }
]);
const wsClient = new SubscriptionClient(
  `wss://subscriptions.graph.cool/v1/${GRAPHQL_PROJECT_ID}`,
  { reconnect: true }
);
const apolloClient = new ApolloClient({
  networkInterface: addGraphQLSubscriptions(networkInterface, wsClient),
  dataIdFromObject: o => o.id, // enable object ID for better cacheing
  queryDeduplication: true, // batch graphql queries
  // initialState: initialState,
  // reduxRootSelector: state => state.apollo,
})



class AppApollo extends React.Component<any, any> {

  state = { rehydrated: false }

  componentWillMount() {
    this.persistReduxStore()
  }

  private persistReduxStore = (GRAPHQL_PROJECT_ID) => {

    // let persistState = false;
    let persistState = true;

    getStoredState({ storage: localforage }, (err, rehydratedState) => {
      // const initialState = { apollo: { data: rehydratedState.apollo ? rehydratedState.apollo.data : {} }}
      let reduxStore = createStore(
        combineReducers({
          reduxUserFoxSports: reduxReducerUserFoxSports,
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
    // react-apollo uses redux in the background
    return (
      <ApolloProvider store={this.reduxStore} client={apolloClient}>
        <AppRoutes />
      </ApolloProvider>
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

