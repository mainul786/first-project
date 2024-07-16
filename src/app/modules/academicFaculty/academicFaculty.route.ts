import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.CreateAcademicFacultyValidation),
  academicFacultyController.createAcademicFaculty,
);

router.get('/', academicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidation.UpdateAcademicFacultyValidation),
  academicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
