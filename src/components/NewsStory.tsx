
import * as React from 'react'
import {
  iGetSearch,
  iNewsContentItem,
  iNewsStory,
} from '../typings/interfaceDefinitions'


interface ReactProps {
  News: iNewsStory
}

class NewsStory extends React.Component<ReactProps, any> {

  static defaultProps = {
    News: {
      title: 'title',
      subtitle: 'subtitle',
      authors: ['barker'],
      body: 'body',
    }
  }

  render() {
    return (
      <div className="news-story">
        <hr/>
        <div className="content">
          <h1> { this.props.News.title } </h1>
          <h2> { this.props.News.subtitle } </h2>
          {(
            this.props.News.authors && this.props.News.authors.map(a => {
              return <h3 key={a}>{a}</h3>
            })
          )}
          <p> { this.props.News.body } </p>

        </div>
      </div>
    )
  }
}

export default NewsStory;
