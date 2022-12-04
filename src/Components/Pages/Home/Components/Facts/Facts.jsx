import React from 'react'

function Facts(props) {
  return (
    <section id="facts" className="video-counter pt-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 order-lg-last">
            <div
              className="counter-wrapper mt-50 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.8s"
            >
              <div className="counter-content">
                <div className="section-title">
                  <div className="line" />
                  <h3 className="title">
                    Cool facts <span> about this app</span>
                  </h3>
                </div>
                {/* section title */}
                <p className="text">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </p>
              </div>
              {/* counter content */}
              <div className="row no-gutters">
                <div className="col-4">
                  <div className="single-counter counter-color-1 d-flex align-items-center justify-content-center">
                    <div className="counter-items text-center">
                      <span
                        className="count countup text-uppercase"
                        cup-end={125}
                      />
                      <p className="text">Downloads</p>
                    </div>
                  </div>
                  {/* single counter */}
                </div>
                <div className="col-4">
                  <div className="single-counter counter-color-2 d-flex align-items-center justify-content-center">
                    <div className="counter-items text-center">
                      <span
                        className="count countup text-uppercase"
                        cup-end={87}
                      />
                      <p className="text">Active Users</p>
                    </div>
                  </div>
                  {/* single counter */}
                </div>
                <div className="col-4">
                  <div className="single-counter counter-color-3 d-flex align-items-center justify-content-center">
                    <div className="counter-items text-center">
                      <span
                        className="count countup text-uppercase"
                        cup-end={59}
                      />
                      <p className="text">User Rating</p>
                    </div>
                  </div>
                  {/* single counter */}
                </div>
              </div>
              {/* row */}
            </div>
            {/* counter wrapper */}
          </div>
          <div className="col-lg-6">
            <div
              className="video-content mt-50 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <img
                className="dots"
                src="assets/images/video/dots.svg"
                alt="dots"
              />
              <div className="video-wrapper">
                <div className="video-image">
                  <img src="assets/images/video/video.png" alt="video" />
                </div>
                <div className="video-icon">
                  <a
                    href="https://www.youtube.com/watch?v=r44RKWyfcFw"
                    className="video-popup glightbox"
                  >
                    <i className="lni lni-play"> </i>
                  </a>
                </div>
              </div>
              {/* video wrapper */}
            </div>
            {/* video content */}
          </div>
        </div>
        {/* row */}
      </div>
      {/* container */}
    </section>
  )
}

export default Facts
