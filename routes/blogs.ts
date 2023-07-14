import express from "express";
import {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogs";
import { adminAuth } from "../middleware/adminAuth";
import { authenticateUser } from "../middleware/authenticateUser";
const router = express.Router();

// Define the routes
router.get("/", getBlogs);
router.post("/", authenticateUser, adminAuth, createBlog);
router.get("/:id", getBlogById);
router.put("/:id", authenticateUser, adminAuth, updateBlog);
router.delete("/:id", authenticateUser, adminAuth, deleteBlog);

export default router;
