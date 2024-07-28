import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidation),
  courseController.createCourseController,
);

router.get('/', courseController.getAllCourseController);
router.get('/:id', courseController.getSingleCouserController);
router.delete('/:id', courseController.deleteCourseController);

export const courseRouter = router;
