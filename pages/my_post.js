import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogCard from "../components/BlogCard";
import Layout from "../components/Layout";
import useUser from "../utils/useUser";

function MyPost() {
  const { user, isLoading } = useUser();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/posts/user");
      setPosts(data);
    } catch (error) {
      const errorMsg = error.response.data.errMsg || error.response.data.error;
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    if ((!user || !user?.isLoggedIn) && !isLoading) {
      Router.replace("/login");
    }

    if (user && user?.isLoggedIn) {
      getPosts();
    }
  }, [user, isLoading]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`);
      toast.success("Post deleted successfully");
      getPosts();
    } catch (error) {
      const errorMsg = error.response.data.errMsg || error.response.data.error;
      toast.error(errorMsg);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="Simple Post Application">
      <div className="row mt-5">
        <div className="col-lg-12">
          <h1>My Post Page</h1>
          <hr />
        </div>
      </div>

      <div className="row mb-5">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            admin={true}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyPost;
