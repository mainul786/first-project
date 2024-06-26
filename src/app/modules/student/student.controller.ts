import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getStudentService = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentsDataFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting Student all data successfully',
    data: result,
  });
});

const getSingleServices = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleDataFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting single Data successfully!',
    data: result,
  });
});

const deletedSingleService = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId);
  const result = await StudentServices.deletedDataFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data deleted succefully!',
    data: result,
  });
});

export const StudentControllers = {
  getStudentService,
  getSingleServices,
  deletedSingleService,
};
