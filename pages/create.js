import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import useUser from "../utils/useUser";

function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user, isLoading } = useUser();

  useEffect(() => {
    if ((!user || !user?.isLoggedIn) && !isLoading) {
      Router.replace("/login");
    }
  }, [user, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/posts", { title, description });
      setTitle("");
      setDescription("");
      toast.success("New Post Created Successfully");
    } catch (error) {
      const errorMsg = error.response.data.errMsg || error.response.data.error;
      toast.error(errorMsg);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="Create New Post">
      <div className="row my-5">
        <div className="offset-lg-3 col-lg-6">
          <div className="card rounded-3 shadow p-3">
            <div className="card-body">
              <h2>Create New Post</h2>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0 py-2"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Description
                  </label>
                  <textarea
                    style={{ height: 200 }}
                    className="form-control rounded-0 py-2"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-0 px-5"
                >
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreatePost;
