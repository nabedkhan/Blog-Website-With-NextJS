import bcrypt from "bcrypt";
import User from "../../../models/UserModel";
import connectDB from "../../../utils/db";
import withSession from "../../../utils/session";
import { generateToken } from "../../../utils/token";

connectDB();

async function login(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ errMsg: "Invalid Email and Password!" });
      }

      const passwordVerify = await bcrypt.compare(password, user.password);
      if (!passwordVerify) {
        return res.status(404).json({ errMsg: "Invalid Email and Password!" });
      }
      const userObj = {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      const token = generateToken(userObj);

      req.session.set("user", { ...userObj, token });
      await req.session.save();

      res.status(202).json({ ...userObj, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default withSession(login);
