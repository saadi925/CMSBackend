import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { JWT_SECURITYKEY } from "../keys";
const JWT_SECRET = JWT_SECURITYKEY;
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Sorry, a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: secretPassword,
    });

    const data = {
      newUser: {
        id: newUser.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        error:
          "Please try to login with correct credentials, your email or password must be wrong",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export const accessUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send("Internal Server Error ! Unauthorized , Access Denied!");
  }
};
