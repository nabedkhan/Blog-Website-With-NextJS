import Head from "next/head";
import React, { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children, title }) {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">{children}</div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Layout;
