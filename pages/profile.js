import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import useUser from "../utils/useUser";

function Profile() {
  const { user, isLoading } = useUser();
  const [fieldValue, setFieldValue] = useState({
    name: (user && user.name) || "",
    email: (user && user.email) || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if ((!user || !user?.isLoggedIn) && !isLoading) {
      Router.replace("/login");
    }
  }, [user, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fieldValue.password.length < 6) {
      return toast.error("Password at least 6 characters required");
    }

    if (fieldValue.password !== fieldValue.confirmPassword) {
      return toast.error("Password don't matched");
    }

    try {
      await axios.post(`http://localhost:3000/api/user/${user.id}`, fieldValue);
      toast.success("Profile Update successfully");
      Router.push("/");
    } catch (error) {
      const errorMsg = error.response.data.errMsg || error.response.data.error;
      toast.error(errorMsg);
    }
  };

  const handleChange = (e) => {
    const newValue = { ...fieldValue };
    newValue[e.target.name] = e.target.value;
    setFieldValue(newValue);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="User Profile | Our Blog">
      <div className="row my-5">
        <div className="offset-lg-3 col-lg-6">
          <div className="card rounded-3 shadow p-3">
            <div className="card-body">
              <h2 className="text-center mb-5">Update User Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-3 py-2"
                    onChange={handleChange}
                    value={fieldValue.name}
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
                    className="form-control rounded-3 py-2"
                    onChange={handleChange}
                    value={fieldValue.email}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-3 py-2"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control rounded-3 py-2"
                    onChange={handleChange}
                    // value={user.confirmPassword}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-3 px-5 w-100"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
