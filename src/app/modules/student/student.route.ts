import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validationZod';

const route = express.Router();

route.get('/', StudentControllers.getStudent);
route.get('/:studentId', StudentControllers.getSingleStudent);
route.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
route.delete('/:studentId', StudentControllers.deletedSingleStudent);

export const StudentRoutes = route;
