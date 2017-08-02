
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
    console.info(`Just followed this article: ${graphqlResponse.data.addToUserOnNewsArticle.newsArticlesNewsArticle.title}`)
  }

  render() {
    return (
      <div className='actions_hunt'>
        <button onClick={this.likeThisNewsArticle}>
          <span className='fa fa-caret-up'></span>upvote
        </button>
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
}
interface ReduxProps {
  userProfile: iUserProfile // redux
}
interface ReactProps {
  likeNewsArticle?({
    variables: {
      author: string
      title: string
      description: string
      publishedAt: string
      url: string
      urlToImage: string
      userId: string
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
    dispatch: dispatch,
  }
}

export default compose(
  graphql(likeNewsArticle, { name: 'likeNewsArticle' }),
  connect(mapStateToProps, mapDispatchToProps)
)( LikeNewsArticle )

