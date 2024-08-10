import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './Auth.validation';

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginValidationSchema));

export const AuthRoutes = router;
