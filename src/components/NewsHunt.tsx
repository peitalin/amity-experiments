

import * as React from 'react'
import { Component } from 'react'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, iSessionType } from '../reducer'
import { Actions as A } from '../redux/reduxActions'
import { iNewsArticle } from '../typings/interfaceDefinitions'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import 'styles/NewsHunt.scss'

import AddNewsArticle from './AddNewsArticle'
import Title from './Title'
import { SpinnerRectangle, SpinnerDots } from './Spinners'

import {
  iUserProfile, iNewsArticle, iNewsApiResponse,
  graphqlQueryResponse, graphqlMutationResponse, // graphql-queries and mutations
} from '../typings/interfaceDefinitions'




class NewsHunt extends Component<ReduxProps & ReduxDispatchProps & ReactProps, ReactState> {

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state === nextState) && (this.props === nextProps)) {
      return false
    }
    return true
  }

  render() {
    if (this.props.data.loading) {
      return <Title><SpinnerRectangle height='66px' width='8px' dark/></Title>
    }
    if (this.props.data.error) {
      return <Title>Error in NewsHunt.tsx</Title>
    }
    if (this.props.data.allNewsArticles.length === 0) {
      return <Title>No News Articles</Title>
    } else {
      return (
        <div className='news_hunt'>
          <div className="news_hunt_container">
          {
            this.props.data.allNewsArticles.map(( NewsArticle, i ) => {
              return (
                <div className='news_hunt_NewsArticle' key={i}>
                  <a href={NewsArticle.url}>
                    <div className='urlToImage'>
                      <img src={NewsArticle.urlToImage}/>
                    </div>
                  </a>
                  <div className='NewsArticle_metadata'>
                    <h1>{ NewsArticle.title }</h1>
                    <h2 className=''>{ NewsArticle.author }</h2>
                    <h2 className=''>{ NewsArticle.publishedAt }</h2>
                    <h4 className=''>{ NewsArticle.description }</h4>
                    <AddNewsArticle NewsArticle={NewsArticle} />
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      )
    }
  }
}


/// Typescript declarations from Props -> PropTypes
interface ReduxDispatchProps {
}
interface ReduxProps {
  userProfile: iUserProfile // redux
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
interface ReactState {
}


//// Apollo-Graphql
const getNewsArticles = gql`
query($numberOfArticles: Int!) {
  allNewsArticles(last: $numberOfArticles) {
    id
    author
    title
    description
    urlToImage
    url
    publishedBy
  }
}
`
let getNewsArticlesQueryOptions = {
  options: (ownProps) => ({
    variables: {
      numberOfArticles: 10
    }
  })
}

//// Redux
const mapStateToProps = ( state: ReduxState ) => {
  return {
    userProfile: state.reduxUser.userProfile
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    dispatch: dispatch
  }
}


// Compose Redux + Apollor GraphQL
export default compose(
  connect<ReduxDispatchProps, ReduxProps, ReactProps>(mapStateToProps, mapDispatchToProps),
  graphql(getNewsArticles, getNewsArticlesQueryOptions),
)( NewsHunt )
