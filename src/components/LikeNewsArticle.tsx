
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../redux/reducer'
import { Actions as A } from '../redux/reduxActions'

import 'styles/LikeNewsArticle.scss'

import {
  iUserProfile,
  iNewsArticle,
  graphqlMutationResponse as mutationResponse,
} from '../typings/interfaceDefinitions'



export class LikeNewsArticle extends React.Component<ReduxProps & ReduxDispatchProps & ReactProps, AddPredictionState> {

  private likeThisNewsArticle = async(): void => {
    console.info(`User ${this.props.userProfile.id}:`)
    // GraphQL link User and NewsArticle data model
    let graphqlResponse: mutationResponse = await this.props.likeNewsArticle({
      variables: {
        UserId: this.props.userProfile.id,
        NewsArticleId: this.props.NewsArticle.id,
      }
    })
    console.info(`Just liked this article: ${graphqlResponse.data.addToUserOnNewsArticle.newsArticlesNewsArticle.title}`)
    this.props.updateLikedArticles(
      graphqlResponse.data.addToUserOnNewsArticle.usersUser.newsArticles
    )
  }

  private undoLikeThisNewsArticle = async(): void => {
    console.info(`User ${this.props.userProfile.id}:`)
    // GraphQL unlink User and NewsArticle data model
    let graphqlResponse: mutationResponse = await this.props.undoLikeNewsArticle({
      variables: {
        UserId: this.props.userProfile.id,
        NewsArticleId: this.props.NewsArticle.id,
      }
    })
    console.info(`Remove vote for article: ${graphqlResponse.data.removeFromUserOnNewsArticle.newsArticlesNewsArticle.title}`)
    this.props.updateLikedArticles(
      graphqlResponse.data.removeFromUserOnNewsArticle.usersUser.newsArticles
    )
  }

  isUpvotedArticle = () => {
    return this.props.userProfile.newsArticles.map(newsArticle => newsArticle.id)
      .includes(this.props.NewsArticle.id)
  }

  render() {
    return (
      <div className='actions_hunt'>
        <img src={require('../img/techcrunch.svg')} />
        {(
          this.isUpvotedArticle()
          ? <button onClick={this.undoLikeThisNewsArticle}>
              <span className='fa fa-caret-down'></span>undo upvote
            </button>
          : <button onClick={this.likeThisNewsArticle}>
              <span className='fa fa-caret-up'></span>upvote
            </button>
        )}
        <span>{ this.props.upvotes }</span>
        <button><span className='fa fa-commenting-o'></span>Comment</button>
      </div>
    )
  }
}


const likeNewsArticle = gql`
mutation($NewsArticleId: ID!, $UserId: ID!) {
  addToUserOnNewsArticle(
    newsArticlesNewsArticleId: $NewsArticleId,
    usersUserId: $UserId,
  ) {
    usersUser {
      id
      emailAddress
      newsArticles {
        id
      }
    }
    newsArticlesNewsArticle {
      id
      title
    }
  }
}
`

const undoLikeNewsArticle = gql`
mutation($NewsArticleId: ID!, $UserId: ID!) {
  removeFromUserOnNewsArticle(
    newsArticlesNewsArticleId: $NewsArticleId,
    usersUserId: $UserId,
  ) {
    usersUser {
      id
      emailAddress
      newsArticles {
        id
      }
    }
    newsArticlesNewsArticle {
      id
      title
    }
  }
}
`

interface ReduxDispatchProps {
  updateUserProfile?(userProfile: iUserProfile): void // redux
  updateLikedArticles?(likedArticles: iNewsArticle[]): void // redux
}
interface ReduxProps {
  userProfile: iUserProfile // redux
}
interface ReactProps {
  likeNewsArticle?({
    variables: {
      UserId: string
      NewsArticleId: string
    }
  }): void // graphql-mutation
  undoLikeNewsArticle?({
    variables: {
      UserId: string
      NewsArticleId: string
    }
  }): void // graphql-mutation
  NewsArticle: iNewsArticle
  upvotes: number
}
interface ReactState {
}



const mapStateToProps = ( state: ReduxState ) => {
  return {
    userProfile: state.reduxUser.userProfile
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfile: (userProfile: iUserProfile) => dispatch(
      { type: A.User.UPDATE_USER_PROFILE, payload: userProfile }
    ),
    updateLikedArticles: (likedArticles: iNewsArticle[]) => dispatch(
      { type: A.User.UPDATE_LIKED_ARTICLES, payload: likedArticles }
    ),
    dispatch: dispatch,
  }
}

export default compose(
  graphql(likeNewsArticle, { name: 'likeNewsArticle' }),
  graphql(undoLikeNewsArticle, { name: 'undoLikeNewsArticle' }),
  connect(mapStateToProps, mapDispatchToProps)
)( LikeNewsArticle )

