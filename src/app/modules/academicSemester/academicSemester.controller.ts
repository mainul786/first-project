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

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAllAcademicSemesterFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting all academic semester!',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterService.getSingleAcademicSemesterFromDb(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting single Semester Successfully!',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterService.updateAcademicSemesterIntoDb(
    semesterId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester update Successfully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
