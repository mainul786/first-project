import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validationJoyLibrary';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import studentValidationSchema from './student.validationZod';

const getStudentService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getStudentsDataFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Getting Student all data successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleDataFromDb(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Getting single Data successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deletedSingleService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const result = await StudentServices.deletedDataFromDb(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student data deleted succefully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getStudentService,
  getSingleServices,
  deletedSingleService,
};
