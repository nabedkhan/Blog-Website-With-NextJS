import { useState } from "react";

const Modal = ({ post }) => {
  console.log(post);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {};
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update Post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
              <button type="submit" className="btn btn-primary rounded-0 px-5">
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
