import { Request, Response } from 'express';
import Course from '../models/course';
import { adminAuth } from '../middleware/adminAuth';

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (error) {
    console.error(`Error occurred while creating a course: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(`Error occurred while retrieving courses: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(`Error occurred while retrieving a course: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(`Error occurred while updating a course: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(`Error occurred while deleting a course: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
