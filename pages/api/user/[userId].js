import bcrypt from "bcrypt";
import User from "../../../models/UserModel";
import withSession from "../../../utils/session";
import { verifyToken } from "../../../utils/token";

async function user(req, res) {
  if (req.method === "POST") {
    try {
      const { userId } = req.query;
      const { name, password } = req.body;

      const user = req.session.get("user");
      const { id, email } = await verifyToken(user.token);

      // password hash
      const hashPassword = await bcrypt.hash(password, 10);
      const updateUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: { name, email, password: hashPassword } },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}

export default withSession(user);
