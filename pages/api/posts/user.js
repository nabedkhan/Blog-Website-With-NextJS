import Post from "../../../models/PostModel";
// import User from "../../../models/UserModel";
import connectDB from "../../../utils/db";
import withSession from "../../../utils/session";
import { verifyToken } from "../../../utils/token";

// connect database
connectDB();

async function userPost(req, res) {
  if (req.method === "GET") {
    try {
      const user = req.session.get("user");
      const { id: userId } = await verifyToken(user.token);
      const posts = await Post.find({ user: userId });
      if (!posts) {
        return res.status(401).json({ errMsg: "No Post found" });
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default withSession(userPost);
