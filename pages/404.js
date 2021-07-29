import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const ErrorPage = () => {
  return (
    <Layout title="Not Found">
      <div className="container my-5">
        <div className="row">
          <div className=" offset-lg-3 col-lg-6">
            <div className="card">
              <div className="card-body text-center">
                <h1 className="display-2">404</h1>
                <p>Not Found Route</p>
                <Link href="/">
                  <a className="btn btn-primary mt-4">Go Home</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
