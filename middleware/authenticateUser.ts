import { Request, Response, NextFunction } from "express";

import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { JWT_SECURITYKEY } from "../keys";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("authtoken");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECURITYKEY);
    const user = await User.findById(decoded.user.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "Token is not valid" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
