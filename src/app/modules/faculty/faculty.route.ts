import express from 'express';
import { facultyControllers } from './faculty.controller';
import { facultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(facultyValidationSchema.createFacultyValidationSchema),
  facultyControllers.createFacultyController,
);

router.get('/:facultyId', facultyControllers.getSingleFacultyController);

router.patch(
  '/:facultyId',
  validateRequest(facultyValidationSchema.updateFacultyValidationSchema),
  facultyControllers.updateFacultyController,
);

router.get('/', facultyControllers.getAllFacultyController);

export const facultyRouter = router;
