import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const academicData = req.body;
  const result =
    await academicSemesterService.createAcademicSemesterToDb(academicData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created succefully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
