import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.CreateAdminSchema),
  AdminControllers.createAdminController,
);

router.get('/', AdminControllers.getAdminController);

router.get('/:adminId', AdminControllers.getSingleAdminController);

export const adminRoute = router;
