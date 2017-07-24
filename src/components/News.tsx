
import * as React from 'react'
import JSONTree from 'react-json-tree'
import * as axios from 'axios'

import 'styles/News.scss'
import {
  iGetSearch,
  iGetRetrieve,
  iGetCollectionSearch,
  iGetCollectionRetrieve,
  iNewsContentItem,
  iNewsStory,
} from '../typings/interfaceDefinitions'

import NewsStory from './NewsStory'



interface ReactProps {
}
interface NewsState {
  getSearch?: iGetSearch
  getRetrieve?: iGetRetrieve
  getCategoryList?: iGetCategoryList
  getCollectionSearch?: iGetCollectionSearch
  getCollectionRetrieve?: iGetCollectionRetrieve
  listOfNewsStories?: iGetCollectionSearch[]
}
const NewsCorpAPIKey = 'tkw8nw39njardwbvagepbeqk'


class News extends React.Component<any, NewsState> {

  state = {
    getSearch: undefined,
    getRetrieve: undefined,
    getCategoryList: undefined,
    getCollectionSearch: undefined,
    getCollectionRetrieve: undefined,
    listOfNewsStories: [],
  }

  componentDidMount() {
    this.getSearch()
    this.getRetrieve()
    this.getCollectionSearch()
  }


  getSearch = async (): iGetSearch => {
    // GET search /content/v2
    // Retrieve a list of content items sorted by most recent first.
    var Params = {
      includeRelated: false,
      includeReferences: false,
      includeBodies: false,
      includeFutureDated: false,
      includeDraft: false,
      view: "VERBOSE",
      sort: "DATE_LIVE", // "DATE_CREATED", "DATE_MODIFIED", "RELEVANCE"
      api_key: NewsCorpAPIKey,
    }
    const { data } = await axios.request({
      url: 'http://cdn.newsapi.com.au/content/v2/',
      params: Params
    })
    this.setState({ getSearch: data })
    return data
  }

  getRetrieve = async (id: string): iGetRetrieve => {
    // GET retrieve /content/v2/:id
    // Retrieve a single content item by ID or Origin ID. Retrieved content items contain
    // detailed information not returned by default via search,
    // such as related content items and the body text (if present).
    var id = id || '940ef23d13c536843473c3575cded505'
    var Params = {
      api_key: NewsCorpAPIKey,
    }
    const { data } = await axios.request({
      url: `http://cdn.newsapi.com.au/content/v2/${id}`,
      params: Params
    })
    this.setState({ getRetrieve: data })
    return data
  }

  getCategoryList = async (): iGetCategoryList => {
    // GET category list /category/v2/
    // Retrieve a list of categories using a RESTful path structure.
    // e.g. /category/v2/display/ or /category/v2/display/news.com.au/ etc.
    // By default the direct descendants of the requested category path are returned in a flat structure.
    // See the 'include' and 'mode' parameters for more options.
  }

  getCollectionSearch = async (): iGetCollectionSearch => {
    // GET collection search /content/v2/collection
    // Search collectionsm, filter by domain
    var Params = {
      includeFutureDated: false,
      includeDraft: false,
      view: 'VERBOSE',
      pageSize: 10,
      api_key: NewsCorpAPIKey,
    }
    const { data } = await axios.request({
      url: 'http://cdn.newsapi.com.au/content/v2/collection/',
      params: Params
    })
    console.info(data)
    this.setState({ getCollectionSearch: data, listOfNewsStories: data })
    return data
  }


  getCollectionRetrieve = async (id: string): iGetCollectionRetrieve => {
    // GET collection retrieve /content/v2/collection/:id
    //  Retrieve a collection by ID. Retrieved content items contain
    //  detailed information not returned by default via search,
    //  such as related content items and the body text (if present).

    console.info(id)
    var id = id || '13b01b3c1c760f53fc45941e2536d245' // random collection ID
    var Params = {
      includeFutureDated: false,
      includeDraft: false,
      includeRelated: false,
      view: 'VERBOSE',
      includeDynamic: false,
      pageSize: 1,
      api_key: NewsCorpAPIKey,
    }
    const { data } = await axios.request({
      url: `http://cdn.newsapi.com.au/content/v2/collection/${id}`,
      params: Params
    })
    console.info(data)
    this.setState({ getCollectionRetrieve: data })
    return data
  }


  render() {
    return (
      <div className="news__corp__api">
        <h1>News Corp Content API</h1>
        <h2> News Corp API Results </h2>
        <br/><br/>
        <button className="load-stories-button"
          onClick={() => this.getCollectionRetrieve()}
        >
          Load stories
        </button>
        <br/><br/>
        {(
          this.state.getRetrieve &&
          <NewsStory News={this.state.getRetrieve}/>
        )}
        <br/>
        {(
          this.state.getSearch &&
          this.state.getSearch.results.map(( News: iNewsContentItem ) => {
            return (
              <div key={News.id.value}>
                <hr/>
                <br/>
                <div>
                  <span>Title:</span>{ News.title }
                </div>
                <div>
                  <span>Subtitle:</span>{ News.subtitle }
                </div>
                <div>
                  <span>id:</span>{ News.id.value }
                </div>
                <div>
                  <span>Description:</span>{ News.description }
                </div>
                <div>
                  <span>Caption:</span>{ News.caption }
                </div>
                <br/>
                {(
                  News.contentType === "IFRAME" &&
                  <div className="iframe">
                    <div className="content" dangerouslySetInnerHTML={{__html: News.body}}></div>
                    <br/>
                  </div>
                )}
                {(
                  News.contentType === "IMAGE" &&
                  <div className='image'>
                    <img className="news__corp__api__img" src={News.id.link} alt={News.id.value}/>
                    <br/>
                  </div>
                )}
                {(
                  News.contentType === "NEWS_STORY" &&
                  <div className="news-story">
                    <NewsStory/>
                    <br/>
                  </div>
                )}
                <br/>
                <JSONTree data={News} />
                <br/><br/>
              </div>
            )
          })
        )}
      </div>
    )
  }
}

export default News;
