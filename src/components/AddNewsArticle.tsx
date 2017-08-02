
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../redux/reducer'
import { Actions as A } from '../redux/reduxActions'

import 'styles/AddNewsArticle.scss'

import {
  iUserProfile,
  iNewsArticle,
  graphqlMutationResponse as mutationResponse,
} from '../typings/interfaceDefinitions'




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
}
interface ReactState {
}


export class AddNewsArticle extends React.Component<ReduxProps & ReduxDispatchProps & ReactProps, AddPredictionState> {

  private addNewsArticle = async(): void => {
    console.info(`User ${this.props.userProfile.id}:`)
    // GraphQL createBid
    let graphqlResponse: mutationResponse = await this.props.likeNewsArticle({
      variables: {
        author: this.props.NewsArticle.author,
        title: this.props.NewsArticle.title,
        description: this.props.NewsArticle.description,
        publishedAt: this.props.NewsArticle.publishedAt,
        url: this.props.NewsArticle.url,
        urlToImage: this.props.NewsArticle.urlToImage,
        usersId: [this.props.userProfile.id],
      }
    })
    console.info(`Just followed this article: ${graphqlResponse.data.createNewsArticle.title}`)
  }

  likeNewsArticle = async(): void => {
  }

  handleInputChange = (event: number) => {
    this.setState({ prediction: event })
  }

  render() {
    return (
      <div className='add__prediction'>
        <button className='add-prediction-button' onClick={this.addNewsArticle} >
         Follow Article
        </button>
      </div>
    )
  }
}


const likeNewsArticle = gql`
mutation(
  $author: String!,
  $title: String!,
  $description: String!,
  $publishedAt: String!,
  $url: String!,
  $urlToImage: String!,
  $usersId: [ID!]
) {
  createNewsArticle(
    author: $author,
    title: $title,
    description: $description,
    publishedAt: $publishedAt,
    url: $url,
    urlToImage: $urlToImage,
    usersIds: $usersId
  ) {
    id
    title
    author
  }
}
`


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
)( AddNewsArticle )

