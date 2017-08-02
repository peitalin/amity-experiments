

import * as React from 'react'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, iSessionType } from '../reducer'
import { Actions as A } from '../redux/reduxActions'
import { iArticle } from '../typings/interfaceDefinitions'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'


// import * as gsap from 'gsap'

import 'styles/NewsHunt.scss'



interface DispatchProps {
}
interface StateProps {
}
interface ReactProps {
  data?: any
}
interface ReactState {
  news: {
    articles: iArticle[]
    sortBy: string
    source: string
    status: string
  }
}


class NewsHunt extends React.Component<StateProps & DispatchProps & ReactProps, ReactState> {

  constructor(props: any) {
    super(props)
    this.state = {
      news: {
        articles: []
      },
    }
  }

  componentDidMount() {
    this.fetchNews()
  }

  fetchNews = async () => {
    let url = 'https://newsapi.org/v1/articles?source=techcrunch&apiKey=298e76f22d7d48599566e383b9842d53'
    await fetch(url).then(res => res.json()).then(data => this.setState({ news: data }))
    console.info(this.state.news)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state === nextState) && (this.props === nextProps)) {
      return false
    }
    return true
  }

  handleScroll = (event) => {
  }

  handleResize = () => {
  }

  handleUpvote = () => {

  }

  render() {
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
              this.state.news.articles.map((article, i) => {
                return (
                  <div className='news_hunt_article' key={i}>
                    <a href={article.url}>
                      <div className='urlToImage' style={{ backgroundImage: "url(" + article.urlToImage + ")" }}>
                      </div>
                    </a>
                    <div className='article_content'>
                      <div className='article_metadata'>
                        <h1>{article.title}</h1>
                        {/* <h2 className=''>{ article.author }</h2> */}
                        <h4 className=''>{article.description}</h4>

                      </div>
                      <div className='actions_hunt'>
                        <button onClick={this.handleUpvote}><span className='fa fa-caret-up'></span>upvote</button>
                        <button onClick={this.handleUpvote}><span className='fa fa-commenting-o'></span>Comment</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='news_hunt_right_side'>
          </div>
        </div>
      </div>
    )
  }
}


const upvoteNewsArticle = gql`
mutation($prediction: Float, $userId: ID!, $geojsonId: ID!) {
  createPrediction(
    prediction: $prediction
    userId: $userId
    geojsonId: $geojsonId
    linkComplete: true
  ) {
    id
    prediction
  }
}
`

const mapStateToProps = (state: ReduxState): ReduxStateUser => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserGQL: (userGQL: userGQL) => dispatch(
      { type: A.User.USER_GQL, payload: userGQL }
    ),
    updateSessionId: (sessionId: string) => dispatch(
      { type: A.User.SWITCH_SESSION, payload: sessionId }
    ),
    dispatch: dispatch
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(NewsHunt)
