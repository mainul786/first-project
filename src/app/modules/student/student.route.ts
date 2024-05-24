import express from 'express';
import { StudentControllers } from './student.controller';

const route = express.Router();

route.post('/create-student', StudentControllers.createStudent);
route.get('/', StudentControllers.getStudentService);
route.get('/:studentId', StudentControllers.getSingleServices);

export const StudentRoutes = route;
