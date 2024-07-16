import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Created Successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.getAllAcademicFacultyIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Acadmeic Faculty Get all data retrived successfully',
      data: result,
    });
  },
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await academicFacultyServices.getSingleAcademicFacultyIntoDB(facultyId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty get single Successfully!',
      data: result,
    });
  },
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty update Successfully!',
      data: result,
    });
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
