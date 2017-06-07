

import * as React from 'react'
import 'styles/FooterLinks.scss'

export default class FooterLinks extends React.Component<any, any> {

  render() {
    return (
      <div className='footer-rights'>
        <div className="social-container">
          <a className="social-footer social-facebook" href="https://www.facebook.com/"></a>
          <a className="social-footer social-twitter" href="https://twitter.com/"></a>
          <a className="social-footer social-instagram" href="https://www.instagram.com/"></a>
          <a className="social-footer social-email" href="mailto:n6378056@gmail.com"></a>
        </div>

        <div className='copyright'>
          <p>Copyright © 2017 AmityX.</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    )
  }
}

