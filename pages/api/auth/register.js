import bcrypt from "bcrypt";
import User from "../../../models/UserModel";
import connectDB from "../../../utils/db";
import withSession from "../../../utils/session";
import { generateToken } from "../../../utils/token";

connectDB();

async function register(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ errMsg: "Email already exists" });
      }
      // hash user password
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashPassword });
      const savedUser = await user.save();

      const userObj = {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        isLoggedIn: true,
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

export default withSession(register);
