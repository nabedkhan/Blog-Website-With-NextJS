import axios from "axios";
import React from "react";
import Layout from "../../components/Layout";

function PostDetails({ post }) {
  return (
    <Layout title={post.title}>
      <div className="row my-5">
        <div className="offset-lg-2 col-lg-8">
          <div className="card rounded-3 shadow p-3">
            <div className="card-body">
              <h2>{post.title}</h2>
              <hr />
              <p>{post.description}</p>

              <div className="mt-5">
                <p>Written by {post.user.name}</p>
                <p>
                  Created At:
                  <span className="text-muted">
                    {" "}
                    {new Date(post.createdAt).toDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `http://localhost:3000/api/posts/${params.id}`
  );
  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:3000/api/posts");
  const paths = data.map((post) => ({ params: { id: post._id } }));
  return {
    paths,
    fallback: false,
  };
}

export default PostDetails;
