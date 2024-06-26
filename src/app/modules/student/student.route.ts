import express from 'express';
import { StudentControllers } from './student.controller';

const route = express.Router();

route.get('/', StudentControllers.getStudentService);
route.get('/:studentId', StudentControllers.getSingleServices);
route.delete('/:studentId', StudentControllers.deletedSingleService);

export const StudentRoutes = route;
