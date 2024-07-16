import { Request, Response } from 'express';
import { academicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Creadted successfully',
      data: result,
    });
  },
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.getAllAcademicDepartmentIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Getting all Academic Department successfully!',
      data: result,
    });
  },
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentService.getSingleAcademicDepartmentIntoDB(
        departmentId,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Getting single Academic Department successfully!',
      data: result,
    });
  },
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentService.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Academic Department successfully!',
      data: result,
    });
  },
);

export const academicDepartmentControlller = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
