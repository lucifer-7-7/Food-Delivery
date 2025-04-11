import React from 'react';

function Footer() {
  return (
    // Remove the container if you want to extend the Footer to full width.
    <div className="container my-5">
      {/* Footer */}
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#45526e" }}
      >
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: Links */}
          <section>
            {/*Grid row*/}
            <div className="row">
              {/* Grid column */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}

              <hr className="w-100 clearfix d-md-none" />

              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                <p>
                  <a className="text-white" href="#!">MDBootstrap</a>
                </p>
                <p>
                  <a className="text-white" href="#!">MDWordPress</a>
                </p>
                <p>
                  <a className="text-white" href="#!">BrandFlow</a>
                </p>
                <p>
                  <a className="text-white" href="#!">Bootstrap Angular</a>
                </p>
              </div>
              {/* Grid column */}

              <hr className="w-100 clearfix d-md-none" />

              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p>
                  <a className="text-white" href="#!">Your Account</a>
                </p>
                <p>
                  <a className="text-white" href="#!">Become an Affiliate</a>
                </p>
                <p>
                  <a className="text-white" href="#!">Shipping Rates</a>
                </p>
                <p>
                  <a className="text-white" href="#!">Help</a>
                </p>
              </div>

              {/* Grid column */}
              <hr className="w-100 clearfix d-md-none" />

              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
              </div>
              {/* Grid column */}
            </div>
            {/*Grid row*/}
          </section>
          {/* Section: Links */}

          <hr className="my-3" />

          {/* Section: Copyright */}
          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              {/* Grid column */}
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                {/* Copyright */}
                <div className="p-3">
                  © 2020 Copyright:
                  <a className="text-white" href="https://mdbootstrap.com/">
                    MDBootstrap.com
                  </a>
                </div>
                {/* Copyright */}
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                {/* Facebook */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="#!"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>

                {/* Twitter */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="#!"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                {/* Google */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="#!"
                >
                  <i className="fab fa-google"></i>
                </a>

                {/* Instagram */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="#!"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              {/* Grid column */}
            </div>
          </section>
          {/* Section: Copyright */}
        </div>
        {/* Grid container */}
      </footer>
      {/* Footer */}
    </div>
  );
}

export default Footer;