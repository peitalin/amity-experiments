
import * as React from 'react'
import { Component } from 'react'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../redux/reducer'
import { Actions, ActionType } from '../redux/reduxActions'

import 'styles/PickNewsPublisher.scss'



class PickNewsPublisher extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  handleChange = (event) => {
    console.info('Picked publisher:', event.target.value)
    this.props.updateNewsPublisher({ newsPublisher: event.target.value })
  }

  render() {
    return (
      <div className='pick_news_publisher'>
        <select name='news_publisher' onChange={(event) => this.handleChange(event)} value={this.props.newsPublisher}>
          <optgroup label='General'>
            <option value='abc-news-au'>ABC News (AU)</option>
            <option value='breitbart-news'>Breitbart News</option>
            <option value='bbc-news'>BBC News</option>
          </optgroup>
          <optgroup label='Tech'>
            <option value='hacker-news'>Hacker News</option>
            <option value='mashable'>Mashable</option>
            <option value='techcrunch'>Techcrunch</option>
          </optgroup>
          <optgroup label='Business'>
            <option value='the-economist'>The Economist</option>
            <option value='the-new-york-times'>The New York Times</option>
            <option value='bloomberg'>Bloomberg</option>
            <option value='the-wall-street-journal'>The Wall Street Journal</option>
          </optgroup>
        </select>
      </div>
    )
  }
}

interface ReduxDispatchProps {
  updateNewsPublisher?({ newsPublisher }: { newsPublisher: string }): Dispatch<ActionType>
}
interface ReduxProps {
  newsPublisher: string
}
interface ReactProps {
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateNewsPublisher: ({ newsPublisher }) => dispatch(
      { type: Actions.User.UPDATE_NEWS_PUBLISHER, payload: newsPublisher }
    ),
  }
}
const mapStateToProps = ( state: ReduxState ) => {
  return {
    newsPublisher: state.reduxUser.newsPublisher
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps)
( PickNewsPublisher )

