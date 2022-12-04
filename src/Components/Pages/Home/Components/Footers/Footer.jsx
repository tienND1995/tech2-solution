import React from 'react'
import Copyright from './Copyright'
import Subscribe from './Subscribe'
import Widget from './Widget'

function Footer(props) {
  return (
    <footer id="footer" className="footer-area pt-120">
      <div className="container">
        <Subscribe />
        {/* Subscribe */}
        <Widget />
        {/* footer widget */}
        <Copyright />
        {/* footer copyright */}
      </div>
      {/* container */}
      <div id="particles-2" />
    </footer>
  )
}

export default Footer
