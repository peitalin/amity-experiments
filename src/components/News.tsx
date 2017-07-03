
import * as React from 'react'
import 'styles/News.scss'
import JSONTree from 'react-json-tree'


interface DispatchProps {
}
interface StateProps {
}
interface ReactProps {
}
interface NewsState {
  NewsCorpContent: {
    offset: number
    pageSize: number
    resultSize: number
    results: NewsResults[]
    totalHits: number
    warnings: string[]
  }
}
interface NewsResults {
  authors: Array<number>
  categories: Array<number>
  contentType: string
  dateCreated: Date
  dateLive: Date
  dateUpdated: Date
  description: string
  domainLinks: Array<number>
  domainOriginUpdated: string
  domains: Array<number>
  format: string
  height: number
  id: {
    value: string
    link: string
  }
  imageName: string
  imageType: string
  keywords: Array<number>
  link: string
  locationGeoPoints: Array<number>
  origin: string
  originId: string
  originalSource: string
  related: Array<number>
  revision: number
  sourceImageId: string
  status: string
  subtitle: string
  systemOriginUpdated: string
  title: string
  urlTitle: string
  userOriginUpdated: string
  version: string
  width: number
}



class News extends React.Component<StateProps & DispatchProps & ReactProps, NewsState> {

  state = {
    NewsCorpContent: {
      offset: 0,
      pageSize: 0,
      resultSize: 0,
      results: [],
      totalHits: 0,
      warnings: [],
    },
  }

  componentDidMount() {
    var NewsCorpAPIKey = 'tkw8nw39njardwbvagepbeqk'
    var Params = {
      // includeRelated=false&includeReferences=false&includeBodies=false&includeFutureDated=false&includeDraft=false&view=VERBOSE&api_key=${NewsCorpAPIKey}
    }
    var URL = `http://cdn.newsapi.com.au/content/v2/?includeRelated=false&includeReferences=false&includeBodies=false&includeFutureDated=false&includeDraft=false&includeBodies=true&view=VERBOSE&api_key=${NewsCorpAPIKey}`

    fetch(URL)
      .then(res => res.json())
      .then(jsonRes => {
        console.info(jsonRes)
        this.setState((state, props) => {
          return {
            NewsCorpContent: jsonRes
          }
        })
      })
  }

  render() {
    return (
      <div className="news__corp__api">
        <h1>News Corp Content API</h1>
        <h2> News Corp API Results </h2>
        {(
          this.state.NewsCorpContent.results.map(( News: NewsResults, i: number ) => {
            return (
              <div key={i}>
                { News.title }
                { News.subtitle }
                { News.description }
                <br/>
                {(
                  News.contentType === "IMAGE" &&
                    <img className="news__corp__api__img" src={News.id.link} alt={News.id.value}/>
                )}
                <br/><br/>
                <JSONTree data={News} />
              </div>
            )
          })
        )}
      </div>
    )
  }
}

export default News;
