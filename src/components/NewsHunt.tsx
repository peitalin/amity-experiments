

import * as React from 'react'
import { Component } from 'react'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../redux/reducer'
import { Actions as A } from '../redux/reduxActions'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import 'styles/NewsHunt.scss'

import AddNewsArticle from './AddNewsArticle'
import Title from './Title'
import { SpinnerRectangle, SpinnerDots } from './Spinners'
import LikeNewsArticle from './LikeNewsArticle'

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
        <div className='news_hunt_header'>
          <div className='header_content'>
            <img src={'https://s3.amazonaws.com/amity-emails-assets/Amity_Symbol+and+Logo_Horizontal_No+Padding_03.png'}/>
            <span className='fa fa-user'></span>
          </div>
        </div>
        <div className='flex_hunt'>
          <div className='news_hunt_left_side'>
            <h3>Filters</h3>
            <ul>
              <li>Hot</li>
              <li>New</li>
              <li>Top</li>
            </ul>
          </div>
          <div className="news_hunt_container">
            <div className="news_hunt_header">
              <span className='title'>Today</span>
            </div>
            {
              this.props.data.allNewsArticles.map(( NewsArticle, i ) => {
                return (
                  <div className='news_hunt_article' key={i}>
                    <a href={NewsArticle.url}>
                      <div className='urlToImage' style={{ backgroundImage: "url(" + NewsArticle.urlToImage + ")" }}>
                      </div>
                    </a>
                    <div className='article_content'>
                      <div className='article_metadata'>
                        <h1>{NewsArticle.title}</h1>
                        <h2 className=''>{ NewsArticle.id }</h2>
                        <h4 className=''>{NewsArticle.description}</h4>
                      </div>
                      <LikeNewsArticle NewsArticle={NewsArticle} upvotes={NewsArticle.users.length}/>
                    </div>
                  </div>
              )
            })
          }
          </div>
          </div>
          <div className='news_hunt_right_side'>
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
  userProfile: iUserProfile
  newsPublisher: string
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
    users {
      id
    }
  }
}
`
let getNewsArticlesQueryOptions = {
  options: (ownProps: ReduxProps & ReactProps) => ({
    variables: {
      numberOfArticles: 10,
      publishedBy: ownProps.newsPublisher,
    }
  })
}

//// Redux
const mapStateToProps = ( state: ReduxState ) => {
  return {
    userProfile: state.reduxUser.userProfile
    newsPublisher: state.reduxUser.newsPublisher
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}


// Compose Redux + Apollor GraphQL
export default compose(
  connect<ReduxDispatchProps, ReduxProps, ReactProps>(mapStateToProps, mapDispatchToProps),
  graphql(getNewsArticles, getNewsArticlesQueryOptions),
)( NewsHunt )
