import { model, models, Schema } from "mongoose";

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || model("Post", postSchema);
export default Post;
