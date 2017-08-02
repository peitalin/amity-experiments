
import * as React from 'react'
import { Component } from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'



class NewsSubscriptions extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  componentWillMount() {
    this.subscription = this.startSubscriptions()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.subscription) {
      this.subscription = this.startSubscriptions()
    }
  }

  private startSubscriptions = () => {
    return this.props.data.subscribeToMore({
      document: subscriptionQuery,
      variables: {
        emailAddress: this.props.userProfile.emailAddress ? this.props.userProfile.emailAddress : ''
      },
      updateQuery: ( prevState, { subscriptionData } ) => {
        let mutationType = subscriptionData.data.Prediction.mutation
        let newPrediction: iPrediction = subscriptionData.data.Prediction.node

        switch (mutationType) {
          case 'CREATED': {
            let newAllPredictions = [...prevState.allPredictions, newPrediction]
            this.props.updateGeoAllPredictions({ predictions: newAllPredictions })
            return {
              ...prevState,
              allPredictions: newAllPredictions
            }
          }
          case 'DELETED': {
            let newAllPredictions = prevState.allPredictions.filter(
              (p: iPrediction) => p.id !== subscriptionData.data.Prediction.previousValues.id
            )
            this.props.updateGeoAllPredictions({ predictions: newAllPredictions })
            return {
              ...prevState,
              allPredictions: newAllPredictions
            }
          }
          default: {
            console.error(`Subscription mutationType: ${mutationType} not implemented!`)
            return prevState
          }
        }
      },
      onError: (err) => console.error(err),
    })
  }


  render() {
    if (this.props.data.error) {
      return <div><Title>Error in Sub Component</Title></div>
    }
    if (this.props.data.loading) {
      return (
        <div className="map__subscriptions">
          <div className="map__subscriptions--loading">
            Loading Map Subscriptions
            <SpinnerRectangle height='48px' width='6px' style={{ padding: '2rem' }}/>
          </div>
        </div>
      )
    }
    if (this.props.data.allPredictions) {
      return (
        <div id="map__subscriptions" className="map__subscriptions">
          <MapBackground data={this.props.data}/>
        </div>
      )
    }
  }
}

interface ReduxDispatchProps {
}
interface ReduxProps {
}
interface ReactProps {
}

const subscriptionQuery = gql`
subscription($publishedBy: String!) {
  NewsArticle(filter: {
    AND: [
      { mutation_in: [CREATED,DELETED,UPDATED] },
      { node: { publishedBy: $publishedBy }}
    ]
  }) {
    mutation
    node {
      id
      author
      title
      users {
        id
        emailAddress
      }
    }
    previousValues {
      id
    }
  }
}
`


export default compose(
  graphql(linkBidMutation, { name: 'linkBid', fetchPolicy: 'network-only' }),
  connect<ReduxProps, ReduxDispatchProps, ReactProps>( mapStateToProps, mapDispatchToProps )
)( NewsSubscriptions )
