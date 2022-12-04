import React from 'react'

function Widget(props) {
  return (
    <div className="footer-widget pb-100">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div
            className="footer-about mt-50 wow fadeIn"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
          >
            <a className="logo" href="javascript:void(0)">
              <img src="assets/images/logo/logo.svg" alt="logo" />
            </a>
            <p className="text">
              Lorem ipsum dolor sit amet consetetur sadipscing elitr, sederfs
              diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam.
            </p>
            <ul className="social">
              <li>
                <a href="javascript:void(0)">
                  <i className="lni lni-facebook-filled"> </i>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="lni lni-twitter-filled"> </i>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="lni lni-instagram-filled"> </i>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="lni lni-linkedin-original"> </i>
                </a>
              </li>
            </ul>
          </div>
          {/* footer about */}
        </div>
        <div className="col-lg-5 col-md-7 col-sm-12">
          <div className="footer-link d-flex mt-50 justify-content-sm-between">
            <div
              className="link-wrapper wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
            >
              <div className="footer-title">
                <h4 className="title">Quick Link</h4>
              </div>
              <ul className="link">
                <li>
                  <a href="javascript:void(0)">Road Map</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Privacy Policy</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Refund Policy</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Terms of Service</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Pricing</a>
                </li>
              </ul>
            </div>
            {/* footer wrapper */}
            <div
              className="link-wrapper wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.6s"
            >
              <div className="footer-title">
                <h4 className="title">Resources</h4>
              </div>
              <ul className="link">
                <li>
                  <a href="javascript:void(0)">Home</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Page</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Portfolio</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Blog</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Contact</a>
                </li>
              </ul>
            </div>
            {/* footer wrapper */}
          </div>
          {/* footer link */}
        </div>
        <div className="col-lg-3 col-md-5 col-sm-12">
          <div
            className="footer-contact mt-50 wow fadeIn"
            data-wow-duration="1s"
            data-wow-delay="0.8s"
          >
            <div className="footer-title">
              <h4 className="title">Contact Us</h4>
            </div>
            <ul className="contact">
              <li>+809272561823</li>
              <li>info@gmail.com</li>
              <li>www.yourweb.com</li>
              <li>
                123 Stree New York City , United <br />
                States Of America 750.
              </li>
            </ul>
          </div>
          {/* footer contact */}
        </div>
      </div>
      {/* row */}
    </div>
  )
}

export default Widget
