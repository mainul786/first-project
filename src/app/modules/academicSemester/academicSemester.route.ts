import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.academicSemesterValidation),
  AcademicSemesterController.createAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemester);
router.get('/:courseId', AcademicSemesterController.getSingleAcademicSemester);
router.patch('/:courseId', AcademicSemesterController.updateAcademicSemester);

export const AcademicSemesterRouter = router;
