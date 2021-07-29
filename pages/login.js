import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import useUser from "../utils/useUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, mutate } = useUser();

  useEffect(() => {
    if (user && user?.isLoggedIn) {
      Router.replace("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Invalid email and password");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      toast.success("Login Successfully");
      mutate();
    } catch (error) {
      const errorMsg = error.response.data.errMsg || error.response.data.error;
      toast.error(errorMsg);
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="Login with email and password">
      <div className="row my-5">
        <div className="offset-lg-3 col-lg-6">
          <div className="card rounded-3 shadow p-3">
            <div className="card-body">
              <h2>Login With Email</h2>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-0 py-2"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-0 py-2"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-0 px-5"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
