

import * as React from 'react'
import { Component } from 'react'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const NEWS_API_KEY = '298e76f22d7d48599566e383b9842d53'



class ScrapeNews extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {}

  componentDidMount() {
    this.fetchNews({ publisher: 'techcrunch' })
  }

  fetchNews = async({ publisher }: { publisher: string }): void => {
    let url = `https://newsapi.org/v1/articles?source=${publisher}&apiKey=${NEWS_API_KEY}`
    let newsData: NewsApiResponse = await fetch(url).then(res => res.json())
    if (newsData.articles.length > 0) {
      newsData.articles.map(NewsArticle => {
        this.saveToGraphCool(NewsArticle, newsData.source)
      })
    }
  }

  saveToGraphCool = async(NewsArticle: iNewsArticle, source: string): void => {
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
  }

  handleClick = () => {
    this.fetchNews({ publisher: 'techcrunch' })
  }

  render() {
    return (
      <div className="scrape_news" style={{ position: 'fixed', top: 10, right: 100, zIndex: 6 }}>
        <button onClick={this.handleClick}>Scrape More News</button>
      </div>
    )
  }
}


/// Typescript declarations from Props -> PropTypes
interface ReduxDispatchProps {
}
interface ReduxProps {
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
  $url: String!,
  $urlToImage: String!,
) {
  createNewsArticle(
    author: $author,
    title: $title,
    description: $description,
    publishedAt: $publishedAt,
    url: $url,
    urlToImage: $urlToImage,
  ) {
    id
    title
    author
  }
}
`

export default graphql(addNewsArticle, { name: 'addNewsArticle' })( ScrapeNews )
