import express from 'express';
import { academicDepartmentControlller } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidation,
  ),
  academicDepartmentControlller.createAcademicDepartment,
);

router.get('/', academicDepartmentControlller.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  academicDepartmentControlller.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  academicDepartmentControlller.updateAcademicDepartment,
);
export const academicDepartmentRoute = router;
