import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createFacultyController = catchAsync(async (req, res) => {
  const result = await facultyServices.createFacultyIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  });
});

const getAllFacultyController = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultyIntoDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting all Faculty',
    data: result,
  });
});

const getSingleFacultyController = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await facultyServices.getSingleFacultyIntoDb(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting single Faculty successfully!',
    data: result,
  });
});

const updateFacultyController = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await facultyServices.updateFacultyIntoDb(facultyId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update successfully',
    data: result,
  });
});
export const facultyControllers = {
  createFacultyController,
  getAllFacultyController,
  getSingleFacultyController,
  updateFacultyController,
};
