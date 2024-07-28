import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const createAdminController = catchAsync(async (req, res) => {
  const result = await AdminServices.createAdminIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created Successfully',
    data: result,
  });
});

const getAdminController = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminIntoDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting All Admin successfully',
    data: result,
  });
});

const getSingleAdminController = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.getSingleAdminIntoDb(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting Single Admin successfully',
    data: result,
  });
});

export const AdminControllers = {
  createAdminController,
  getAdminController,
  getSingleAdminController,
};
