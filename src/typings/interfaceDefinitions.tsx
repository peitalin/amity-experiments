


export interface iUserProfile {
  id?: string
  emailAddress?: string
  upvotes?: number
  downvotes?: number
  username?: string
}

/// News Data from https://newsapi.org/
export interface iNewsApiResponse {
  articles: iNewsArticle[]
  sortBy: string
  source: string
  status: string
}
export interface iNewsArticle {
  author?: string
  description?: string
  publishedAt?: string
  publishedBy?: string
  title?: string
  url?: string
  urlToImage?: string
}


export interface graphqlMutationResponse {
  data: {
    error: string
    loading: boolean

    createNewsArticle?: iNewsArticle
    deleteNewsArticle?: iNewsArticle

    addToNewsArticlesHouse?: {
      userUser: userGQL
      predictionsNewsArticle: {
        id: string
        prediction: number
      }
    }

    addToUserNewsArticles?: {
      userUser: userGQL
      predictionsNewsArticle: {
        id: string
        prediction: number
      }
    }


  }
}


export interface graphqlQueryResponse {
  data: {
    error: string
    loading: boolean

    NewsArticle?: iNewsArticle
    allNewsArticles?: iNewsArticle[]

  }
}
