import express, { Request, Response } from 'express';
import { createCourse, getAllCourses, getCourseById, deleteCourseById,updateCourseById } from '../controllers/courses';
import { adminAuth } from '../middleware/adminAuth';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();

router.post('/',authenticateUser,adminAuth, createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id',authenticateUser,adminAuth, updateCourseById);
router.delete('/:id',authenticateUser,adminAuth, deleteCourseById);

export default router;
