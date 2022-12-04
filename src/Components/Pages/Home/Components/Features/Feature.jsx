import React from 'react'
import Content from './Content'
import Title from './Title'

function Feature(props) {
  return (
    <section id="features" className="services-area pt-120">
      <div className="container">
        <Title />
        {/* row */}
        <Content />
        {/* row */}
      </div>
      {/* container */}
    </section>
  )
}

export default Feature
