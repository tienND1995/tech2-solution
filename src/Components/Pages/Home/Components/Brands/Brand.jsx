import React from 'react'

function Brand(props) {
  return (
    <div className="brand-area pt-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="brand-logo d-flex align-items-center justify-content-center justify-content-md-between">
              <div
                className="single-logo mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.2s"
              >
                <img src="assets/images/brands/uideck.svg" alt="brand" />
              </div>
              {/* single logo */}
              <div
                className="single-logo mt-30 wow fadeIn"
                data-wow-duration="1.5s"
                data-wow-delay="0.2s"
              >
                <img src="assets/images/brands/ayroui.svg" alt="brand" />
              </div>
              {/* single logo */}
              <div
                className="single-logo mt-30 wow fadeIn"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <img src="assets/images/brands/graygrids.svg" alt="brand" />
              </div>
              {/* single logo */}
              <div
                className="single-logo mt-30 wow fadeIn"
                data-wow-duration="1.5s"
                data-wow-delay="0.4s"
              >
                <img src="assets/images/brands/lineicons.svg" alt="brand" />
              </div>
              {/* single logo */}
              <div
                className="single-logo mt-30 wow fadeIn"
                data-wow-duration="1.5s"
                data-wow-delay="0.5s"
              >
                <img
                  src="assets/images/brands/ecommerce-html.svg"
                  alt="brand"
                />
              </div>
              {/* single logo */}
            </div>
            {/* brand logo */}
          </div>
        </div>
        {/* row */}
      </div>
      {/* container */}
    </div>
  )
}

export default Brand
