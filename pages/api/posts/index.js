import Post from "../../../models/PostModel";
import User from "../../../models/UserModel";
import connectDB from "../../../utils/db";
import withSession from "../../../utils/session";
import { verifyToken } from "../../../utils/token";

// connect database
connectDB();

async function posts(req, res) {
  if (req.method === "POST") {
    try {
      const { token } = req.session.get("user");
      const { title, description } = req.body;
      const { id: userId } = await verifyToken(token);
      const user = await User.findOne({ _id: userId }).select("-password");
      if (!user) {
        return res.status(401).json({ errMsg: "Unauthorized Access!" });
      }
      const post = new Post({ title, description, user: user._id });
      await post.save();
      res.status(200).json({ message: "Post Created Successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const posts = await Post.find().populate("user", "name");
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default withSession(posts);
