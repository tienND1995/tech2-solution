import React from 'react'
import HeaderHero from './HeaderHero'
import Navigation from './Navigation'

function Header(props) {
  return (
    <header className="header-area">
      <div className="navbar-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Navigation />
              {/* navbar */}
            </div>
          </div>
        </div>
      </div>
      {/* navbar area */}

      {/* header hero */}

      <HeaderHero />
    </header>
  )
}

export default Header
