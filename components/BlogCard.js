import Link from "next/link";
import React from "react";

function BlogCard({ post, admin, handleDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card border-0 shadow p-3 rounded-3">
        <div className="card-body">
          <h5 className="card-title">{post.title.substring(0, 30)}...</h5>
          <p className="card-text">{post.description.substring(0, 120)}...</p>

          {admin ? (
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
              <Link href={`/posts/${post._id}/update`}>
                <a className="card-link btn btn-warning">Edit</a>
              </Link>
            </div>
          ) : (
            <div className="d-flex justify-content-between mt-3">
              <Link href={`/posts/${post._id}`}>
                <a className="card-link">Read More</a>
              </Link>
              <p className="card-link">Written by {post.user?.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
