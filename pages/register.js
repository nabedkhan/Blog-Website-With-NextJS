import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import useUser from "../utils/useUser";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user: loginUser, mutate } = useUser();

  useEffect(() => {
    if (loginUser && loginUser?.isLoggedIn) {
      Router.replace("/");
    }
  }, [loginUser]);

  const handleChange = (e) => {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password.length < 6) {
      return toast.error("Password at least 6 characters required");
    }

    if (user.password !== user.confirmPassword) {
      return toast.error("Password don't matched");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name: user.name, password: user.password, email: user.email }
      );
      toast.success("New User Created Successfully");
      mutate();
    } catch (error) {
      const errorMsg = error.response.data.errMsg || error.response.data.error;
      toast.error(errorMsg);
    }
  };

  return (
    <Layout title="Login with email and password">
      <div className="row my-5">
        <div className="offset-lg-3 col-lg-6">
          <div className="card rounded-3 shadow p-3">
            <div className="card-body">
              <h2>Register With Email</h2>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-0 py-2"
                    onChange={handleChange}
                    value={user.name}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-0 py-2"
                    onChange={handleChange}
                    value={user.email}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-0 py-2"
                    onChange={handleChange}
                    value={user.password}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control rounded-0 py-2"
                    onChange={handleChange}
                    value={user.confirmPassword}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-0 px-5"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
