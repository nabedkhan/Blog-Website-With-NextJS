import jwt from "jsonwebtoken";

export function generateToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
}

export async function verifyToken(token) {
  if (!token) {
    return res.status(401).json({ errMsg: "Unauthorized Access!" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
