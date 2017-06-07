
import * as React from 'react'


interface ReactProps {
  onClick?(): void
  img: string
}

export default class CarouselTile extends React.Component<ReactProps, any> {

  componentDidMount() {
  }

  render() {
    return (
      <div className='tile__container' onClick={this.props.onClick}>
        {(
          this.props.img &&
          <div className="tile__media">
            <img className="tile__img" src={this.props.img}/>
          </div>

        )}
        <div className="tile__details">
          <div className="tile__title">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
