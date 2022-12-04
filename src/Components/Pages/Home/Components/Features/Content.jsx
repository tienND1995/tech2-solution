import React from 'react'

function Content(props) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-7 col-sm-8">
        <div
          className="single-services text-center mt-30 wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
        >
          <div className="services-icon">
            <img
              className="shape"
              src="assets/images/services/services-shape.svg"
              alt="shape"
            />
            <img
              className="shape-1"
              src="assets/images/services/services-shape-1.svg"
              alt="shape"
            />
            <i className="lni lni-baloon"> </i>
          </div>
          <div className="services-content mt-30">
            <h4 className="services-title">
              <a href="javascript:void(0)">Clean</a>
            </h4>
            <p className="text">
              Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam
              nonu eirmod tempor invidunt labore.
            </p>
            <a className="more" href="javascript:void(0)">
              Learn More <i className="lni lni-chevron-right"> </i>
            </a>
          </div>
        </div>
        {/* single services */}
      </div>
      <div className="col-lg-4 col-md-7 col-sm-8">
        <div
          className="single-services text-center mt-30 wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <div className="services-icon">
            <img
              className="shape"
              src="assets/images/services/services-shape.svg"
              alt="shape"
            />
            <img
              className="shape-1"
              src="assets/images/services/services-shape-2.svg"
              alt="shape"
            />
            <i className="lni lni-cog"> </i>
          </div>
          <div className="services-content mt-30">
            <h4 className="services-title">
              <a href="javascript:void(0)">Robust</a>
            </h4>
            <p className="text">
              Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam
              nonu eirmod tempor invidunt labore.
            </p>
            <a className="more" href="javascript:void(0)">
              Learn More <i className="lni lni-chevron-right"> </i>
            </a>
          </div>
        </div>
        {/* single services */}
      </div>
      <div className="col-lg-4 col-md-7 col-sm-8">
        <div
          className="single-services text-center mt-30 wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.8s"
        >
          <div className="services-icon">
            <img
              className="shape"
              src="assets/images/services/services-shape.svg"
              alt="shape"
            />
            <img
              className="shape-1"
              src="assets/images/services/services-shape-3.svg"
              alt="shape"
            />
            <i className="lni lni-bolt-alt"> </i>
          </div>
          <div className="services-content mt-30">
            <h4 className="services-title">
              <a href="javascript:void(0)">Powerful</a>
            </h4>
            <p className="text">
              Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam
              nonu eirmod tempor invidunt labore.
            </p>
            <a className="more" href="javascript:void(0)">
              Learn More <i className="lni lni-chevron-right"> </i>
            </a>
          </div>
        </div>
        {/* single services */}
      </div>
    </div>
  )
}

export default Content
