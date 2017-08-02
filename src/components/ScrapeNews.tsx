

import * as React from 'react'
import { Component } from 'react'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../redux/reducer'
import { Actions } from '../redux/actions'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const NEWS_API_KEY = '298e76f22d7d48599566e383b9842d53'



class ScrapeNews extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {}

  componentDidMount() {
    this.fetchNews({ publisher: this.props.newsPublisher })
  }

  componentWillUpdate(nextProps: ReduxProps, nextState) {
    // this.fetchNews({ publisher: nextProps.newsPublisher })
  }

  fetchNews = async({ publisher }: { publisher: string }): void => {
    let url = `https://newsapi.org/v1/articles?source=${publisher}&apiKey=${NEWS_API_KEY}`
    let newsData: NewsApiResponse = await fetch(url).then(res => res.json())

    if (newsData.articles.length > 0) {
      try {
        // try post 1st news article to GraphCool
        this.saveToGraphCool(newsData.articles[0], newsData.source)
        // if it doesn't fail (new news), try upload the rest
        newsData.articles.map(NewsArticle => {
          this.saveToGraphCool(NewsArticle, newsData.source)
        })
      } catch(err) {
        console.info(err)
      }
    }
  }

  saveToGraphCool = async(NewsArticle: iNewsArticle, source: string) => {
    try {
      let graphqlResponse: mutationResponse = await this.props.addNewsArticle({
        variables: {
          author:      NewsArticle.author,
          title:       NewsArticle.title,
          description: NewsArticle.description,
          publishedAt: NewsArticle.publishedAt,
          publishedBy: source,
          url:         NewsArticle.url,
          urlToImage:  NewsArticle.urlToImage,
        }
      })
      console.info(`Just added this article: ${graphqlResponse.data.createNewsArticle.title}`)
    } catch(err) {
      console.info("Article already exists on GraphCool")
    }
    return graphqlResponse
  }

  handleClick = () => {
    this.fetchNews({ publisher: this.props.newsPublisher })
  }

  render() {
    return (
      <div className="scrape_news" style={{ position: 'fixed', top: 10, right: 100, zIndex: 6 }}>
        <button onClick={this.handleClick}>Scrape More News</button>
      </div>
    )
  }
}



interface ReduxDispatchProps {
}
interface ReduxProps {
  newsPublisher: string
}
interface ReactProps {
  addNewsArticle?({
    variables: {
      author?: string
      title?: string
      description?: string
      publishedAt?: string
      url?: string
      urlToImage?: string
    }
  }): void // graphql-mutation
}

const addNewsArticle = gql`
mutation(
  $author: String!,
  $title: String!,
  $description: String!,
  $publishedAt: String!,
  $publishedBy: String!,
  $url: String!,
  $urlToImage: String!,
) {
  createNewsArticle(
    author: $author,
    title: $title,
    description: $description,
    publishedAt: $publishedAt,
    publishedBy: $publishedBy,
    url: $url,
    urlToImage: $urlToImage,
  ) {
    id
    title
    author
  }
}
`


// Redux
const mapDispatchToProps = ( dispatch ) => {
  return {
    dispatch: dispatch
  }
}
const mapStateToProps = ( state: ReduxState ) => {
  return {
    newsPublisher: state.reduxUser.newsPublisher
  }
}

export default compose(
  graphql(addNewsArticle, { name: 'addNewsArticle' }),
  connect<ReduxProps, ReduxDispatchProps, ReactProps>( mapStateToProps, mapDispatchToProps ),
)( ScrapeNews )
