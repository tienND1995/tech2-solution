import React from 'react'

function Subscribe(props) {
  return (
    <div
      className="subscribe-area wow fadeIn"
      data-wow-duration="1s"
      data-wow-delay="0.5s"
    >
      <div className="row">
        <div className="col-lg-6">
          <div className="subscribe-content mt-45">
            <h2 className="subscribe-title">
              Subscribe Our Newsletter <span>get reguler updates</span>
            </h2>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="subscribe-form mt-50">
            <form action="#">
              <input type="text" placeholder="Enter eamil" />
              <button className="main-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      {/* row */}
    </div>
  )
}

export default Subscribe
