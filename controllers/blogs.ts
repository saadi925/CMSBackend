import { Request, Response } from "express";
import Blog from "../models/blog";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(`Error occurred while retrieving blogs: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
    console.log(blog);
  } catch (error) {
    console.error(`Error occurred while creating a blog: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(`Error occurred while retrieving a blog: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(`Error occurred while updating a blog: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
  const { id } = req.params;
  console.log(id);

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(`Error occurred while deleting a blog: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
