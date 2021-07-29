import Post from "../../../models/PostModel";
import connectDB from "../../../utils/db";
import withSession from "../../../utils/session";
import { verifyToken } from "../../../utils/token";

// connect database
connectDB();

async function postById(req, res) {
  const { token } = req.session.get("user");

  if (req.method === "GET") {
    try {
      const { postId } = req.query;
      const post = await Post.findById({ _id: postId }).populate(
        "user",
        "name"
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { postId } = req.query;
      const { title, description } = req.body;
      const user = await verifyToken(token);
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $set: { title, description, user: user.id },
        },
        { new: true }
      );
      res.status(200).json("Post deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { postId } = req.query;
      const user = await verifyToken(token);
      const post = await Post.find({
        $and: [{ _id: postId }, { user: user.id }],
      });
      await post[0].remove();
      res.status(200).json("Post deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default withSession(postById);
