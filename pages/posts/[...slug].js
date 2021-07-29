import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";

const PostUpdate = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const postId = router.query.slug?.[0];

  useEffect(() => {
    if (postId) {
      axios
        .get(`http://localhost:3000/api/posts/${postId}`)
        .then(({ data }) => {
          setPost({ title: data.title, description: data.description });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [postId]);

  const handleChange = (e) => {
    const updatePost = { ...post };
    updatePost[e.target.name] = e.target.value;
    setPost(updatePost);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/posts/${postId}`, post);
      toast.success("Post Updated Successfully");
      router.push("/my_post");
    } catch (error) {
      const errorMsg = error.response.data.errMsg || error.response.data.error;
      toast.error(errorMsg);
    }
  };

  return (
    <Layout title="Create New Post">
      <div className="row my-5">
        <div className="offset-lg-3 col-lg-6">
          <div className="card rounded-3 shadow p-3">
            <div className="card-body">
              <h2>Update Post</h2>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control rounded-0 py-2"
                    onChange={handleChange}
                    value={post.title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Description
                  </label>
                  <textarea
                    style={{ height: 200 }}
                    name="description"
                    className="form-control rounded-0 py-2"
                    onChange={handleChange}
                    value={post.description}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-0 px-5"
                >
                  Update Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostUpdate;
