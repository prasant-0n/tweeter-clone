import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign({ userId }.process.env.JWT_SECRET, {
    expiresIn: "12d",
  });
};
