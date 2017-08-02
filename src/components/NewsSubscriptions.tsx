
import * as React from 'react'
import { Component } from 'react'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../redux/reducer'
import { Actions, ActionType } from '../redux/reduxActions'
import { iUserProfile, iNewsArticle } from '../typings/interfaceDefinitions'

import { SpinnerRectangle, SpinnerDots } from './Spinners'
import NewsHunt from './NewsHunt'
import Title from './Title'

import JSONTree from 'react-json-tree'



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
        publishedBy: this.props.newsPublisher
      },
      updateQuery: ( prevState, { subscriptionData }: { subscriptionData: SubscriptionsData }) => {

        let mutationType = subscriptionData.data.NewsArticle.mutation
        let newNewsArticle: iNewsArticle = subscriptionData.data.NewsArticle.node

        switch (mutationType) {
          case 'CREATED': {
            console.info('CREATED')
            console.info(newNewsArticle)
            let newAllNewsArticles = [...prevState.allNewsArticles, newNewsArticle]
            this.props.updateLikedArticles(newAllNewsArticles)
            return {
              ...prevState,
              allNewsArticles: newAllNewsArticles
            }
          }

          case 'DELETED': {
            console.info('DELETED')
            console.info(newNewsArticle)
            let newAllNewsArticles = prevState.allNewsArticles.filter(
              (p: iNewsArticle) => p.id !== subscriptionData.data.NewsArticle.previousValues.id
            )
            this.props.updateLikedArticles(newAllNewsArticles)
            return {
              ...prevState,
              allNewsArticles: newAllNewsArticles
            }
          }

          case 'UPDATED': {
            console.info('UPDATED')
            console.info(newNewsArticle)
            let newAllNewsArticles = [...prevState.allNewsArticles, newNewsArticle]
            this.props.updateLikedArticles(newAllNewsArticles)
            return {
              ...prevState,
              allNewsArticles: newAllNewsArticles
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
      return <div><Title>Error in NewsSubscriptions.tsx Component</Title></div>
    }
    if (this.props.data.loading) {
      return (
        <div className="news__subscriptions">
          <div className="news__subscriptions--loading">
            Loading News Subscriptions
            <SpinnerRectangle height='48px' width='6px' style={{ padding: '2rem' }}/>
          </div>
        </div>
      )
    }
    if (this.props.data.allNewsArticles) {
      return (
        <div className="news__subscriptions">
          <NewsHunt data={this.props.data}/>
          {/* <JSONTree data={this.props.data} /> */}
        </div>
      )
    }
  }
}


interface SubscriptionsData {
  data?: {
    NewsArticle?: {
      mutation?: string
      node?: {
        id?: string
        author?: string
        title?: string
        users?: iUserProfile[]
      }
      previousValues?: any
    }
  }
}

interface ReduxDispatchProps {
  updateUserProfile?(userProfile: iUserProfile): Dispatch<ActionType>
  updateLikedArticles?(NewsArticles: iNewsArticle[]): Dispatch<ActionType>
}
interface ReduxProps {
  userProfile: iUserProfile
  publishedBy: string
}
interface ReactProps {
  data?: {
    error: string
    loading: boolean
    allNewsArticles?: iNewsArticle[]
  }
  getNewsArticles?({
    variables: {
      numberOfArticles?: number
    }
  }): void // graphql-query
}




const getNewsArticles = gql`
query($numberOfArticles: Int!, $publishedBy: String!) {
  allNewsArticles(
    last: $numberOfArticles,
    filter: { publishedBy: $publishedBy }
  ) {
    id
    author
    title
    description
    urlToImage
    url
    publishedBy
    numberOfLikes
    users {
      id
    }
  }
}
`
let getNewsArticlesQueryOptions = {
  options: (ownProps: ReduxProps & ReactProps) => {
    return ({
      variables: {
        numberOfArticles: 10,
        publishedBy: ownProps.publishedBy,
      }
    })
  },
  fetchPolicy: 'network-only'
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
      numberOfLikes
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

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfile: ({ userProfile }) => dispatch(
      { type: Actions.User.UPDATE_USER_PROFILE, payload: userProfile }
    ),
    updateLikedArticles: (NewsArticles) => dispatch(
      { type: Actions.User.UPDATE_LIKED_ARTICLES, payload: NewsArticles }
    ),
  }
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    userProfile: state.reduxUser.userProfile,
    publishedBy: state.reduxUser.newsPublisher,
  }
}

export default compose(
  connect<ReduxProps, ReduxDispatchProps, ReactProps>( mapStateToProps, mapDispatchToProps )
  graphql(getNewsArticles, getNewsArticlesQueryOptions),
)( NewsSubscriptions )
