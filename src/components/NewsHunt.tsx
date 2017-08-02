

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
              <li className='active'><span className='fa fa-fire'></span> <span className='text'>HOT</span></li>
              <li><span className='fa fa-plus'></span> <span className='text'>NEW</span></li>
              <li><span className='fa fa-newspaper-o'></span> <span className='text'>TOP</span></li>
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
                        <h4 className=''>{NewsArticle.description}</h4>
                        <p className=''>Journalist - {NewsArticle.author}</p> 

                      </div>
                      <div className='actions_hunt'>
                        <img src={require('../img/techcrunch.svg')} />
                        <button><span className='fa fa-caret-up'></span>234</button>
                        <button><span className='fa fa-commenting-o'></span>23</button>
                      </div>
                      <div className='extras'>
                        <span>
                          123 Live
                        </span>
                        <span>
                          1243 <span className='fa fa-eye'></span>
                        </span>  
                      </div>
                    </div>
                  </div>
              )
            })
          }
          </div>
          <div className='news_hunt_right_side'>
            <div className="news_hunt_header">
              <span className='title'>Get Reading!</span>
            </div>
            <p>
              On news hunt you can have a say in what news is hot or not. Just try upvoting an article and see what happens.
            </p>
          </div>
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
